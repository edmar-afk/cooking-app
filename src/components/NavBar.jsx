import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import Person2Icon from "@mui/icons-material/Person2";

function NavBar() {
	return (
		<div className="fixed bottom-0 left-0 z-50 w-full h-fit px-2 bg-white border-t border-gray-200">
			<div className="flex items-center justify-evenly">
				<NavLink
					to="/"
					end
					className={({ isActive }) => `p-2.5 flex flex-col items-center ${isActive ? "text-orange-600" : ""}`}>
					<HomeIcon
						className="text-white bg-orange-500 hover:bg-orange-200 hover:text-orange-800 duration-300 p-2 rounded-full"
						fontSize="large"
					/>
					<p className={`text-xs ${location.pathname === "/" ? "underline font-bold" : ""}`}>Home</p>
				</NavLink>

				<NavLink
					to="/recipes"
					className={({ isActive }) => `p-2.5 flex flex-col items-center ${isActive ? "text-orange-600" : ""}`}>
					<DescriptionIcon
						className="text-white bg-orange-500 hover:bg-orange-200 hover:text-orange-800 duration-300 p-2 rounded-full"
						fontSize="large"
					/>
					<p className={`text-xs ${location.pathname === "/recipes" ? "underline font-bold" : ""}`}>Recipes</p>
				</NavLink>

				<NavLink
					to="/profile"
					className={({ isActive }) => `p-2.5 flex flex-col items-center ${isActive ? "text-orange-600" : ""}`}>
					<Person2Icon
						className="text-white bg-orange-500 hover:bg-orange-200 hover:text-orange-800 duration-300 p-2 rounded-full"
						fontSize="large"
					/>
					<p className={`text-xs ${location.pathname === "/profile" ? "underline font-bold" : ""}`}>Profile</p>
				</NavLink>
			</div>
		</div>
	);
}

export default NavBar;
