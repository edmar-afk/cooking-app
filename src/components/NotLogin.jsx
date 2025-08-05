import { Link } from "react-router-dom";import cookImg from "../assets/images/404.png";

function NotLogin() {
	return (
		<div className="flex flex-col justify-center items-center h-screen text-center">
			<img
				src={cookImg}
				alt="Not Found"
				className="animate-bounce"
			/>
			<p className="text-gray-600 font-semibold px-12">You must be logged in to gain access to Profile page.</p>
			<Link
				to={"/login"}
				className="text-white mt-4 bg-blue-500 py-1 px-4 rounded-full">
				Login Here
			</Link>
		</div>
	);
}

export default NotLogin;
