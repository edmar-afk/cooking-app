import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../assets/api";
import { useVoiceRecognition } from "../useVoiceRecognition";

function RecipesPlay({ foodId }) {
  const [recipe, setRecipe] = useState(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audio1Instance = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (foodId) {
      api
        .get(`/api/recipes/${foodId}/`)
        .then((res) => setRecipe(res.data[0]))
        .catch((err) => console.error(err));
    }
  }, [foodId]);

  const handleVoiceCommand = (transcript) => {
    const cmd = transcript.toLowerCase();
    setTranscriptText(cmd);

    if (cmd === "stop") {
      if (audio1Instance.current) {
        audio1Instance.current.pause();
        audio1Instance.current.currentTime = 0;
      }
      navigate(`/recipe/${foodId}/stop`);
    }

    if (cmd === "pause" || cmd === "pause audio one") audio1Instance.current?.pause();
    if (cmd === "start" || cmd === "play audio one") audio1Instance.current?.play();
  };

  useEffect(() => {
    if (transcriptText === "play") {
      navigate(`/recipe/${foodId}/play`);
    }
  }, [transcriptText, navigate, foodId]);

  const { startRecognition } = useVoiceRecognition({
    onResult: handleVoiceCommand,
    lang: "en-US",
  });

  // Auto-play audio once recipe is loaded
  useEffect(() => {
    if (recipe && recipe.audio1 && !audioUnlocked) {
      audio1Instance.current = new Audio(recipe.audio1);

      audio1Instance.current
        .play()
        .then(() => setAudioUnlocked(true))
        .catch(() => console.log("Autoplay blocked, user must interact first"));

      startRecognition();
    }
  }, [recipe, audioUnlocked, startRecognition]);

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 mt-8 pb-32 space-y-4">
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
    </div>
  );
}

export default RecipesPlay;
