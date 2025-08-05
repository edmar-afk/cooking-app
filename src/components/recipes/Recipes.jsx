import React, { useEffect, useState } from "react";import api from "../../assets/api";

function Recipes({ foodId }) {
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		// Load ResponsiveVoice script once
		const script = document.createElement("script");
		script.src = "https://code.responsivevoice.org/responsivevoice.js?key=Of5LDZy2";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		if (foodId) {
			api
				.get(`/api/recipes/${foodId}/`)
				.then((res) => {
					console.log("Fetched recipe:", res.data);
					setRecipe(res.data[0]);
				})
				.catch((err) => console.error(err));
		}
	}, [foodId]);

	const speakText = (text) => {
		if (window.responsiveVoice) {
			window.responsiveVoice.cancel(); // stop any ongoing speech
			window.responsiveVoice.speak(text, "Filipino Female");
		}
	};

	if (!recipe) return <p className="p-4">Loading...</p>;

	const ingredients = recipe.recipes
		.split(/\r?\n/)
		.filter((line) => line.trim() !== "")
		.join(". ");

	return (
		<div className="p-4 mt-8 pb-32">
			<p className="font-bold mb-2 flex items-center gap-2">
				Ingredients
				<button
					onClick={() => speakText(ingredients)}
					className="text-blue-600 text-sm underline">
					🔊 Play
				</button>
			</p>
			<div className="space-y-1">
				{recipe.recipes
					.split(/\r?\n/)
					.filter((line) => line.trim() !== "")
					.map((line, index) => (
						<p key={index}>{line}</p>
					))}
			</div>

			<p className="font-bold mt-4 mb-2 flex items-center gap-2">
				Instructions
				<button
					onClick={() => speakText(recipe.instruction)}
					className="text-blue-600 text-sm underline">
					🔊 Play
				</button>
			</p>
			<div className="whitespace-pre-line">{recipe.instruction}</div>
		</div>
	);
}

export default Recipes;
