import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsObject } from '@nestjs/class-validator';

class ItemDetailDto {
  @IsString()
  readonly color: string;

  @IsString()
  readonly size: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly quantity: number;
}

class ShippingAddressDto {
    @IsString()
    readonly location: string

    @IsString()
    readonly firstName: string

    @IsString()
    readonly lastName: string

    @IsNumber()
    readonly contactNumber: number

    @IsString()
    readonly addressLine1: string

    @IsString()
    readonly addressLine2: string
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDetailDto)
  readonly items: ItemDetailDto[];

  @IsNumber()
  readonly totalPrice: number;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ShippingAddressDto)
  readonly shippingAddress: object;
}
