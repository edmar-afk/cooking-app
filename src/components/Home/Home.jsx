import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Search from "../Search";
import Foods from "./Foods";
import Header from "./Header";
import Tips from "./Tips";
import api from "../../assets/api";

function Home() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/api/fooditems/")
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="p-4 overflow-y-scroll h-screen pb-32">
        <Header />
        <Search onSearch={setSearchTerm} />
        <div className="overflow-x-auto">
          <div className="flex gap-4 w-max">
            <Foods foods={filteredFoods} />
          </div>
        </div>
        <Tips />
      </div>
      <NavBar />
    </>
  );
}

export default Home;
