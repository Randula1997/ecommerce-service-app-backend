/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsDate, IsEnum, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELLED = 'cancelled',
}
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

  readonly email: string

  @IsDate()
  @Type(() => Date) 
  readonly date: Date;

  @IsEnum(OrderStatus)
  readonly status: OrderStatus = OrderStatus.PENDING;
}

