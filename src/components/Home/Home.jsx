import NavBar from "../NavBar";
import Search from "../Search";
import Foods from "./Foods";
import Header from "./Header";
import Tips from "./Tips";

function Home() {
	return (
		<>
			<div className="p-4 overflow-y-scroll h-screen pb-32">
				<Header />
				<Search />
				<div className="overflow-x-auto">
					<div className="flex gap-4 w-max">
						<Foods />
						<Foods />
						<Foods />
						<Foods />
					</div>
				</div>
				<Tips />
			</div>
			<NavBar /> 
		</>
	);
}

export default Home;
