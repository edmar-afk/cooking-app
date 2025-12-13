import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../assets/api";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import AddRecipe from "../Home/AddRecipe";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

function Recipes({ foodId }) {
  const [recipe, setRecipe] = useState(null);

  const navigate = useNavigate();
  const utteranceRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (foodId) {
      api
        .get(`/api/recipes/${foodId}/`)
        .then((res) => {
          if (res.data.length > 0) {
            setRecipe(res.data[0]);
          } else {
            setRecipe({ recipes: "", instruction: "" });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [foodId]);

  const fetchRecipe = () => {
    api
      .get(`/api/recipes/${foodId}/`)
      .then((res) => {
        if (res.data.length > 0) {
          setRecipe(res.data[0]);
        } else {
          setRecipe({ recipes: "", instruction: "" });
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (foodId) {
      fetchRecipe();
    }
  }, [foodId]);

  const getFullText = () => {
    const recipeText = recipe?.recipes || "";
    const instructionText = recipe?.instruction || "";

    return (
      "Recipes: \n" +
      recipeText.replace(/<[^>]+>/g, "") +
      "\n\nInstructions:\n" +
      instructionText.replace(/<[^>]+>/g, "")
    );
  };

  const startTTS = () => {
    const fullText = getFullText();
    if (!fullText.trim()) return;

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "TTS_PLAY",
        text: fullText,
      })
    );

    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseTTS = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "TTS_PAUSE" })
    );
    setIsPaused(true);
    setIsPlaying(false);
  };

  const resumeTTS = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "TTS_RESUME" })
    );
    setIsPaused(false);
    setIsPlaying(true);
  };

  const stopTTS = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "TTS_STOP" }));
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 pb-32 space-y-4 bg-white">
      <div className="flex flex-row items-center gap-3">
        {!isPlaying && (
          <button
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              isPlaying ? "bg-blue-500 text-white" : "bg-green-500 text-white"
            }`}
            onClick={() => {
              if (isPlaying) {
                pauseTTS();
              } else {
                if (isPaused) {
                  resumeTTS();
                } else {
                  startTTS();
                }
              }
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            {isPaused && !isPlaying ? "Resume" : "Play"}
          </button>
        )}

        {isPlaying && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
            onClick={pauseTTS}
          >
            <PauseIcon /> Pause
          </button>
        )}

        <button
          className="px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2"
          onClick={stopTTS}
        >
          <StopIcon /> Stop
        </button>
      </div>

      {recipe.recipes && recipe.recipes.trim() !== "" ? (
        <div className="flex flex-col">
          <p className="font-bold">Mga Sangkap:</p>
          <div
            className="space-y-1 mt-4"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: recipe.recipes }}
          />

          <p className="mt-8 font-bold">Paraan ng Pagluluto:</p>
          <div
            className="space-y-1 mt-4"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: recipe.instruction }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-6 text-gray-500">
          <SentimentVeryDissatisfiedIcon className="text-6xl mb-2" />
          <p className="text-lg font-semibold">No recipes displayed.</p>
          <p className="text-sm">Upload recipes for this food.</p>
          {/* <AddRecipe foodItemId={foodId} onSuccess={fetchRecipe} /> */}
        </div>
      )}
    </div>
  );
}

export default Recipes;
