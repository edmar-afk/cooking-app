import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import FavoriteIcon from "@mui/icons-material/Favorite";

function NavBar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-fit px-2 bg-white border-t border-gray-200">
      <div className="flex items-center justify-evenly">
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `p-2.5 flex flex-col items-center ${
              isActive ? "nav-text active" : "nav-text"
            }`
          }
        >
          <HomeIcon className="nav-icon" fontSize="large" />
          <p
            className={
              location.pathname === "/" ? "nav-text active" : "nav-text"
            }
          >
            Home
          </p>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `p-2.5 flex flex-col items-center ${
              isActive ? "nav-text active" : "nav-text"
            }`
          }
        >
          <FavoriteIcon className="nav-icon" fontSize="large" />
          <p
            className={
              location.pathname === "/favorites"
                ? "nav-text active"
                : "nav-text"
            }
          >
            Favorites
          </p>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `p-2.5 flex flex-col items-center ${
              isActive ? "nav-text active" : "nav-text"
            }`
          }
        >
          <Person2Icon className="nav-icon" fontSize="large" />
          <p
            className={
              location.pathname === "/profile" ? "nav-text active" : "nav-text"
            }
          >
            Profile
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
