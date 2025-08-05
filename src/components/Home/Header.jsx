import chefImg from "../../assets/images/chef.png";
import { getUserInfoFromToken } from "../../utils/auth";

function Header() {
	const token = JSON.parse(localStorage.getItem("userData"))?.access;
	const user = getUserInfoFromToken(token);

	return (
		<div className="flex flex-row justify-between items-center mb-4">
			<div className="flex flex-col">
				<p>Welcome to Cooking App,</p>
				<p className="font-bold">
					{user?.last_name || "Guest"}
				</p>
			</div>
			<div className="border-1 p-1 rounded-lg bg-orange-100">
				<img
					src={chefImg}
					alt="Chef"
					className="w-10 h-10"
				/>
			</div>
		</div>
	);
}

export default Header;
