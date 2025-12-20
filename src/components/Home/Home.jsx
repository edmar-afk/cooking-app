import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Search from "../Search";
import Foods from "./Foods";
import Header from "./Header";
import Tips from "./Tips";
import api from "../../assets/api";
import CountertopsIcon from "@mui/icons-material/Countertops";
import AddRecipes from "./AddRecipes";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function Home() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Chicken",
    "Pork",
    "Beef",
    "Seafood",
    "Vegetable",
    "Noodles",
    "Snacks",
    "Fish",
    "Grilled and Roasted Dishes",
    "Roasted Dishes",
  ];

  const loadFoods = async () => {
    const fetchCategory = async (cat) => {
      const res = await api.get(`/api/foods/${cat.toLowerCase()}/`);
      return { category: cat, foods: res.data };
    };
    const results = await Promise.all(categories.map(fetchCategory));
    setFoods(results);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const filteredFoods = foods.map((group) => ({
    ...group,
    foods: group.foods.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const hasResults = filteredFoods.some((group) => group.foods.length > 0);

  return (
    <>
      <div className="p-4 overflow-y-scroll h-screen pb-32">
        <Header />
        <Search onSearch={setSearchTerm} />

        <div className="flex flex-row justify-between items-center mt-4">
          <p className="font-semibold">Food Lists</p>
          <div className="flex flex-row items-center gap-2">
            <CountertopsIcon className="text-gray-400" />
          </div>
        </div>

        {hasResults ? (
          filteredFoods.map((group) => {
            if (group.foods.length === 0) return null;

            return (
              <div key={group.category} className="mt-12 overflow-x-auto">
                <p className="font-semibold mb-2 sticky left-0 z-10 pr-4">
                  {group.category}
                </p>
                <div className="flex gap-4 w-max">
                  <Foods foods={group.foods} category={group.category} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center mt-12 text-gray-500">
            <SentimentVeryDissatisfiedIcon style={{ fontSize: 60 }} className="text-red-500"/>
            <p className="mt-4 font-bold text-red-500 text-xl text-center">
              No results found when you search "{searchTerm}"
            </p>
          </div>
        )}

        <Tips />
      </div>

      <NavBar />
    </>
  );
}

export default Home;
