import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './schema/user.schema';

@Module({
    imports: [
        PassportModule.register({ session: true }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema, collection: 'users' },
        ]),
    ],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
})

export class AuthModule {}