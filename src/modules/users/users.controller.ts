import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { UpdateUserDto } from 'src/common/dtos/update-user.dto';
import { Public } from '../utils/decorators/public.decorator';
import { ApiBody } from '@nestjs/swagger';
import { CreateAdminDto } from 'src/common/dtos/create-admin.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Post('/create/admin')
  @ApiBody({ type: CreateAdminDto })
  createAdminAccount(@Body() body: CreateAdminDto) {
    return this.usersService.createAdmin(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
