/* eslint-disable */
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EGender } from '../enums/EGender.enum';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EGender, { message: 'gender must be one of the following values: MALE, FEMALE, OTHER' })
  gender: EGender;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  registercode: string;


  @ApiProperty()
  @IsNotEmpty()
  phone_number: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
