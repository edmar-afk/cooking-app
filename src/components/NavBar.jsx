import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import MicIcon from "@mui/icons-material/Mic";
import Person2Icon from "@mui/icons-material/Person2";

function NavBar() {
	const [active, setActive] = useState("Home");

	return (
		<>
			<div className="fixed bottom-0 left-0 z-50 w-full h-fit px-2 bg-white border-t border-gray-200 ">
				
				<div className="flex items-center justify-evenly">
					<button
						type="button"
						onClick={() => setActive("Home")}
						className="p-2.5 flex flex-col items-center">
						<HomeIcon
							className="text-white bg-orange-500 hover:bg-orange-200 hover:text-orange-800 duration-300 p-2 rounded-full"
							fontSize="large"
						/>
						<p className={`text-xs ${active === "Home" ? "underline text-orange-600 font-bold" : ""}`}>Home</p>
					</button>

					<button
						type="button"
						onClick={() => setActive("Recipes")}
						className="p-2.5 flex flex-col items-center">
						<DescriptionIcon
							className="text-white bg-orange-500 hover:bg-orange-200 hover:text-orange-800 duration-300 p-2 rounded-full"
							fontSize="large"
						/>
						<p className={`text-xs ${active === "Recipes" ? "underline text-orange-600" : ""}`}>Recipes</p>
					</button>

					<button
						type="button"
						onClick={() => setActive("Profile")}
						className="p-2.5 flex flex-col items-center">
						<Person2Icon
							className="text-white bg-orange-500 hover:bg-orange-200 hover:text-orange-800 duration-300 p-2 rounded-full"
							fontSize="large"
						/>
						<p className={`text-xs ${active === "Profile" ? "underline text-orange-600" : ""}`}>Profile</p>
					</button>
				</div>
			</div>
		</>
	);
}

export default NavBar;
