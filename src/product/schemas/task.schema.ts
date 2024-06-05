/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  name: string;

  @Prop()
  image: string

  @Prop()
  subCategories: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
