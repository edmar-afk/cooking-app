import React from "react";
import NavBar from "../components/NavBar";

function Profile() {
	return (
		<>
			<div class="relative group">
				<div class="absolute -inset-1 bg-gradient-to-t from-orange-500 to-orange-900 h-screen blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

				<div class="relative px-7 py-6 flex flex-col items-center max-w-sm">
					<div class="absolute top-4 right-4 flex items-center">
						<div class="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
						<span class="text-green-400 text-xs ml-1.5">ONLINE</span>
					</div>

					<div class="relative group">
						<div class="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-900 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
						<div class="relative">
							<img
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								class="w-32 h-32 rounded-full object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
								alt="Profile"
							/>
						</div>
					</div>

					<div class="mt-6 text-center">
						<h2 class="text-2xl font-bold text-white">John Doe</h2>
						<p class="text-orange-100 font-medium mt-1">Creative Technologist</p>
						<p class="text-gray-300 mt-2 text-sm">
							Crafting digital experiences at the intersection of design and code
						</p>
					</div>

					<button class="relative mt-8 w-full group/btn">
						<div class="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-900 rounded-lg blur opacity-75 group-hover/btn:opacity-100 transition duration-1000 group-hover:duration-200"></div>
						<div class="relative px-6 py-3 bg-red-700/90 rounded-lg leading-none flex items-center justify-center">
							<span class="text-gray-200 group-hover/btn:text-white transition duration-200">Logout</span>
						</div>
					</button>
				</div>
			</div>

			<NavBar />
		</>
	);
}

export default Profile;
