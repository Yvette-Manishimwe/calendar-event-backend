/* src/entities/user.entity.ts */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
import { InitiatorAudit } from 'src/audits/Initiator.audit';
import { Role } from './role.entity';
import { Exclude } from 'class-transformer';

// Let's create an enum for gender
export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity('users')
export class User extends InitiatorAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({ type: 'enum', enum: EGender }) // Add the gender column
  gender: EGender;

  @Column()
  @Exclude() // do not expose password in API
  password: string;

  @ManyToMany(() => Role, { eager: true }) // <-- Add { eager: true }
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

}