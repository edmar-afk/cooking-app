import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SearchIcon from "@mui/icons-material/Search";

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
		<form className="flex items-center max-w-sm mx-auto">
			<label
				htmlFor="simple-search"
				className="sr-only">
				Search
			</label>
			<div className="relative w-full">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<SearchIcon fontSize="small" className="text-gray-500"/>
				</div>
				<input
					ref={inputRef}
					type="text"
					id="simple-search"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
					placeholder="Say or type something..."
					required
				/>
			</div>
			<button
				type="button"
				onClick={handleSpeech}
				className="p-2.5 ms-2 text-sm font-medium text-white bg-orange-500 rounded-lg border border-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300">
				<MicNoneIcon fontSize="small" />
				<span className="sr-only">Start voice input</span>
			</button>
		</form>
	);
}

export default Search;
