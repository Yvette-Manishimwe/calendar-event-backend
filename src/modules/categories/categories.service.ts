import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/common/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/common/dtos/update-category.dto';
import { EventCategory } from 'src/entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly repo: Repository<EventCategory>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const cat = this.repo.create(dto);
    return this.repo.save(cat);
  }

  async findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Category not found');
    Object.assign(cat, dto);
    return this.repo.save(cat);
  }

  async remove(id: string) {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Category not found');
    await this.repo.remove(cat);
    return { success: true };
  }
}