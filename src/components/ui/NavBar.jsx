'use client';

import React, { useEffect } from 'react';
import { useAppContext } from '@/context';
import { auth, db } from '@/services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import userImage from '../../../public/user.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logOutUser } from '@/services/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import CreateAccount from '../account/CreateAccount';
import LogIn from '../account/LogIn';

const NavBar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { state, setState } = useAppContext();
	const { user } = state;

	useEffect(() => {
		// This will unsubscribe from auth changes
		const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
			if (user) {
				setState((prev) => ({ ...prev, user: user }));
				// Listen to changes in user data
				const unsubscribeData = onSnapshot(
					doc(db, 'users', user.uid),
					(doc) => {
						if (doc.exists()) {
							setState((prev) => ({ ...prev, userData: doc.data() }));
						} else {
							// Handle the case where there is no user data document
							setState((prev) => ({ ...prev, userData: null }));
						}
					},
					(error) => {
						console.error('Error fetching user data:', error);
					}
				);

				// Clean up the data subscription when the user logs out
				return () => unsubscribeData();
			} else {
				router.push('/');
				setState((prev) => ({
					...prev,
					user: null,
					userData: null,
					employer: null,
					rate: null,
					startTime: null,
					endTime: null,
					note: null,
				}));
			}
		});

		// Clean up the auth subscription on component unmount
		return () => unsubscribeAuth();
	}, []);

	function closeDropdown() {
		document.getElementById('menu_dropdown').removeAttribute('open');
	}

	return (
		<div className="navbar bg-info">
			<CreateAccount />
			<LogIn />
			<div className="flex-1">
				<Link href="/" className="btn btn-ghost text-xl text-accent-content">
					🧑🏻‍💻 devTracker v1.0
				</Link>
				{/* <p>{pathname}</p> */}
			</div>
			<div className="flex flex-row items-center gap-1 me-2">
				{!user && (
					<button
						className="btn btn-neutral"
						onClick={() => document.getElementById('log_in').showModal()}
					>
						Sign In
					</button>
				)}
				{user && (
					<details id="menu_dropdown" className="dropdown dropdown-end">
						<summary className="m-1 btn btn-circle overflow-clip border-none">
							<img alt="User Icon" src={userImage.src} />
						</summary>
						<ul className="p-2 shadow-xl shadow-white/10 menu dropdown-content bg-base-100 rounded-box w-80  mt-4 border border-info z-20">
							{user && (
								<p className="font-semibold my-2 text-info uppercase mx-auto">
									{user?.email}
								</p>
							)}
							{user && pathname != '/tracker' && (
								<li onClick={() => closeDropdown()}>
									<Link href="/tracker" className="justify-between">
										Tracker
									</Link>
								</li>
							)}
							{user && pathname != '/invoice' && (
								<li onClick={() => closeDropdown()}>
									<Link href="/invoice" className="justify-between">
										Generate Invoice
									</Link>
								</li>
							)}
							{user && pathname != '/settings' && (
								<li onClick={() => closeDropdown()}>
									<Link href="/settings" className="justify-between">
										Settings
									</Link>
								</li>
							)}
							{!user && (
								<li onClick={() => closeDropdown()}>
									<button
										onClick={() =>
											document.getElementById('sign_up').showModal()
										}
									>
										Create Account
									</button>
								</li>
							)}
							{!user && (
								<li onClick={() => closeDropdown()}>
									<button
										onClick={() =>
											document.getElementById('log_in').showModal()
										}
									>
										Sign In
									</button>
								</li>
							)}
							{user && (
								<li onClick={() => closeDropdown()}>
									<button onClick={() => logOutUser()}>Logout</button>
								</li>
							)}
						</ul>
					</details>
				)}
				{/* <button
					onClick={clearLocalStorage}
					className="btn btn-square btn-ghost text-accent-content"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-5 h-5 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
						></path>
					</svg>
				</button> */}
			</div>
		</div>
	);
};

export default NavBar;
