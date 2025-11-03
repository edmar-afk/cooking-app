import chefImg from "../../assets/images/chef.png";
import { getUserInfoFromToken } from "../../utils/auth";

function Header() {
	const token = JSON.parse(localStorage.getItem("userData"))?.access;
	const user = getUserInfoFromToken(token);

	return (
		<div className="header-container">
			<div className="header-text w-72">
				<p>Hello, {user?.last_name || "Guest"}</p>
				<p className="text-2xl font-bold">
					What are you cooking Today? (Updated)
				</p>
			</div>
			<div className="chef-box">
				<img
					src={chefImg}
					alt="Chef"
					className="chef-img"
				/>
			</div>
		</div>
	);
}

export default Header;
