import { useRef, useEffect } from "react";

export function useVoiceRecognition({ onResult, lang = "en-US" }) {
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  const startRecognition = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (isIOS) {
      alert("iOS browsers do not support speech recognition. Please use Chrome on Android.");
      return;
    }

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try using Chrome on Android.");
      return;
    }

    if (isListeningRef.current) return;

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          transcript += result[0].transcript;
        }
      }

      if (transcript) {
        onResult(transcript.trim().toLowerCase());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        recognition.start(); // Restart automatically
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    isListeningRef.current = true;
  };

  const stopRecognition = () => {
    isListeningRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopRecognition();
    };
  }, []);

  return { startRecognition, stopRecognition };
}
