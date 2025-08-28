import React, { useEffect, useState, useRef } from "react";
import api from "../../assets/api";
import { useVoiceRecognition } from "../useVoiceRecognition";

function Recipes({ foodId }) {
  const [recipe, setRecipe] = useState(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audio1Instance = useRef(null);
  const audio2Instance = useRef(null);

  useEffect(() => {
    if (foodId) {
      api
        .get(`/api/recipes/${foodId}/`)
        .then((res) => setRecipe(res.data[0]))
        .catch((err) => console.error(err));
    }
  }, [foodId]);

  const handleVoiceCommand = (transcript) => {
    setTranscriptText(transcript);
    if (!recipe || !audioUnlocked) return;

    const cmd = transcript.toLowerCase();

    if (cmd === "pause" || cmd === "pause audio one") {
      audio1Instance.current?.pause();
    }

    if (cmd === "start" || cmd === "play audio one") {
      audio1Instance.current?.play().catch(() => {
        console.log("Playback failed. Make sure you clicked unlock first.");
      });
    }

    if (cmd === "stop audio one") {
      if (audio1Instance.current) {
        audio1Instance.current.pause();
        audio1Instance.current.currentTime = 0;
      }
    }

    if (cmd === "play audio two") audio2Instance.current?.play();
    if (cmd === "pause audio two") audio2Instance.current?.pause();
    if (cmd === "stop audio two") {
      if (audio2Instance.current) {
        audio2Instance.current.pause();
        audio2Instance.current.currentTime = 0;
      }
    }
  };

  const { startRecognition, stopRecognition } = useVoiceRecognition({
    onResult: handleVoiceCommand,
    lang: "en-US",
  });

  const unlockAudioAndStart = () => {
    if (recipe?.audio1) {
      audio1Instance.current = new Audio(recipe.audio1);
      audio1Instance.current.load();
      audio1Instance.current
        .play()
        .catch(() => console.log("Playback failed on unlock"));
    }
    if (recipe?.audio2) {
      audio2Instance.current = new Audio(recipe.audio2);
      audio2Instance.current.load();
    }
    setAudioUnlocked(true);
    startRecognition();
  };

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 mt-8 pb-32 space-y-4">
      <div className="space-x-2">
        {!audioUnlocked ? (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={unlockAudioAndStart}
          >
            🎤 Start Listening & Unlock Audio
          </button>
        ) : (
          <>
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
          </>
        )}
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
