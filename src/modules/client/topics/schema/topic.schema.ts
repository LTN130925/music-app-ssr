import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type TopicDocument = Topic & Document;

@Schema({ timestamps: true })
export class Topic {
  @Prop({ required: true })
  title: string;

  @Prop()
  avatar: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  })
  slug: string;

  @Prop({
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  deleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
