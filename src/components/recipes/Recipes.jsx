import React, { useEffect, useState } from "react";
import api from "../../assets/api";

function Recipes({ foodId }) {
  const [recipe, setRecipe] = useState(null);

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
      window.responsiveVoice.speak(text, "Filipino Female");
    }
  };

  useEffect(() => {
    if (!recipe) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in your phone.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

      console.log("You said:", transcript); // ✅ Show what you spoke

      if (transcript.includes("start")) {
        const ingredients = recipe.recipes
          .split(/\r?\n/)
          .filter((line) => line.trim() !== "")
          .join(". ");
        const fullText = `Ingredients: ${ingredients}. Instructions: ${recipe.instruction}`;
        speakText(fullText);
      }
      if (transcript.includes("stop")) {
        if (window.responsiveVoice) window.responsiveVoice.cancel();
      }
      if (transcript.includes("pause")) {
        if (window.responsiveVoice) window.responsiveVoice.pause();
      }
      if (transcript.includes("resume")) {
        if (window.responsiveVoice) window.responsiveVoice.resume();
      }
    };

    recognition.start();
    return () => recognition.stop();
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
