import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ collection: 'tasks', timestamps: true })
export class Task {

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: false })
  completed: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);