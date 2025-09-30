import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Topic, TopicDocument } from './schema/topic.schema';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private readonly topicModel: Model<TopicDocument>
  ) {}

  // [GET] /topics
  async findAll(): Promise<TopicDocument[]> {
    const filter: Record<string, unknown> = {
      status: 'active',
      deleted: false,
    };
    const topics = await this.topicModel.find(filter).exec();
    return topics;
  }
}
