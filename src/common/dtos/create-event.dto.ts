import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EventCategory } from 'src/common/enums/Eventcategory.enum';

export class CreateEventDto {
  @ApiProperty()
  @IsString() @IsNotEmpty() title: string;

  @IsString() @IsOptional() description?: string;

  @ApiProperty()
  @IsDateString() startTime: string;

  @IsDateString() endTime: string;

  @ApiProperty()
  @IsEnum(EventCategory)
  category: EventCategory;

  @ApiProperty()
  @IsString() @IsOptional() location?: string;

  @IsBoolean() @IsOptional() isAllDay?: boolean;

  @IsString() @IsOptional() color?: string;

  @ApiProperty()
  @IsBoolean() isPublic: boolean;

  @IsBoolean() requiresApproval: boolean;

  @IsInt() @IsOptional() capacity?: number;
}
