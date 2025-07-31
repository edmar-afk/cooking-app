import { useRef } from "react";
export function useVoiceRecognition({ onResult, lang = "en-US" }) {
	const recognitionRef = useRef(null);

	const startRecognition = () => {
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
			alert("Speech recognition error: " + event.error);
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
