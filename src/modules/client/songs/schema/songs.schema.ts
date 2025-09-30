import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type SongDocument = Document & Song;

@Schema({ timestamps: true })
export class Song {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  avatar: string;

  @Prop()
  topicId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Singer',
  })
  singerId: string;

  @Prop()
  likes: number;

  @Prop()
  views: number;

  @Prop()
  lyrics: string;

  @Prop()
  audio: string;

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

  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  })
  slug: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
