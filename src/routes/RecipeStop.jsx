import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../assets/api";
import Header from "../components/recipes/Header";
import Body from "../components/recipes/Body";
import NavBar from "../components/NavBar";
import { useVoiceRecognition } from "../components/useVoiceRecognition";

function RecipeStop() {
  const { foodId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  const { startRecognition, stopRecognition } = useVoiceRecognition({
    onResult: (transcript) => {
      if (transcript.includes("play")) {
        stopRecognition();
        navigate(`/recipe/${foodId}/play`);
      }
    },
    lang: "en-US", // you can change to "tl-PH" for Tagalog
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

export default RecipeStop;
