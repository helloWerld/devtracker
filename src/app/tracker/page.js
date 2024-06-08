import CreateAccount from '../../components/account/LogIn';
import Instructions from '../../components/tracker/Instructions';
import Report from '../../components/tracker/Report';
import Timer from '../../components/tracker/Timer';
import WorkHistory from '../../components/tracker/WorkHistory';

export default function Home() {
	return (
		<main className="flex max-w-screen-2xl min-h-screen p-4 flex-col mx-auto relative">
			<Timer />
			<div className="flex flex-col lg:flex-row gap-6 mt-6">
				<Instructions />
				<Report />
			</div>
			<WorkHistory />
		</main>
	);
}
