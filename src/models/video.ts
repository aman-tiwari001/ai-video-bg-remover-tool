import { IVideo } from '@/types';
import { model, models, Schema } from 'mongoose';

const VideoSchema: Schema<IVideo> = new Schema(
	{
		replicateId: { type: String, required: true, unique: true, trim: true },
		inputVideoUrl: {
			type: String,
			required: true,
			trim: true,
			match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
		},
		outputVideoUrl: {
			type: String,
			trim: true,
			match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
		},
	},
	{ timestamps: true }
);

const VideoModel = models.Video || model<IVideo>('Video', VideoSchema);
export default VideoModel;
