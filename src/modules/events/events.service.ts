import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from 'src/common/dtos/create-event.dto';
import { MoveEventDto } from 'src/common/dtos/move-event.dto';
import { QueryEventsDto } from 'src/common/dtos/query-events.dto';
import { UpdateEventDto } from 'src/common/dtos/update-event.dto';
import { Event } from 'src/entities/event.entity';
import { User } from 'src/entities/users.entity';
import { And, Between, ILike, MoreThanOrEqual, LessThanOrEqual, Repository } from 'typeorm';
import { EventCategory } from 'src/common/enums/Eventcategory.enum';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly repo: Repository<Event>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateEventDto, creatorId: string) {
    // The category is now a simple enum value, so no need to find an entity.
    // We can assume the DTO provides a valid enum string.
    
    // Validate that the provided category is a valid enum value
    if (!Object.values(EventCategory).includes(dto.category as EventCategory)) {
        throw new BadRequestException('Invalid category');
    }

    const creator = await this.userRepo.findOne({ where: { id: creatorId } });
    if (!creator) throw new BadRequestException('Invalid creator ID');

    const ev = this.repo.create({
      ...dto,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      // The category property is now assigned directly from the DTO
      category: dto.category,
      createdBy: creator,
    });

    if (ev.endTime <= ev.startTime) throw new BadRequestException('endTime must be after startTime');

    return this.repo.save(ev);
  }

  async findAll(q: QueryEventsDto) {
    const where: any = {};
    if (q.from && q.to) where.startTime = And(MoreThanOrEqual(new Date(q.from)), LessThanOrEqual(new Date(q.to)));
    if (q.category) where.category = q.category;
    const findOpts: any = { where, order: { startTime: 'ASC' } };
    if (q.q) findOpts.where = [{ ...where, title: ILike(`%${q.q}%`) }, { ...where, description: ILike(`%${q.q}%`) }];
    return this.repo.find(findOpts);
  }

  async findOne(id: string) {
    const ev = await this.repo.findOne({ where: { id } });
    if (!ev) throw new NotFoundException('Event not found');
    return ev;
  }

async update(id: string, dto: UpdateEventDto) {
  const ev = await this.findOne(id);

  if (dto.category) {
    if (!Object.values(EventCategory).includes(dto.category as EventCategory)) {
      throw new BadRequestException('Invalid category');
    }
  }

  // Clean dto: remove empty strings (especially for uuid fields)
  Object.keys(dto).forEach((key) => {
    if (dto[key] === '') {
      delete dto[key];
    }
  });

  Object.assign(ev, {
    ...dto,
    startTime: dto.startTime ? new Date(dto.startTime) : ev.startTime,
    endTime: dto.endTime ? new Date(dto.endTime) : ev.endTime,
  });

  if (ev.endTime <= ev.startTime) {
    throw new BadRequestException('endTime must be after startTime');
  }

  return this.repo.save(ev);
}


  async move(id: string, dto: MoveEventDto) {
    return this.update(id, { startTime: dto.startTime, endTime: dto.endTime } as any);
  }

  async remove(id: string) {
    const ev = await this.findOne(id);
    await this.repo.remove(ev);
    return { success: true };
  }

  async getEventBookings(id: string) {
    const ev = await this.repo.findOne({ where: { id }, relations: { bookings: true } });
    if (!ev) throw new NotFoundException('Event not found');
    return ev.bookings || [];
  }
}
