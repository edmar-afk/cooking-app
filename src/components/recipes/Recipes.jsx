/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import { useVoiceRecognition } from "../useVoiceRecognition";

function Recipes({ foodId }) {
  const [recipe, setRecipe] = useState(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [voiceLoaded, setVoiceLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://code.responsivevoice.org/responsivevoice.js?key=Of5LDZy2";
    script.async = true;
    script.onload = () => setVoiceLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (foodId) {
      api
        .get(`/api/recipes/${foodId}/`)
        .then((res) => setRecipe(res.data[0]))
        .catch((err) => console.error(err));
    }
  }, [foodId]);

  const speakText = (text) => {
    if (voiceLoaded && window.responsiveVoice) {
      responsiveVoice.cancel();
      responsiveVoice.speak(text, "Filipino Female");
    } else {
      console.warn("ResponsiveVoice not loaded yet");
    }
  }; 

  const handleVoiceCommand = (transcript) => {
    setTranscriptText(transcript);
    if (!recipe) return;

    if (transcript.toLowerCase() === "start") {
      const ingredients = recipe.recipes
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "")
        .join(". ");
      const fullText = `Ingredients: ${ingredients}. Instructions: ${recipe.instruction}`;
      speakText(fullText);
    }

    if (transcript.toLowerCase() === "stop") responsiveVoice?.cancel();
    if (transcript.toLowerCase() === "pause") responsiveVoice?.pause();
    if (transcript.toLowerCase() === "resume") responsiveVoice?.resume();
  };

  const { startRecognition, stopRecognition } = useVoiceRecognition({
    onResult: handleVoiceCommand,
    lang: "en-US",
  });

  useEffect(() => {
    if (recipe) startRecognition();
    return () => stopRecognition();
  }, [recipe, startRecognition, stopRecognition]);

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 mt-8 pb-32 space-y-4">
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={startRecognition}
        >
          🎤 Start Listening
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={stopRecognition}
        >
          🛑 Stop
        </button>
      </div>

      <p className="mt-2 text-gray-700">You said: {transcriptText}</p>

      <div>
        <p className="font-bold mb-2 flex items-center gap-2">Ingredients</p>
        <div className="space-y-1">
          {recipe.recipes
            .split(/\r?\n/)
            .filter((line) => line.trim() !== "")
            .map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
        </div>
      </div>

      <div>
        <p className="font-bold mt-4 mb-2 flex items-center gap-2">
          Instructions
        </p>
        <div className="whitespace-pre-line">{recipe.instruction}</div>
      </div>
    </div>
  );
}

export default Recipes;
