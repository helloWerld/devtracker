'use client';

import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { RxReset } from 'react-icons/rx';
import { useAppContext } from '../../context';
import Confetti from 'react-confetti';
import {
	addEmployerToEmployersList,
	removeEmployerFromEmployersList,
	saveWorkEventToWorkHistory,
} from '@/services/firestore';
import NoteModal from './modals/NoteModal';
import NewEmployerModal from './modals/NewEmployerModal';

const Instructions = () => {
	const { state, setState } = useAppContext();
	const { employer, rate, startTime, endTime, note, userData, user } = state;
	const [step, setStep] = useState(0);
	const [newEmployer, setNewEmployer] = useState({
		id: '',
		name: '',
		defaultRate: 0,
	});
	const [confetti, setConfetti] = useState(false);

	// Change step on actions
	useEffect(() => {
		if (employer?.id) {
			setStep(2);
		}
		if (rate) {
			setStep(3);
		}
		if (startTime != null) {
			setStep(4);
		}
		if (endTime != null) {
			setStep(5);
		}
	}, [employer, rate, startTime, endTime, note]);

	// Reset tracker
	const reset = () => {
		setState((prev) => ({
			...prev,
			employer: { id: '', name: '', defaultRate: 0 },
			rate: 0,
			startTime: null,
			endTime: null,
			note: '',
		}));
		setStep(1);
	};

	// Save new work
	const save = async () => {
		console.log('work history', {
			employer: employer,
			rate: rate,
			startTime: startTime,
			endTime: endTime,
			note: note,
			status: 'unpaid',
		});

		// TODO: Add function to set new work history in firestore
		try {
			const response = await saveWorkEventToWorkHistory(user.uid, {
				employer: employer,
				rate: rate,
				startTime: startTime,
				endTime: endTime,
				note: note,
				status: 'unpaid',
			});
			if (response.isError) {
				console.log('Error:', response.error);
			} else {
				document.getElementById('kaching').play();
				setConfetti(true);
			}
		} catch (error) {
			console.log('Error saving work event!', error);
		}
		reset();
	};

	return (
		<>
			<audio id="kaching" src="/kaching.mp3" />
			{confetti && (
				<div className="fixed top-0 left-0 right-0 z-[100]">
					<Confetti
						confettiSource={{ x: 0, y: 50, w: window.innerWidth, h: 0 }}
						width={window.width}
						height={window.height}
						recycle={false}
						numberOfPieces={1000}
						onConfettiComplete={() => setConfetti(false)}
					/>
				</div>
			)}
			<div className="bg-base-100 p-8 rounded-lg w-full lg:w-1/2">
				{/* Modals */}

				{/* New Employer Modal */}
				<NewEmployerModal step={step} />

				{/* Note Modal */}
				<NoteModal setStep={setStep} />

				{/* Instuctions */}
				<div className="flex flex-row w-full items-center justify-between">
					<h2 className="text-3xl font-semibold text-white">How It Works:</h2>
					<div className="tooltip tooltip-left" data-tip="Reset Tracker">
						<RxReset
							onClick={() => reset()}
							className="text-lg cursor-pointer"
						/>
					</div>
				</div>
				<hr className="mt-4 border-white/20" />
				<div className="">
					<ul className="flex flex-col steps steps-vertical mt-4 justify-center w-full">
						<li className="step step-info" data-content="🧑🏻‍💻">
							<div className="flex flex-row w-full items-center justify-between gap-4">
								<p>Choose Employer</p>
								<details
									id="new_employer_dropdown"
									className="dropdown dropdown-end"
								>
									<summary disabled={step > 3} className="m-1 btn">
										{employer?.name || 'Click Here'}
									</summary>
									<ul className="p-2 shadow menu dropdown-content bg-base-300 gap-2 rounded-box w-52">
										{userData?.employersList?.map((employer) => (
											<li key={employer?.id}>
												<button
													className="flex w-full justify-between"
													onClick={() => {
														setState((prev) => ({
															...prev,
															employer: employer,
															rate: employer?.defaultRate,
														}));
														document
															.getElementById('new_employer_dropdown')
															.removeAttribute('open');
													}}
												>
													{employer?.name}
													<div
														className="flex items-center justify-center hover:bg-error hover:text-base-100 rounded-md w-5 h-5 -mr-2"
														onClick={(e) => {
															e.stopPropagation();
															console.log('trash');
															removeEmployerFromEmployersList(
																user.uid,
																employer
															);
															reset();
														}}
													>
														<FaTrashAlt />
													</div>
												</button>
											</li>
										))}
										<li>
											<button
												className="btn btn-primary"
												onClick={() => {
													setNewEmployer({ id: Date.now(), name: '', rate: 0 });
													document.getElementById('add_employer').showModal();
												}}
											>
												+ Add New Employer
											</button>
										</li>
									</ul>
								</details>
							</div>
						</li>
						<li
							className={`step ${step >= 2 && 'step-info'}`}
							data-content="💰"
						>
							<div className="flex flex-row w-full items-center justify-between gap-4">
								<p className="flex flex-nowrap">Set Pay Rate</p>
								<label className="input input-bordered flex gap-1 items-center">
									$
									<input
										type="number"
										disabled={step > 3}
										className="w-16"
										placeholder="--"
										value={rate?.toFixed(0)}
										onChange={(e) =>
											setState((prev) => ({
												...prev,
												rate: Number(e.target.value),
											}))
										}
									/>
									/ hour
								</label>
							</div>
						</li>
						<li
							className={`step ${step >= 3 && 'step-info'}`}
							data-content="⏳"
						>
							<div className="flex flex-row w-full items-center justify-between gap-4">
								<p className="flex flex-nowrap">Start Timer</p>
								<button
									onClick={() =>
										setState((prev) => ({ ...prev, startTime: new Date() }))
									}
									disabled={step != 3}
									className="btn btn-accent"
								>
									Start Working!
								</button>
							</div>
						</li>
						<li
							className={`step ${step >= 4 && 'step-info'}`}
							data-content="⌛️"
						>
							{' '}
							<div className="flex flex-row w-full items-center justify-between gap-4">
								<p className="flex flex-nowrap">End Timer</p>
								<button
									onClick={() =>
										setState((prev) => ({ ...prev, endTime: new Date() }))
									}
									className="btn btn-error"
									disabled={step != 4}
								>
									End Work.
								</button>
							</div>
						</li>
						<li
							className={`step ${step >= 5 && 'step-info'}`}
							data-content="✏️"
						>
							{' '}
							<div className="flex flex-row w-full items-center justify-between gap-4">
								<p className="flex flex-nowrap">Add a Note</p>
								<button
									onClick={() =>
										document.getElementById('add_notes').showModal()
									}
									className="btn btn-info"
									disabled={step != 5}
								>
									Add Work Notes
								</button>
							</div>
						</li>
						<li
							className={`step ${step >= 6 && 'step-info'}`}
							data-content="🤑"
						>
							<div className="flex flex-row w-full items-center justify-between gap-4">
								<p className="flex flex-nowrap">Save Progress</p>
								<div className="flex flex-row items-center gap-2">
									<button
										onClick={save}
										className="btn btn-accent"
										disabled={step < 6}
									>
										Save Event
									</button>
									<button
										onClick={reset}
										className="btn hover:btn-error"
										disabled={step < 6}
									>
										Discard
									</button>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Instructions;
