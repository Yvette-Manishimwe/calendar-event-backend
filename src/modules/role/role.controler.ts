/* eslint-disable */
/*
 @author : © 2025 Alice Umugwaneza <umugwanezaalice22@gmail.com>
*/

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/entities/role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id); // 👈 convert string → number
  }

  @Post()
  create(@Body() roleData: Partial<Role>): Promise<Role> {
    return this.roleService.create(roleData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Role>) {
    return this.roleService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
