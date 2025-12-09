import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../assets/api";
import { useVoiceRecognition } from "../useVoiceRecognition";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function Recipes({ foodId }) {
  const [recipe, setRecipe] = useState(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const audio1Instance = useRef(null);
  const navigate = useNavigate();

  const { startRecognition, stopRecognition } = useVoiceRecognition({
    onResult: (text) => setTranscriptText(text),
    lang: "en-US",
  });

  useEffect(() => {
    if (foodId) {
      api
        .get(`/api/recipes/${foodId}/`)
        .then((res) => {
          if (res.data.length > 0) {
            setRecipe(res.data[0]);
          } else {
            setRecipe({ recipes: "" }); // placeholder for empty recipes
          }
        })
        .catch((err) => console.error(err));
    }
  }, [foodId]);

  useEffect(() => {
    if (transcriptText.toLowerCase().includes("stop")) {
      handleStop();
    }
  }, [transcriptText]);

  const handleStart = () => {
    if (recipe?.audio1) {
      audio1Instance.current = new Audio(recipe.audio1);
      audio1Instance.current
        .play()
        .catch(() => console.log("Audio playback failed"));
    }
    startRecognition();
    setIsRunning(true);
  };

  const handleStop = () => {
    if (audio1Instance.current) {
      audio1Instance.current.pause();
      audio1Instance.current.currentTime = 0;
    }
    stopRecognition();
    setIsRunning(false);
    navigate(`/recipe/${foodId}/stop`);
  };

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 pb-32 space-y-4 bg-white">
      {/* {isRunning ? (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleStop}
        >
          Stop
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleStart}
        >
          Start
        </button>
      )} */}

      {recipe.recipes && recipe.recipes.trim() !== "" ? (
        <div
          className="space-y-1 mt-4"
          style={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: recipe.recipes }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center mt-6 text-gray-500">
          <SentimentVeryDissatisfiedIcon className="text-6xl mb-2" />
          <p className="text-lg font-semibold">No recipes displayed.</p>
          <p className="text-sm">Upload recipes for this food.</p>
        </div>
      )}
    </div>
  );
}

export default Recipes;
