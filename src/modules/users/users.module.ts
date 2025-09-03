/* eslint-disable */
/*
 @auhor : © 2024 Alice Umugwaneza <umugwanezaalice22@gmail.com>
*/

/**
 * @file
 * @brief User module configuration
 */
import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilsModule } from '../utils/utils.module';
import { User } from 'src/entities/users.entity';
import { RoleModule } from '../role/role.module';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  controllers: [UsersController],
  
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    UtilsModule
  ],
  providers: [UsersService,JwtService],
  exports: [UsersService],
})
export class UsersModule {}
