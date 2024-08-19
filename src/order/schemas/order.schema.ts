/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus } from '../dto/create-order.dto';
import { Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';


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

  @Prop()
  email: string

  @Prop({ required: true })
  date: Date

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ type: Types.ObjectId, ref: User.name })
  serviceProviderId: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
