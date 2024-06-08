import WorkHistory from '@/components/tracker/WorkHistory';
import React from 'react';

const Invoice = () => {
	return (
		<div className="flex max-w-screen-2xl min-h-screen p-4 flex-col mx-auto relative">
			<div className="join join-vertical lg:join-horizontal mx-auto mt-2">
				<button className="btn join-item active">New Invoice</button>
				<button className="btn join-item">View Pending</button>
				<button className="btn join-item">View Paid</button>
			</div>
			<WorkHistory />
		</div>
	);
};

export default Invoice;
