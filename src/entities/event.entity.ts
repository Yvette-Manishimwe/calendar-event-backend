import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Booking } from './booking.entity';
import { EventCategory } from 'src/common/enums/Eventcategory.enum';


@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() title: string;
  @Column({ nullable: true }) description?: string;

  @Column({ type: 'timestamptz' }) startTime: Date;
  @Column({ type: 'timestamptz' }) endTime: Date;

  @Column({ type: 'enum', enum: EventCategory, default: EventCategory.OTHER })
  category: EventCategory;

  @Column({ nullable: true }) location?: string;
  @Column({ default: false }) isAllDay: boolean;
  @Column({ nullable: true }) color?: string;

  @Column({ default: true }) isPublic: boolean;
  @Column({ default: false }) requiresApproval: boolean;
  @Column({ type: 'int', nullable: true }) capacity?: number;

  @ManyToOne(() => User, (u) => u.id, { eager: true })
  createdBy: User;

  @OneToMany(() => Booking, (b) => b.event)
  bookings: Booking[];

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}