import NavBar from "../NavBar";
import Search from "../Search";
import Foods from "./Foods";
import Header from "./Header";

function Home() {
	return (
		<>
			<div className="p-4">
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

				<NavBar />
			</div>
		</>
	);
}

export default Home;
