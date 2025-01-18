import { IUser } from '@/types';
import { model, models, Schema } from 'mongoose';

const UserSchema: Schema<IUser> = new Schema(
	{
		clerkId: { type: String, required: true, unique: true, trim: true },
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			match:
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
		},
		photoUrl: {
			type: String,
			trim: true,
			match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
		},
		videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
	},
	{ timestamps: true }
);

const UserModel = models.User || model<IUser>('User', UserSchema);
export default UserModel;