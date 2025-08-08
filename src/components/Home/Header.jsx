import chefImg from "../../assets/images/chef.png";
import { getUserInfoFromToken } from "../../utils/auth";

function Header() {
	const token = JSON.parse(localStorage.getItem("userData"))?.access;
	const user = getUserInfoFromToken(token);

	return (
		<div className="header-container">
			<div className="header-text">
				<p>Welcome to Cooking App,</p>
				<p className="name">
					{user?.last_name || "Guest"}
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
