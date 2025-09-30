import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Song, SongSchema } from './schema/songs.schema';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Singer, SingerSchema } from '../singers/schema/singers.schema';
import { Topic, TopicSchema } from '../topics/schema/topic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema, collection: 'songs' },
      { name: Singer.name, schema: SingerSchema, collection: 'singers' },
      { name: Topic.name, schema: TopicSchema, collection: 'topics' },
    ]),
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
