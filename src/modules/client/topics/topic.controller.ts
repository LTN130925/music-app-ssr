import { Controller, Get, Render } from '@nestjs/common';

import { TopicService } from './topic.service';
// import { TopicDocument } from './schema/topic.schema';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  // [GET] /topics
  @Get()
  @Render('client/pages/topics/topics')
  async findAll(): Promise<{
    titlePage: string;
    message: string;
    topics: any[];
  }> {
    return {
      titlePage: 'Trang chủ đề',
      message: 'Danh sách chủ đề',
      topics: await this.topicService.findAll(),
    };
  }
}
