import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class ItemDetail {
  @Prop()
  color: string;

  @Prop()
  size: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

class ShippingAddress {
  @Prop()
  location: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  contactNumber: number;

  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;
}

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: [ItemDetail] })
  items: ItemDetail[];

  @Prop()
  totalPrice: number;

  @Prop({ type: ShippingAddress })
  shippingAddress: ShippingAddress;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
