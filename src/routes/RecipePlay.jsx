import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../assets/api";
import Header from "../components/recipes/Header";
import Body from "../components/recipes/Body";
import NavBar from "../components/NavBar";
import { useVoiceRecognition } from "../components/useVoiceRecognition";

function RecipePlay() {
  const { foodId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const { startRecognition, stopRecognition } = useVoiceRecognition({
    onResult: (transcript) => {
      if (transcript.includes("stop")) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        stopRecognition();
        navigate(`/recipe/${foodId}/stop`);
      }
    },
    lang: "en-US", // change to "tl-PH" for Tagalog
  });

  useEffect(() => {
    if (foodId) {
      api
        .get(`/api/recipes/${foodId}/`)
        .then((res) => setRecipe(res.data[0]))
        .catch((err) => console.error(err));
    }
  }, [foodId]);

  useEffect(() => {
    startRecognition();
  }, [startRecognition]);

  useEffect(() => {
    if (recipe?.audio1) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(recipe.audio1);
      audioRef.current = audio;
      audio.play().catch((err) => console.warn("Autoplay failed:", err));

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [recipe]);

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <>
      <Header foodId={foodId} />
      <Body foodId={foodId} />
      <div className="p-4 mt-8 pb-32 space-y-4">
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
      <NavBar />
    </>
  );
}

export default RecipePlay;
