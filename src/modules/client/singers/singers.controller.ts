import { Controller, Get } from '@nestjs/common';

import { SingersService } from './singers.service';

@Controller('singers')
export class SingersController {
  constructor(private readonly singersService: SingersService) {}
  @Get()
  async findAll() {
    return this.singersService.findAll();
  }
}
