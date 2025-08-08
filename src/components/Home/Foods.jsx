import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";

function Foods({ foods }) {
  return (
    <>
      {foods.length === 0 ? (
        <div className="text-gray-500 text-sm mt-4">
          No matching food found.
        </div>
      ) : (
        foods.map((food) => (
          <Link
            to={`/recipe/${food.id}`}
            key={food.id}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-4 pt-40 w-[250px] h-[250px] mx-auto mt-4"
          >
            <img
              src={food.image}
              alt={food.name}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t custom-food-from-gray-950 custom-food-via-gray-950-20"></div>

            <h3 className="z-10 mt-3 text-xl font-bold custom-food-text-white">
              {food.name}
            </h3>

            <p className="z-10 custom-food-text-white text-xs mr-4 flex flex-row items-center">
              {food.title}
            </p>

            <div className="z-10 flex flex-row mt-3 text-xs leading-6 custom-food-text-gray-300">
              <span className="flex flex-row items-center">
                <GroupIcon fontSize="small" className="mr-2" />
                Good for {food.serve} Persons
              </span>
            </div>
          </Link>
        ))
      )}
    </>
  );
}

export default Foods;
