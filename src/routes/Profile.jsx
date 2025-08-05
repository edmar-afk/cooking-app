import React, { useEffect, useState } from "react";import NavBar from "../components/NavBar";import api from "../assets/api";
import { getUserInfoFromToken } from "../utils/auth";
import { Link } from "react-router-dom";
import NotLogin from "../components/NotLogin";

const BASE_URL = import.meta.env.VITE_API_URL;

function Profile() {
	const [profile, setProfile] = useState(null);
	const token = JSON.parse(localStorage.getItem("userData"))?.access;
	const userInfo = getUserInfoFromToken(token);

	useEffect(() => {
		if (userInfo?.user_id) {
			api
				.get(`/api/profile/${userInfo.user_id}/`)
				.then((res) => setProfile(res.data))
				.catch((err) => console.error("Error fetching profile:", err));
		}
	}, []);

	if (!token || !userInfo?.user_id) {
		return (
			<>
				<NotLogin />
				<NavBar />
			</>
		);
	}

	return (
		<>
			<div className="relative group p-4 overflow-y-scroll h-screen pb-32">
				<div className="absolute -inset-1 bg-gradient-to-t from-orange-500 to-orange-900 h-screen blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

				<div className="relative px-7 py-6 flex flex-col items-center max-w-sm">
					<div className="absolute top-4 right-4 flex items-center">
						<div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
						<span className="text-green-400 text-xs ml-1.5">ONLINE</span>
					</div>

					<div className="relative group">
						<div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-900 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
						<div className="relative">
							<img
								src={
									profile?.profile_picture
										? `${BASE_URL}${profile.profile_picture}`
										: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..."
								}
								className="w-32 h-32 rounded-full object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
								alt="Profile"
							/>
						</div>
					</div>

					<div className="mt-6 text-center">
						<h2 className="text-2xl font-bold text-white">{profile?.username || "Loading..."}</h2>
						<p className="text-orange-100 font-medium mt-1">Member</p>
						<p className="text-gray-300 mt-2 text-sm">{profile?.bio}</p>
					</div>

					<button className="relative mt-8 w-full group/btn">
						<div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-900 rounded-lg blur opacity-75 group-hover/btn:opacity-100 transition duration-1000 group-hover:duration-200"></div>
						<div className="relative px-6 py-3 bg-red-700/90 rounded-lg leading-none flex items-center justify-center">
							<Link
								to={"/logout"}
								className="text-gray-200 group-hover/btn:text-white transition duration-200">
								Logout
							</Link>
						</div>
					</button>
				</div>
			</div>

			<NavBar />
		</>
	);
}

export default Profile;
