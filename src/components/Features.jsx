import React from "react";import voiceImg from "../assets/images/voice.png";
import micImg from "../assets/images/microphone.png";

function Features() {
	return (
		<div className="w-full pt-12">
			<div className="flex flex-row justify-center items-center">
				<div className="text-center mx-3">
					<div className="mx-auto flex mb-5 transform items-center justify-center">
						<img
							src={voiceImg}
							alt=""
							className="w-8 h-8"
						/>
					</div>
					<h1 className="text-darken mb-3 text-sm">Voice Recognition</h1>
					
				</div>
				<div className="text-center mx-3">
					<div className="mx-auto flex mb-5 transform items-center justify-center">
						<img
							src={micImg}
							alt=""
							className="w-8 h-8"
						/>
					</div>
					<h1 className="text-darken mb-3 text-sm">Microphone Access</h1>
					
				</div>
			</div>
		</div>
	);
}

export default Features;
