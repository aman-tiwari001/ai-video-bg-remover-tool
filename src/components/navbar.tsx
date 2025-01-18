import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { HistoryIcon, ImageIcon, Wand2Icon } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='max-md:px-2 flex justify-between items-center px-4 py-3 bg-emerald-300 fixed top-0 z-50 w-full'>
			<Link href={'/'}>
				<div className='flex gap-2'>
					<Wand2Icon className='max-md:w-5' />
					<h1 className='max-md:text-[16px] max-md:w-24 text-wrap text-base font-bold'>
						AI Video BG Remover
					</h1>
				</div>
			</Link>
			<div className='flex items-center space-x-7 max-md:text-sm max-md:space-x-1'>
				<Link
					href='/remove-bg'
					className='border-2 hover:shadow-2xl hover:shadow-emerald-950 border-emerald-300 hover:border-black rounded-xl p-2 max-md:p-1'
				>
					<div className='flex font-semibold items-center gap-1'>
						<ImageIcon className='max-md:w-5' />
						Remove BG
					</div>
				</Link>
				<Link
					href='/history'
					className='border-2 hover:shadow-2xl hover:shadow-emerald-950 border-emerald-300 hover:border-black rounded-xl p-2 max-md:p-1'
				>
					<div className='flex font-semibold items-center gap-1'>
						<HistoryIcon className='max-md:w-5' />
						History
					</div>
				</Link>
				<SignedOut>
					<div className='btn-primary border-2 border-black'>
						<SignInButton forceRedirectUrl={'/remove-bg'} />
					</div>
				</SignedOut>
				<SignedIn>
					<div className='btn-primary shadow-2xl border border-green-100'>
						<UserButton showName />
					</div>
				</SignedIn>
			</div>
		</nav>
	);
};

export default Navbar;
