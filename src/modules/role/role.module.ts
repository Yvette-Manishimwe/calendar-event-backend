import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => UsersModule)],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}

