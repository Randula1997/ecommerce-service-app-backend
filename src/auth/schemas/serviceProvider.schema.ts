/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceProviderDocument = ServiceProvider & Document;

@Schema()
export class ServiceProvider {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  photo: string;

  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpires: Date;

  @Prop()
  category: string;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  experience: number;

  @Prop()
  rating: number;

  @Prop([{ type: Object }])
  appointments: Record<string, any>[];
}

export const ServiceProviderSchema = SchemaFactory.createForClass(ServiceProvider);