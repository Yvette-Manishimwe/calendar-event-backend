import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from 'src/common/dtos/create-event.dto';
import { MoveEventDto } from 'src/common/dtos/move-event.dto';
import { QueryEventsDto } from 'src/common/dtos/query-events.dto';
import { UpdateEventDto } from 'src/common/dtos/update-event.dto';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../utils/decorators/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Get()
  list(@Query() q: QueryEventsDto) { return this.service.findAll(q); }

  @Get(':id')
  get(@Param('id') id: string) { return this.service.findOne(id); }

 
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateEventDto, @Req() req: any) { return this.service.create(dto, req.user.sub); }

 
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) { return this.service.update(id, dto); }

 
  @Roles('ADMIN')
  @Patch(':id/move')
  move(@Param('id') id: string, @Body() dto: MoveEventDto) { return this.service.move(id, dto); }

 
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }

 
  @Roles('ADMIN')
  @Get(':id/bookings')
  bookings(@Param('id') id: string) { return this.service.getEventBookings(id); }
}