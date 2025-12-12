import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Search from "../Search";
import Foods from "./Foods";
import Header from "./Header";
import Tips from "./Tips";
import api from "../../assets/api";
import CountertopsIcon from "@mui/icons-material/Countertops";
import AddRecipes from "./AddRecipes";

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
  ];

  const loadFoods = async () => {
    const fetchCategory = async (cat) => {
      const res = await api.get(`/api/foods/${cat}/`);
      return { category: cat, foods: res.data };
    };
    const results = await Promise.all(categories.map(fetchCategory));
    setFoods(results);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <>
      <div className="p-4 overflow-y-scroll h-screen pb-32">
        <Header />
        <Search onSearch={setSearchTerm} />

        <div className="flex flex-row justify-between items-center mt-4">
          <p className="font-semibold">Food Lists</p>
          <div className="flex flex-row items-center gap-2">
            {/* <AddRecipes onUploadSuccess={loadFoods} /> */}
            <CountertopsIcon className="text-gray-400" />
          </div>
        </div>

        {foods.map((group) => {
          const foodsByCategory = group.foods.filter((item) =>
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (foodsByCategory.length === 0) return null;

          return (
            <div key={group.category} className="mt-12 overflow-x-auto">
              <p className="font-semibold mb-2 sticky left-0 z-10 pr-4">
                {group.category}
              </p>

              <div className="flex gap-4 w-max">
                <Foods foods={foodsByCategory} category={group.category} />
              </div>
            </div>
          );
        })}

        <Tips />
      </div>

      <NavBar />
    </>
  );
}

export default Home;
