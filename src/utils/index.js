// Function to calculate elapsed time
export const calculateElapsedTime = (startTime, endTime) => {
	const start = new Date(startTime);
	const end = new Date(endTime);
	const elapsed = end - start; // Difference in milliseconds
	let totalSeconds = Math.floor(elapsed / 1000);
	let minutes = Math.floor(totalSeconds / 60);
	let hours = Math.floor(minutes / 60);

	let seconds = totalSeconds % 60;
	minutes = minutes % 60;

	return {
		hours,
		minutes,
		seconds,
		totalSeconds,
	};
};

export function calculateIncome(elapsedTimeInSeconds, payRatePerHour) {
	const elapsedTimeInHours = Number(elapsedTimeInSeconds) / 3600;
	const income = (elapsedTimeInHours * Number(payRatePerHour)).toFixed(2);
	return income;
}
