import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Role } from './entities/role.entity';
import { Event } from './entities/event.entity';
import { Booking } from './entities/booking.entity';
import { UsersModule } from './modules/users/users.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleService } from './modules/role/role.service';
import { EventsModule } from './modules/events/events.module';
import { BookingsModule } from './modules/booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [
          User,
          Role,
          Event,
          Booking
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    JwtModule,
    UsersModule,
    RoleModule,
    AuthModule,
    EventsModule,
    BookingsModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly roleService: RoleService
  ) {}

  async onModuleInit() {
    console.log(this.configService.get('DATABASE_URL'));
    await this.roleService.createRoles();
  }
}