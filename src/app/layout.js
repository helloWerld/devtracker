import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '../components/ui/NavBar';
import { AppWrapper } from '../context';
import CreateAccount from '@/components/account/CreateAccount';
import LogIn from '@/components/account/LogIn';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'devTracker v1.0',
	description: 'Track Your Development Hours with Ease!',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="dark">
			<body
				className={`${inter.className} bg-black min-h-screen overflow-x-clip relative`}
			>
				<AppWrapper>
					<CreateAccount />
					<LogIn />
					<NavBar />
					{children}
				</AppWrapper>
			</body>
		</html>
	);
}
