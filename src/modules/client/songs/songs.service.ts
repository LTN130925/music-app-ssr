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

  // [GET] /songs/:slug
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

  // [GET] /songs/detail/:slug
  async findOne(slug: string): Promise<SongDocument> {
    try {
      const song = await this.songModel
        .findOne({ slug: slug, deleted: false, status: 'active' })
        .populate('singerId', 'fullName')
        .exec();
      if (!song) throw new Error('Song not found');

      // set views
      song.views += 1;
      await song.save();

      // get topic title
      const topic = await this.topicModel
        .findOne({ _id: song.topicId })
        .select('title')
        .exec();
      song.topicId = topic?.title || '';
      
      return song;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
