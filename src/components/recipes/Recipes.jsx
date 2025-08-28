import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import { useVoiceRecognition } from "../useVoiceRecognition";

function Recipes({ foodId }) {
  const [recipe, setRecipe] = useState(null);
  const [transcriptText, setTranscriptText] = useState(""); // New state for user speech

  useEffect(() => {
    if (foodId) {
      api
        .get(`/api/recipes/${foodId}/`)
        .then((res) => setRecipe(res.data[0]))
        .catch((err) => console.error(err));
    }
  }, [foodId]);

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";

      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(
        (voice) => voice.name.includes("Microsoft") || voice.lang === "en-US"
      );

      if (selectedVoice) utterance.voice = selectedVoice;

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 200);
    }
  };

  const handleVoiceCommand = (transcript) => {
    setTranscriptText(transcript); // Update the transcript state
    console.log("🎤 You said:", transcript);

    if (!recipe) return;

    if (transcript === "start") {
      const ingredients = recipe.recipes
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "")
        .join(". ");
      const fullText = `Ingredients: ${ingredients}. Instructions: ${recipe.instruction}`;
      speakText(fullText);
    }

    if (transcript === "stop") window.speechSynthesis.cancel();
    if (transcript === "pause") window.speechSynthesis.pause();
    if (transcript === "resume") window.speechSynthesis.resume();
  };

  const { startRecognition, stopRecognition } = useVoiceRecognition({
    onResult: handleVoiceCommand,
    lang: "en-US",
  });

  useEffect(() => {
    if (recipe) startRecognition();
    return () => stopRecognition();
  }, [recipe]);

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

      <p className="mt-2 text-gray-700">You said: {transcriptText}</p> {/* Display transcript */}

      <div>
        <p className="font-bold mb-2 flex items-center gap-2">Ingredients</p>
        <div className="space-y-1">
          {recipe.recipes
            .split(/\r?\n/)
            .filter((line) => line.trim() !== "")
            .map((line, index) => (
              <p key={index}>{line}</p>
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
