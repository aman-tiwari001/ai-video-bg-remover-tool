import {
	ArrowRight,
	Video,
	History,
	Zap,
	UploadCloud,
	CpuIcon,
	DownloadIcon,
} from 'lucide-react';
import { SignUpButton } from '@clerk/nextjs';

const Home = () => {
	return (
		<div className='space-y-16 pt-24'>
			<section className='text-center space-y-4'>
				<h1 className='text-4xl font-bold text-grad'>
					AI-Powered Video Background Removal!
				</h1>
				<p className='text-xl text-gray-600 underline'>
					Transform your videos with our cutting-edge AI technology
				</p>
				<div>
          <div className='flex btn-primary w-36 mx-auto justify-center items-center gap-1'>
            <SignUpButton forceRedirectUrl={'/remove-bg'}>
              Get Started
            </SignUpButton>
            <ArrowRight className='h-4 w-4' />
          </div>
				</div>
			</section>

			<section className='grid md:grid-cols-3 gap-8 px-8'>
				<div className='text-center space-y-2 bg-grad py-8 rounded-xl'>
					<Video className='mx-auto h-12 w-12 text-blue-600' />
					<h2 className='text-xl font-semibold'>Easy Upload</h2>
					<p className='text-gray-800'>
						Simply upload your video and let our AI do the rest
					</p>
				</div>
				<div className='text-center space-y-2 bg-grad py-8 rounded-xl'>
					<Zap className='mx-auto h-12 w-12 text-orange-600' />
					<h2 className='text-xl font-semibold'>Fast Processing</h2>
					<p className='text-gray-800'>
						Get your background-removed video in seconds
					</p>
				</div>
				<div className='text-center space-y-2 bg-grad py-8 rounded-xl'>
					<History className='mx-auto h-12 w-12 text-green-700' />
					<h2 className='text-xl font-semibold'>View History</h2>
					<p className='text-gray-800'>
						Access all your processed videos anytime
					</p>
				</div>
			</section>

			<section className='bg-grad px-8 rounded-t-3xl py-5'>
				<h2 className='text-3xl mb-4 font-bold text-center text-white'>
					How It Works?
				</h2>
				<div className='grid md:grid-cols-3 gap-8'>
					<div className='space-y-2 text-center'>
						<div className='bg-white p-10 space-y-4 rounded-xl shadow-sm'>
							<UploadCloud color='#10b981' size={50} className='mx-auto' />
							<p className='text-center text-black text-lg'>
								1. Upload your video
							</p>
						</div>
					</div>
					<div className='space-y-2 text-center'>
						<div className='bg-white p-10 space-y-4 rounded-xl shadow-sm'>
							<CpuIcon color='#10b981' size={50} className='mx-auto' />
							<p className='text-center text-black text-lg'>
								2. AI removes the background
							</p>
						</div>
					</div>
					<div className='space-y-2 text-center'>
						<div className='bg-white p-10 space-y-4 rounded-xl shadow-sm'>
							<DownloadIcon color='#10b981' size={50} className='mx-auto' />
							<p className='text-center text-black text-lg'>
								3. Download your video
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default Home;
