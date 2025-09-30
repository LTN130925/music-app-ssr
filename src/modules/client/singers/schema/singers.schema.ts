import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SingerDocument = Document & Singer;

@Schema({ timestamps: true })
export class Singer {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  avatar: string;

  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  })
  slug: string;

  @Prop({
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

export const SingerSchema = SchemaFactory.createForClass(Singer);
