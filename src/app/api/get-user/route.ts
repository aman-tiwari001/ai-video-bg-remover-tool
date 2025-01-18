import { connectToDb } from '@/config/db';
import UserModel from '@/models/user';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
	try {
		await connectToDb();
		const { userId } = await auth();
		if (!userId) {
			return Response.json(
				{ success: false, error: 'Unauthenticated' },
				{ status: 401 }
			);
		}
		const user = await UserModel.findOne({ clerkId: userId }).populate(
			'videos'
		);
		if (!user) {
			return Response.json(
				{ success: false, error: 'User not found.' },
				{ status: 404 }
			);
		}
		return Response.json({ success: true, result: user }, { status: 200 });
	} catch (error) {
		console.log('Error getting user: ', error);
		return Response.json(
			{ success: false, error: 'Error getting user.' },
			{ status: 500 }
		);
	}
}
