import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from 'src/common/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/common/dtos/update-category.dto';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../utils/decorators/roles.decorator';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/guard/auth.guard';



@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  findAll() { return this.service.findAll(); }

 
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateCategoryDto) { return this.service.create(dto); }

 
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) { return this.service.update(id, dto); }

 
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}