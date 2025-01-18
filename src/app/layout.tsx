import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
	title: 'AI Video BG Remover',
	description: 'AI-powered video background removal tool',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en' className='scrollbar-hide'>
				<body
					className={`antialiased`}
				>
					<Navbar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
