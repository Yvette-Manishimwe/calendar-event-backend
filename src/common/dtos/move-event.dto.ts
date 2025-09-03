import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
export class MoveEventDto {
@ApiProperty()
  @IsDateString() startTime: string;
  @IsDateString() endTime: string;
}