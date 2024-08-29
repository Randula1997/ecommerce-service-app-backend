/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsDate, IsEnum, IsEmail, ValidateIf, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELLED = 'cancelled',
}
export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  readonly taskCategory: string;

  @ApiProperty()
  @IsString()
  readonly subCategory: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @ValidateIf((o) => !o.latitude && !o.longitude)
  @IsString()
  readonly address?: string;

  @ApiProperty()
  @ValidateIf((o) => !o.address)
  @IsNumber()
  readonly latitude?: number;

  @ApiProperty()
  @ValidateIf((o) => !o.address)
  @IsNumber()
  readonly longitude?: number;

  @ApiProperty()
  @IsString()
  readonly city: string
  
  @ApiProperty()
  @IsNumber() 
  readonly contactNumber: number

  @ApiProperty()
  readonly email: string

  @ApiProperty()
  @IsDate()
  @Type(() => Date) 
  readonly date: Date;

  @ApiProperty()
  @IsEnum(OrderStatus)
  readonly status: OrderStatus = OrderStatus.PENDING;

  @IsOptional()
  userId?: string;
}

