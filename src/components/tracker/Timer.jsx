'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context';
import { calculateElapsedTime, calculateIncome } from '../../utils';

const Timer = () => {
	const { state, setState } = useAppContext();
	const { rate, employer } = state;
	const { startTime, endTime } = state;
	const [elapsedTime, setElapsedTime] = useState(null);
	const [income, setIncome = useState] = useState(0);

	useEffect(() => {
		if (startTime != null && endTime === null) {
			const devTimer = setInterval(() => {
				const currentTime = new Date();
				const elapsedTime = calculateElapsedTime(startTime, currentTime);
				const currentIncome = calculateIncome(elapsedTime?.totalSeconds, rate);
				console.log('elapsed time', elapsedTime);
				setElapsedTime(elapsedTime);
				setIncome(currentIncome);
			}, 1000);
			if (endTime != null) {
				const elapsedTime = calculateElapsedTime(startTime, endTime);
				const currentIncome = calculateIncome(elapsedTime?.totalSeconds, rate);
				setIncome(currentIncome);
				clearInterval(devTimer);
			}
			// Clean up the interval on component unmount
			return () => {
				if (devTimer) {
					clearInterval(devTimer);
				}
			};
		}
	}, [startTime, endTime]);

	return (
		<>
			{startTime && !endTime ? (
				<div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-accent text-base-300 p-8 rounded-lg w-full mt-2">
					<div className="flex flex-row items-center justify text-sm md:text-base lg:text-xl gap-8">
						<p>
							<span className="font-semibold">Employer:</span> {employer?.name}
						</p>
						<p>
							<span className="font-semibold">Pay Rate:</span> ${rate} / hour
						</p>
						<p>
							<span className="font-semibold">Income:</span> $
							{(income > 0 && income) || '0.00'}
						</p>
					</div>
					<div className="flex gap-5">
						<div>
							<span className="countdown font-mono text-4xl">
								<span
									style={{
										'--value': elapsedTime?.hours,
									}}
								></span>
							</span>
							hours
						</div>
						<div>
							<span className="countdown font-mono text-4xl">
								<span
									style={{
										'--value': elapsedTime?.minutes,
									}}
								></span>
							</span>
							min
						</div>
						<div>
							<span className="countdown font-mono text-4xl">
								<span
									style={{
										'--value': elapsedTime?.seconds,
									}}
								></span>
							</span>
							sec
						</div>
					</div>
				</div>
			) : startTime && endTime ? (
				<div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-warning text-base-300 p-8 rounded-lg w-full mt-2">
					<div className="flex flex-row items-center justify text-sm md:text-base lg:text-xl gap-8">
						<p>
							<span className="font-semibold">Employer:</span> {employer?.name}
						</p>
						<p>
							<span className="font-semibold">Pay Rate:</span> ${rate} / hour
						</p>
						<p>
							<span className="font-semibold">Income:</span> $
							{(income > 0 && income) || '0.00'}
						</p>
					</div>
					<div className="flex gap-5">
						<div>
							<span className="countdown font-mono text-4xl">
								<span
									style={{
										'--value': calculateElapsedTime(startTime, endTime)?.hours,
									}}
								></span>
							</span>
							hours
						</div>
						<div>
							<span className="countdown font-mono text-4xl">
								<span
									style={{
										'--value': calculateElapsedTime(startTime, endTime).minutes,
									}}
								></span>
							</span>
							min
						</div>
						<div>
							<span className="countdown font-mono text-4xl">
								<span
									style={{
										'--value': calculateElapsedTime(startTime, endTime).seconds,
									}}
								></span>
							</span>
							sec
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Timer;
