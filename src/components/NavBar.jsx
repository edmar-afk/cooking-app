import { NavLink } from "react-router-dom";import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import FavoriteIcon from "@mui/icons-material/Favorite";
function NavBar() {
	return (
		<div className="fixed bottom-0 left-0 z-50 w-full h-fit px-2 bg-white border-t border-gray-200">
			<div className="flex items-center justify-evenly">
				<NavLink
					to="/home"
					end
					className={({ isActive }) => `p-2.5 flex flex-col items-center ${isActive ? "text-orange-600" : ""}`}>
					<HomeIcon style={{ color: '#000' }}
						className=" bg-orange-500 hover:bg-orange-200 hover:text-orange-800 duration-300 p-2 rounded-full"
						fontSize="large"
					/>
					<p className={`text-xs ${location.pathname === "/" ? "underline font-bold" : ""}`}>Home</p>
				</NavLink>

				<NavLink
					to="/favorites"
					className={({ isActive }) => `p-2.5 flex flex-col items-center ${isActive ? "text-orange-600" : ""}`}>
					<FavoriteIcon
						className="text-white bg-orange-500 hover:bg-orange-200 hover:text-orange-800 duration-300 p-2 rounded-full"
						fontSize="large"
					/>
					<p className={`text-xs ${location.pathname === "/favorites" ? "underline font-bold" : ""}`}>Favorites</p>
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
