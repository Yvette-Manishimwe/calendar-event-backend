import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { EventCategory } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}