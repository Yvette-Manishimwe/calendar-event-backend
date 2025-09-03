import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { EGender } from '../enums/EGender.enum';


export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EGender, { message: 'gender must be one of the following values: MALE, FEMALE, OTHER' })
  gender: EGender;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}