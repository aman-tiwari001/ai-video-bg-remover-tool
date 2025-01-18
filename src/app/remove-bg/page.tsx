'use client';
import { FileUploaderMinimal } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const RemoveBgPage = () => {
	const [video, setVideo] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [outputType, setOutputType] = useState<
		'green-screen' | 'alpha-mask' | 'foreground-mask'
	>('green-screen');

	const handleProcessVideo = async (e: FormEvent) => {
		e.preventDefault();
		if (!video) {
			toast.error('Please upload a video');
			return;
		}
		try {
			setLoading(true);
			const response = await fetch('/api/remove-bg', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					inputVideoUrl: video,
					outputType,
				}),
			});
			const data = await response.json();
			toast.success('Request queued!');
			console.log('data-> ', data);
		} catch (error) {
			console.log('Error processing video: ', error);
			toast.error('Error processing video');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='h-[calc(100vh-67.2px)] flex w-full flex-col items-center justify-center mt-[67.2px]'>
			<div className='rounded-xl p-10 max-md:w-[90%] w-[40%] bg-white shadow-md border'>
				<h1 className='text-3xl text-grad mb-10 text-center'>
					Remove Video BG
				</h1>
				<form className='flex flex-col gap-2' onSubmit={handleProcessVideo}>
					<label className='text-lg'>Upload Video:</label>
					<FileUploaderMinimal
						useCloudImageEditor={false}
						sourceList='local, url, camera, gdrive'
						classNameUploader='uc-light uc-turquoise'
						pubkey='17587691abd3e699c67a'
						accept='.mp4, .mov'
						multiple={false}
						maxLocalFileSizeBytes={100000000}
						onFileUploadSuccess={(vid) => setVideo(vid.cdnUrl)}
					/>
					<div className='flex flex-col space-y-2'>
						<label htmlFor='output_type' className='text-lg'>
							Output Type:
						</label>
						<select
							name='output_type'
							id='output_type'
							defaultValue={'green-screen'}
							className='p-2 rounded-md border border-gray-300'
							onChange={(e) =>
								setOutputType(
									e.target.value as
										| 'green-screen'
										| 'alpha-mask'
										| 'foreground-mask'
								)
							}
						>
							<option value='green-screen'>Green Screen</option>
							<option value='alpha-mask'>Alpha Mask</option>
							<option value='foreground-mask'>Foreground Mask</option>
						</select>
					</div>
					<button disabled={loading} className='btn-primary mt-4 text-center'>
						{loading ? (
							<Image
								className='animate-spin mx-auto'
								src='/loader.svg'
								width={36}
								height={36}
								alt='loader'
							/>
						) : (
							'Process Video'
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default RemoveBgPage;
