import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
export class UpdateBookingStatusDto {
    @ApiProperty()
  @IsIn(['confirmed', 'cancelled'])
  status: 'confirmed' | 'cancelled';
}