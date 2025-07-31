import { useRef } from "react";
export function useVoiceRecognition({ onResult, lang = "en-US" }) {
	const recognitionRef = useRef(null);

	const startRecognition = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			alert("Hindi sinusuportahan ng browser mo ang speech recognition.");
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.lang = lang;
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript.toLowerCase();
			onResult(transcript);
		};

		recognition.onerror = (event) => {
			console.error("Speech recognition error:", event.error);
		};

		recognition.start();
		recognitionRef.current = recognition;
	};

	const stopRecognition = () => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
			recognitionRef.current = null;
		}
	};

	return { startRecognition, stopRecognition };
}
