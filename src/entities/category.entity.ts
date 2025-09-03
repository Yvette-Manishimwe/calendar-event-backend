import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InitiatorAudit } from 'src/audits/Initiator.audit';
import { Event } from './event.entity';

@Entity('event_categories')
export class EventCategory extends InitiatorAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  color: string;

  // This is the correct way to handle a circular reference.
  // The '() => Event' function provides a lazily-evaluated type.
  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}
