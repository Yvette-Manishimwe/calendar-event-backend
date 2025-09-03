import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { EventCategory } from 'src/common/enums/Eventcategory.enum';

export class QueryEventsDto {
  @ApiProperty()
  @IsOptional() @IsDateString() from?: string;

  @ApiProperty()
  @IsOptional() @IsDateString() to?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EventCategory)
  category?: EventCategory;

  @ApiProperty()
  @IsOptional() @IsString() q?: string;
}
