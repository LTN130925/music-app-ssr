// import { Injectable } from '@nestjs/common';
// import { PassportSerializer } from '@nestjs/passport';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
//
// import { UserDocument, User } from "./schema/user.schema";
//
//
// @Injectable()
// export class SessionSerializer extends PassportSerializer {
//     constructor(
//         @InjectModel(User.name) private readonly userModel: Model<UserDocument>
//     ) {
//         super();
//     }
//
//     serializeUser(user: any, done: Function): any {
//         done(null, user._id);
//     }
//
//     async deserializeUser(id: any, done: Function) {
//         try {
//             const user = await this.userModel.findOne({
//                 _id: id,
//                 deleted: false,
//                 status: 'active',
//             })
//                 .lean()
//                 .select('-password')
//                 .exec();
//             done(null, user ? user : null);
//         } catch (err) {
//             done(err, null);
//         }
//     }
// }