import { uploadToCloudinary } from '@/config/cloudinary';
import { submitVideoToReplicate } from '@/config/replicate';
import UserModel from '@/models/user';
import VideoModel from '@/models/video';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
	try {
		const { inputVideoUrl, outputType } = await req.json();
		if (!inputVideoUrl) {
			return Response.json(
				{ success: false, error: 'Missing required fields.' },
				{ status: 400 }
			);
		}
		// Upload the input video to Cloudinary
		const cloudinaryUrl = await uploadToCloudinary(inputVideoUrl, 'video');
		// Run the Replicate video matting model
		const output = await submitVideoToReplicate(cloudinaryUrl, outputType);
		console.log('op from replicate-> ', output);
		// Create a document in Videos collection
		const { userId } = await auth();
		const video = await VideoModel.create({
			inputVideoUrl: cloudinaryUrl,
			replicateId: output.id,
		});
		const user = await UserModel.findOneAndUpdate(
			{ clerkId: userId },
			{ $push: { videos: video._id } }
		);
		if (!user) {
			return Response.json(
				{ success: false, error: 'User not found.' },
				{ status: 404 }
			);
		}
		return Response.json({ success: true, result: video }, { status: 200 });
	} catch (error) {
    console.log('Error removing background: ', error);
		return Response.json(
			{ success: false, error: 'Error removing background.' },
			{ status: 500 }
		);
	}
}
