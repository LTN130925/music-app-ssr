import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // // Session
  // app.use(session({
  //   secret: process.env.SESSION_SECRET as string,
  //   resave: false,
  //   saveUninitialized: false,
  //   cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
  // }));
  //
  // app.use(passport.initialize());
  // app.use(passport.session());
  //
  // // flash
  // app.use(flash());

  // Static files
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  app.listen((Number(process.env.PORT)), () => {
    console.log(`Server running on port http::/localhost:${process.env.PORT}...`);
  });
}

bootstrap();