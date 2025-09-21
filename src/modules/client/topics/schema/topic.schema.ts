import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TopicDocument = Topic & Document;

@Schema({ timestamps: true })
export class Topic {
  @Prop({ required: true })
  title: string;

  @Prop()
  avatar: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  slug: string;

  @Prop({
    enum: ['active', 'inactive'],
    default: 'active',
    required: true,
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
