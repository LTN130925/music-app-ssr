import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({
        required: true,
        type: String
    })
    fullName: string;

    @Prop({
        required: true,
        type: String
    })
    password: string;

    @Prop({
        required: true,
        type: String
    })
    email: string;

    @Prop({
        type: String
    })
    avatar?: string;

    @Prop({ type: [String] })
    listLikesSong?: string[];

    @Prop({ type: [String] })
    listFavoritesSong?: string[];

    @Prop({
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    })
    status?: string;

    @Prop({
        type: Boolean,
        default: false
    })
    deleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);