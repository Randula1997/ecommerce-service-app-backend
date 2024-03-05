/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
    User = 'user',
    Store = 'store',
}

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: [Role.User, Role.Store] }) 
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);