import React, { useRef } from "react";import { useNavigate } from "react-router-dom";

function Search() {
	const inputRef = useRef(null);
	const navigate = useNavigate();

	const handleSpeech = () => {
		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (isIOS) {
			alert("iOS browsers do not support speech recognition. Please use Chrome on Android.");
			return;
		}

		if (!SpeechRecognition) {
			alert("Speech recognition is not supported in this browser. Try using Chrome on Android.");
			return;
		}

		try {
			const recognition = new SpeechRecognition();
			recognition.lang = "en-US";
			recognition.interimResults = false;
			recognition.maxAlternatives = 1;

			recognition.onstart = () => {
				console.log("Voice recognition started. Speak now.");
			};

			recognition.onresult = (event) => {
				const transcript = event.results[0][0].transcript.toLowerCase();
				console.log("Recognized:", transcript);

				if (inputRef.current) inputRef.current.value = transcript;

				if (transcript.includes("profile")) {
					navigate("/profile");
				}
			};

			recognition.onerror = (event) => {
				console.error("Speech recognition error:", event.error);
				alert("Speech recognition error: " + event.error);
			};

			recognition.start();
		} catch (err) {
			console.error("Recognition failed to start:", err);
			alert("Failed to start recognition: " + err.message);
		}
	};

	return (
		<div className="flex items-center flex-col gap-4 justify-center h-screen bg-gray-300">
			<h1 className="font-semibold">Tap Mic and Speak (Updated for Mobile Support)</h1>

			<div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md w-72">
				<input
					ref={inputRef}
					type="text"
					placeholder="Say something..."
					className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
				/>
				<button
					type="button"
					onClick={handleSpeech}
					className="text-white bg-blue-500 hover:bg-blue-600 transition px-3 py-2 rounded-full">
					🎤
				</button>
			</div>
		</div>
	);
}

export default Search;
