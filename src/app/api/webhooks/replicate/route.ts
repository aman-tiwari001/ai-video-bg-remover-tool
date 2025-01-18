import { uploadToCloudinary } from '@/config/cloudinary';
import { connectToDb } from '@/config/db';
import VideoModel from '@/models/video';

//Webhook endpoint to receive the output video URL from Replicate
export async function POST(req: Request) {
	try {
    await connectToDb();
		const { id, output } = await req.json();
    console.log('job id-> ', id);
    console.log('output vid-> ', output);
		if (!id || !output) {
			return Response.json(
				{ success: false, error: 'Missing required fields.' },
				{ status: 400 }
			);
		}
    const cloudinaryUrl = await uploadToCloudinary(output, 'video');
		const video = await VideoModel.findOneAndUpdate(
			{ replicateId: id },
			{ outputVideoUrl: cloudinaryUrl }
		);
		if (!video) {
			return Response.json(
				{ success: false, error: 'Video not found.' },
				{ status: 404 }
			);
		}
		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		console.log('Error saving video: ', error);
		return Response.json(
			{
				success: false,
				error: 'Error saving video.',
			},
			{
				status: 500,
			}
		);
	}
}
