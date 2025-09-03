import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Event } from 'src/entities/event.entity'; // 👈 you were using Event but not importing it
import { User } from 'src/entities/users.entity';
import { BookingsController } from './booking.controller';
import { BookingsService } from './booking.service';
import { AuthModule } from '../auth/auth.module'; // 👈 import AuthModule so JwtService is available

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Event, User]),
    AuthModule, // 👈 added here
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
