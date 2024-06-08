import React from 'react';
import hero from '../../../public/hero.png';

const Hero = () => {
	return (
		<div className="hero min-h-screen">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<img src={hero.src} className="w-full lg:w-1/2 " />
				<div className="w-full lg:w-1/2">
					<h1 className="text-6xl font-bold text-white">
						Track Your Development Hours With Ease!
					</h1>
					<p className="py-6">
						The All-in-One Solution for Freelance Developers: Track Time Across
						Employers, Customize Pay Rates, Monitor Real-Time Hours and Income,
						and Seamlessly Generate Invoices.
					</p>
					<button className="btn btn-primary">Create Account</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
