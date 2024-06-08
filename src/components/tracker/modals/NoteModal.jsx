import React from 'react';
import { useAppContext } from '@/context';

const NoteModal = ({ setStep }) => {
	const { state, setState } = useAppContext();
	const { note } = state;
	return (
		<dialog id="add_notes" className="modal">
			<div className="modal-box">
				<h3 className="font-semibold text-xl text-accent">Add Work Notes</h3>

				<p className="py-4 mt-2">What features did you work on?</p>
				<textarea
					className="textarea textarea-bordered w-full"
					maxLength={100}
					value={note || ''}
					onChange={(e) =>
						setState((prev) => ({ ...prev, note: e.target.value }))
					}
				></textarea>
				<div className="modal-action">
					{/* if there is a button in form, it will close the modal */}
					<button
						disabled={note?.length === 0}
						onClick={() => {
							setStep(6);
							document.getElementById('add_notes').close();
						}}
						className="btn btn-success mr-2"
					>
						Save
					</button>
					<button
						className="btn"
						onClick={async () => {
							setState((prev) => ({ ...prev, note: '' }));
							document.getElementById('add_notes').close();
						}}
					>
						Discard
					</button>
				</div>
			</div>
		</dialog>
	);
};

export default NoteModal;
