/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


Schema()
export class OrderDetail {
  @Prop()
  readonly serviceCategory: string;

  @Prop()
  readonly subCategory: string;

  @Prop()
  readonly name: string;

  @Prop()
  readonly address: string

  @Prop()
  readonly city: string
  
  @Prop()
  readonly contactNumber: number

  @Prop()
  readonly date: Date
}

export const OrderSchema = SchemaFactory.createForClass(OrderDetail);
