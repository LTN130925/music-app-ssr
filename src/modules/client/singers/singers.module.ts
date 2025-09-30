import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Singer, SingerSchema } from './schema/singers.schema';
import { SingersController } from './singers.controller';
import { SingersService } from './singers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Singer.name, schema: SingerSchema, collection: 'singers' },
    ]),
  ],
  controllers: [SingersController],
  providers: [SingersService],
})
export class SingerModule {}
