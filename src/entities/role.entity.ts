/* src/entities/role.entity.ts */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './users.entity';
import { InitiatorAudit } from 'src/audits/Initiator.audit';

@Entity('roles')
export class Role extends InitiatorAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_name: string;

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}
