import VideoModel from '@/models/video';

export async function POST(req: Request) {
	try {
		const { id, output } = await req.json();
    console.log('job id-> ', id);
    console.log('output vid-> ', output);
		if (!id || !output) {
			return Response.json(
				{ success: false, error: 'Missing required fields.' },
				{ status: 400 }
			);
		}
		const video = await VideoModel.findOneAndUpdate(
			{ replicateId: id },
			{ outputVideoUrl: output }
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
