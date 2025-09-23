import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Song, SongDocument } from './schema/songs.schema';
import { Topic, TopicDocument } from '../topics/schema/topic.schema';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<SongDocument>,
    @InjectModel(Topic.name) private readonly topicModel: Model<TopicDocument>
  ) {}

  // [GET] /songs
  async findAll(slug: string): Promise<SongDocument[]> {
    try {
      const findTopic = await this.topicModel
        .findOne({ slug: slug, deleted: false, status: 'active' })
        .exec();

      if (!findTopic) {
        throw new Error('Topic not found');
      }

      const filter: Record<string, unknown> = {
        topicId: findTopic._id,
        deleted: false,
        status: 'active',
      };
      const songs = await this.songModel
        .find(filter)
        .populate('singerId', 'fullName')
        .exec();
      return songs;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
