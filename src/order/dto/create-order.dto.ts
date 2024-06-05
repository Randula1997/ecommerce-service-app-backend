/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  readonly taskCategory: string;

  @IsString()
  readonly subCategory: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly address: string

  @IsString()
  readonly city: string
  
  @IsNumber() 
  readonly contactNumber: number

  @IsDate()
  @Type(() => Date) 
  readonly date: Date;
}

