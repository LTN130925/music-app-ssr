import { Model } from 'mongoose';
import { SongDocument } from '../schema/songs.schema';

// songModel là Model, không phải Document
export const updateLike = async (songModel: Model<SongDocument>, id: string, typeLike: string): Promise<number> => {
    try {
        const updated = await songModel.findByIdAndUpdate(
            id,
            { $inc: { likes: typeLike === 'dislike' ? -1 : 1 } },
            { new: true }
        );

        if (!updated) throw new Error('Song not found');

        return updated.likes; // trả về số likes mới
    } catch (err: any) {
        throw new Error(err.message);
    }
};
