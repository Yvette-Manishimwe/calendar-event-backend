// src/bookings/bookings.service.ts
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from 'src/common/dtos/create-booking.dto';
import { Booking } from 'src/entities/booking.entity';
import { User } from 'src/entities/users.entity';
import { Event } from 'src/entities/event.entity'; // <-- Add this import
import { Not, Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private readonly repo: Repository<Booking>, // <-- Use <Booking>
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>, // <-- Use <Event>
    @InjectRepository(User) private readonly userRepo: Repository<User>, // <-- Use <User>
  ) {}

  async create(dto: CreateBookingDto, userId: string) { // <-- Add `async` keyword
    const event = await this.eventRepo.findOne({ where: { id: dto.eventId }, relations: { bookings: true } });
    if (!event) throw new NotFoundException('Event not found');

    if (event.capacity && (event.bookings?.filter(b => b.status === 'confirmed').length || 0) >= event.capacity) {
      throw new BadRequestException('Event capacity reached');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found'); // Best practice to check if user exists

    const booking = this.repo.create({
      event,
      user,
      bookedAt: new Date(),
      status: event.requiresApproval ? 'pending' : 'confirmed',
    });

    return this.repo.save(booking);
  }

async listMine(userId: string) {
  return this.repo.find({
    where: { user: { id: userId }, status: Not('cancelled') },
    relations: ['event'],
  });
}
async listByEvent(eventId: string) {
  const bookings = await this.repo.find({
    where: { 
      event: { id: eventId },
      status: Not('cancelled')
    },
    relations: ['user'], // load the user
  });

  return bookings.map(b => ({
    id: b.id,
    eventId: b.event.id,
    userId: b.user.id,
    userName: b.user.full_name,
    userEmail: b.user.email,
    bookedAt: b.bookedAt,
    status: b.status,
  }));
}


  async cancel(id: string, requester: { userId: string; isAdmin: boolean }) {
    // <-- Add relations: ['user'] to load the user relationship
    const b = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!b) throw new NotFoundException('Booking not found');

    if (!requester.isAdmin && b.user.id !== requester.userId) throw new ForbiddenException();

    b.status = 'cancelled';
    return this.repo.save(b);
  }

  async approve(id: string) {
    // <-- Add relations: ['event'] to load the event relationship
    const b = await this.repo.findOne({ where: { id }, relations: ['event'] });
    if (!b) throw new NotFoundException('Booking not found');
    if (b.status !== 'pending') throw new BadRequestException('Only pending can be approved');

    const event = await this.eventRepo.findOne({ where: { id: b.event.id }, relations: { bookings: true } });
    if (event?.capacity && (event.bookings?.filter(x => x.status === 'confirmed').length || 0) >= event.capacity) {
      throw new BadRequestException('Event capacity reached');
    }
    b.status = 'confirmed';
    return this.repo.save(b);
  }
}