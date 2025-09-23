import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Singer, SingerDocument } from './schema/singers.schema';

@Injectable()
export class SingersService {
  constructor(
    @InjectModel(Singer.name) private singerModel: Model<SingerDocument>
  ) {}

  async findAll(): Promise<Singer[]> {
    return this.singerModel.find().exec();
  }
}
