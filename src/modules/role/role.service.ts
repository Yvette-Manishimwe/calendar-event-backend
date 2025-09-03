/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { ERole } from 'src/common/enums/ERole.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }

async findOne(id: number): Promise<Role> {
  const role = await this.roleRepo.findOne({ where: { id } });
  if (!role) throw new NotFoundException(`Role with id ${id} not found`);
  return role;
}

  async getRoleByName(name: any) {
    try {
      return await this.roleRepo.findOne({ where: { role_name: name } });
    } catch (error) {
      throw error;
    }
  }


  async create(data: Partial<Role>): Promise<Role> {
    const role = this.roleRepo.create(data);
    return this.roleRepo.save(role);
  }

  async createRoles(): Promise<void> {
  const defaultRoles: ERole[] = [
    ERole.ADMIN,
    ERole.USER,
    ERole.SUPER_ADMIN,
  ];

  for (const roleName of defaultRoles) {
    const existing = await this.roleRepo.findOne({ where: { role_name: roleName } });
    if (!existing) {
      const role = this.roleRepo.create({ role_name: roleName });
      await this.roleRepo.save(role);
    }
  }
}


async update(id: number, data: Partial<Role>): Promise<Role> {
  const role = await this.findOne(id);
  Object.assign(role, data);
  return this.roleRepo.save(role);
}

async remove(id: number): Promise<void> {
  const role = await this.findOne(id);
  await this.roleRepo.remove(role);
}
}
