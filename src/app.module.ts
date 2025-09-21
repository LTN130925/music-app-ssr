import { Module, Controller, Get, Render } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Controller()
export class AppController {
  @Get()
  @Render('main')
  getHello(): Record<string, string> {
    return {
      titlePage: 'Home',
      message: 'Hello World',
    };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
