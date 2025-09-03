import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from 'src/entities/event.entity';
import { User } from 'src/entities/users.entity';
import { AuthModule } from '../auth/auth.module'; // <-- IMPORT AUTH MODULE HERE

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User]),
    AuthModule, // <-- IMPORT THE AUTH MODULE
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}