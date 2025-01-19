'use client';

import { DownloadIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Video {
	replicateId: string;
	inputVideoUrl: string;
	outputVideoUrl: string;
}

const HistoryPage = () => {
	const [history, setHistory] = useState<Video[]>([]);

	const fetchUser = async () => {
		try {
			const response = await fetch('/api/get-user', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			console.log('data -> ', data);
			if (data.result) {
				setHistory(data.result.videos);
			}
		} catch (error) {
			console.log('Error fetching user: ', error);
		}
	};
	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<div className='min-h-screen pt-[80px] px-5'>
			<h1 className='text-grad text-3xl my-3'>History</h1>
			{history.length !== 0 && (
				<div className='flex justify-center gap-6 w-full'>
					<p className='text-center w-[45%] text-2xl'>Input Video</p>
					<p className='text-center w-[45%] text-2xl'>Output Video</p>
				</div>
			)}
			{history.length === 0 ? (
				<p className='text-xl my-5'>No videos</p>
			) : (
				(history as Video[]).reverse().map((video) => {
					return (
						<div key={video.replicateId}>
							<div className='flex items-center justify-center gap-6 py-4 w-full'>
								<div className='w-[45%] relative'>
									<Link
										href={video?.inputVideoUrl.replace(
											'/upload/',
											'/upload/fl_attachment/'
										)}
										download='output.mp4'
										className='bg-teal-400 absolute top-0 right-0 text-white rounded-lg cursor-pointer z-40'
									>
										<DownloadIcon
											className='bg-blue-500 p-1 text-white rounded-lg'
											size={40}
										/>
									</Link>
									<video
										className='w-full rounded-lg'
										src={video?.inputVideoUrl}
										controls
									/>
								</div>
								<div className='w-[45%] relative'>
									<Link
										href={video?.outputVideoUrl.replace(
											'/upload/',
											'/upload/fl_attachment/'
										)}
										download='output.mp4'
										className='bg-teal-400 absolute top-0 right-0 text-white rounded-lg cursor-pointer z-40'
									>
										<DownloadIcon
											className='bg-blue-500 p-1 text-white rounded-lg'
											size={40}
										/>
									</Link>
									<video
										className='rounded-lg w-full'
										src={video?.outputVideoUrl}
										controls
									/>
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default HistoryPage;
