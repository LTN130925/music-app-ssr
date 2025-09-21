import { Controller, Get } from '@nestjs/common';

import { TopicService } from './topic.service';
import { TopicDocument } from './schema/topic.schema';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  // [GET] /topics
  @Get()
  async findAll(): Promise<TopicDocument[]> {
    return this.topicService.findAll();
  }
}
