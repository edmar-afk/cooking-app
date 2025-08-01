import React from "react";import BlenderIcon from "@mui/icons-material/Blender";
import GroupIcon from "@mui/icons-material/Group";
function Foods() {
	return (
		<>
			<article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-4 pt-40 w-[250px] h-[250px] mx-auto mt-4">
				<img
					src="https://sallysbakingaddiction.com/wp-content/uploads/2025/03/pancakes.jpg"
					alt="University of Southern California"
					className="absolute inset-0 h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20"></div>
				<h3 className="z-10 mt-3 text-xl font-bold text-white">Pancake</h3>
				<div className="z-10 flex flex-row gap-y-1 overflow-hidden text-xs leading-6 text-gray-300 mt-">
					<span className="mr-4 flex flex-row items-center">
						<BlenderIcon fontSize="small" />
						20 Ingredients
					</span>
					<span className="flex flex-row items-center">
						<GroupIcon fontSize="small" />
						10 Serves
					</span>
				</div>
			</article>
		</>
	);
}

export default Foods;
