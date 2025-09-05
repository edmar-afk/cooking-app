import React, { useEffect, useState } from "react";
import api from "../../assets/api";

function Body({ foodId }) {
  const [foodItem, setFoodItem] = useState(null);

  useEffect(() => {
    if (foodId) {
      api
        .get(`/api/food/${foodId}/`)
        .then((res) => setFoodItem(res.data))
        .catch((err) => console.error(err));
    }
  }, [foodId]);

  if (!foodItem) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center">
      <img
        src={foodItem.image}
        alt={foodItem.name}
        className="w-full h-96 object-cover -mt-20 -z-50"
      />
      <div className="bg-white w-full p-4 -mt-24 rounded-t-2xl">
        <h1 className="text-xl font-bold mt-4">{foodItem.name}</h1>
        <p className="text-gray-600">{foodItem.description}</p>
      </div>
    </div>
  );
}

export default Body;
