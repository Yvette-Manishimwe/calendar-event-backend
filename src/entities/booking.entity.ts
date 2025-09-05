import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { User } from './users.entity';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, (e) => e.bookings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  event: Event;

  @ManyToOne(() => User, (u) => u.id, { eager: true })
  user: User;

  @Column({ type: 'timestamptz' })
  bookedAt: Date;

  @Column({ type: 'varchar', default: 'confirmed' })
  status: BookingStatus;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
