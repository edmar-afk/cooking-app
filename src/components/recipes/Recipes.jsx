import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import { useVoiceRecognition } from "../useVoiceRecognition";

function Recipes({ foodId }) {
  const [recipe, setRecipe] = useState(null);

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

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 200);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
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
      window.speechSynthesis.cancel();
    }

    if (transcript.includes("pause")) {
      console.log("⏸️ Command: PAUSE");
      window.speechSynthesis.pause();
    }

    if (transcript.includes("resume")) {
      console.log("▶️ Command: RESUME");
      window.speechSynthesis.resume();
    }
  };

  const { startRecognition, stopRecognition } = useVoiceRecognition({
    onResult: handleVoiceCommand,
    lang: "en-US",
  });

  useEffect(() => {
    if (recipe) {
      startRecognition();
    }
    return () => stopRecognition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 mt-8 pb-32">
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
