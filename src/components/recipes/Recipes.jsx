import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import { useVoiceRecognition } from "../useVoiceRecognition";

function Recipes({ foodId }) {
  const [recipe, setRecipe] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://code.responsivevoice.org/responsivevoice.js?key=Of5LDZy2";
    script.async = true;
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
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
      setTimeout(() => {
        window.responsiveVoice.speak(text, "Filipino Female");
      }, 500);
    }
  };

  const handleVoiceCommand = (transcript) => {
    console.log("🎤 You said:", transcript);

    if (!recipe) return;

    if (transcript.includes("start")) {
      console.log("🟢 Command: START");
      const ingredients = recipe.recipes
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "")
        .join(". ");
      const fullText = `Ingredients: ${ingredients}. Instructions: ${recipe.instruction}`;
      speakText(fullText);
    }

    if (transcript.includes("stop")) {
      console.log("🔴 Command: STOP");
      if (window.responsiveVoice) window.responsiveVoice.cancel();
    }

    if (transcript.includes("pause")) {
      console.log("⏸️ Command: PAUSE");
      if (window.responsiveVoice) window.responsiveVoice.pause();
    }

    if (transcript.includes("resume")) {
      console.log("▶️ Command: RESUME");
      if (window.responsiveVoice) window.responsiveVoice.resume();
    }
  };

  const { startRecognition, stopRecognition } = useVoiceRecognition({
    onResult: handleVoiceCommand,
    lang: "en-US",
  });

  const handleTestVoice = () => {
    if (!isListening) {
      startRecognition();
      setIsListening(true);
    } else {
      stopRecognition();
      setIsListening(false);
    }
  };

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 mt-8 pb-32">
      <button
        onClick={handleTestVoice}
        className={`mb-4 px-4 py-2 rounded ${
          isListening
            ? "bg-red-500 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        {isListening ? "Stop Voice" : "Test Voice"}
      </button>

      <p className="font-bold mb-2 flex items-center gap-2">Ingredients</p>
      <div className="space-y-1">
        {recipe.recipes
          .split(/\r?\n/)
          .filter((line) => line.trim() !== "")
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))}
      </div>

      <p className="font-bold mt-4 mb-2 flex items-center gap-2">Instructions</p>
      <div className="whitespace-pre-line">{recipe.instruction}</div>
    </div>
  );
}

export default Recipes;
