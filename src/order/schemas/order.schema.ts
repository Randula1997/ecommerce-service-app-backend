/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


Schema()
export type OrderDocument =  Orders & Document;

@Schema()
export class Orders {
  @Prop({ required: true })
  taskCategory: string;

  @Prop()
  subCategory: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  city: string
  
  @Prop({ required: true })
  contactNumber: number

  @Prop({ required: true })
  date: Date
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
