import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schema/user.schema';
//
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}
//
    async register(body: { fullName: string, email: string, password: string }): Promise<void> {
        try {
            const exitsUser = await this.userModel.findOne({
                email: body.email,
                deleted: false,
                status: 'active',
            })
                .lean()
                .exec();
            if (exitsUser) throw new Error('User already exists');

            const newUser = {
                fullName: body.fullName,
                email: body.email,
                password: await bcrypt.hash(body.password, 10) as string,
            }
            const user = new this.userModel(newUser);
            // await user.save();
        } catch (err: any) {
            throw new InternalServerErrorException(err.message);
        }
    }
//
//     async login(email: string, password: string): Promise<UserDocument | null> {
//         try {
//             const user = await this.userModel.findOne({
//                 email: email,
//                 deleted: false,
//                 status: 'active',
//             })
//                 .lean()
//                 .exec();
//             if (!user) throw new Error('User not found');
//             else return await bcrypt.compare(password, user.password) ? user : null;
//         } catch {
//             throw new InternalServerErrorException('Error logging in');
//         }
//     }
}