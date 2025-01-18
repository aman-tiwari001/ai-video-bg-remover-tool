import { connectToDb } from '@/config/db';
import VideoModel from '@/models/video';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	try {
    await connectToDb();
		const searchParams = req.nextUrl.searchParams;
		const replicateId = searchParams.get('replicateId');
		if (!replicateId) {
			return Response.json(
				{ success: false, error: 'Replicate Id is required' },
				{ status: 400 }
			);
		}
		const video = await VideoModel.findOne({ replicateId });
		if (!video) {
			return Response.json(
				{ success: false, error: 'Video not found' },
				{ status: 404 }
			);
		}
		return Response.json({ success: true, result: video }, { status: 200 });
	} catch (error) {
		console.log('Error getting video: ', error);
		return Response.json(
			{ success: false, error: 'Error getting video' },
			{ status: 500 }
		);
	}
}
