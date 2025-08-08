import React from "react";
import sugarImg from "../../assets/images/sugar.png";
import bowlImg from "../../assets/images/bowl.png";
import cookingImg from "../../assets/images/cooking.png";
import vegetarianImg from "../../assets/images/vegetarian.png";
import labelImg from "../../assets/images/nutrition-facts-label.png";
import stirImg from "../../assets/images/stir-fry.png";
import houseImg from "../../assets/images/house.png";
import portionImg from "../../assets/images/portion.png";
import hydratedImg from "../../assets/images/stay-hydrated.png";
const tips = [
  {
    title: "Use Healthy Fats Wisely",
    description:
      "Choose heart-healthy oils like olive, avocado, or canola oil instead of butter or lard.",
  },
  { image: sugarImg, title: "Limit Added Sugar and Salt" },
  { image: houseImg, title: "Cook More at Home" },
  { image: bowlImg, title: "Opt for Whole Grains" },
  { image: cookingImg, title: "Steam, Bake, Grill, or Sauté" },
  { image: stirImg, title: "Bulk Up with Vegetables" },
  { image: portionImg, title: "Watch Portion Sizes" },
  { image: labelImg, title: "Read Labels" },
  { image: hydratedImg, title: "Stay Hydrated While Cooking" },
  { image: vegetarianImg, title: "Practice Mindful Eating" },
];

function Tips() {
  return (
    <>
      <div className="mt-8">
        <h1 className="font-bold">Healthy Tips</h1>

        <div className="flex flex-row mt-4 gap-4">
          <p className="mt-2">
            Healthy eating isn’t about depriving yourself of foods you love
          </p>
          <div className="p-5 rounded-md relative overflow-hidden custom-bg-orange custom-text-white">
            <svg
              className="absolute bottom-0 left-0 mb-8"
              viewBox="0 0 375 283"
              fill="none"
              style={{ transform: "scale(1.5)", opacity: 0.1 }}
            >
              <rect
                x="159.52"
                y="175"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 159.52 175)"
                fill="white"
              />
              <rect
                y="107.48"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 0 107.48)"
                fill="white"
              />
            </svg>
            <p className="font-extrabold">{tips[0].title}</p>
            <p className="text-xs mt-2">{tips[0].description}</p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap mt-12 justify-evenly">
          {tips.slice(1).map((tip, index) => (
            <div
              key={index}
              className="flex flex-col w-[100px] items-center mb-8"
            >
              <img src={tip.image} className="w-12" alt="" />
              <p className="text-center font-semibold text-xs mt-2">
                {tip.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tips;
