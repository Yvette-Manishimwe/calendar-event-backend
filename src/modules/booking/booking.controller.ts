import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './booking.service';
import { CreateBookingDto } from 'src/common/dtos/create-booking.dto';
import { Roles } from '../utils/decorators/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';


@UseGuards(AuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  create(@Body() dto: CreateBookingDto, @Req() req: any) { return this.service.create(dto, req.user.sub); }

  @Get('me')
  listMine(@Req() req: any) { return this.service.listMine(req.user.sub); }

  @Roles('ADMIN')
  @Get()
  listByEvent(@Query('eventId') eventId: string) { return this.service.listByEvent(eventId); }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Req() req: any) {
    const roles = (req.user?.roles || []).map((r: any) => (r.role_name || r).toUpperCase());
    return this.service.cancel(id, { userId: req.user.sub, isAdmin: roles.includes('ADMIN') });
  }

  @Roles('ADMIN')
  @Patch(':id/approve')
  approve(@Param('id') id: string) { return this.service.approve(id); }
}