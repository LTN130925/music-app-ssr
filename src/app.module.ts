import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '',
        module: ClientModule,
      },
    ]),
    ClientModule,
  ],
})
export class AppModule {}
