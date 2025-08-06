import api from "../assets/api";import FavLists from "../components/favorites/FavLists";
import Header from "../components/favorites/Header";
import Navbar from "../components/NavBar";
import { getUserInfoFromToken } from "../utils/auth";
import { useEffect, useState } from "react";

function Favorites() {
	const token = JSON.parse(localStorage.getItem("userData"))?.access;
	const user = getUserInfoFromToken(token);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		if (!user?.id) return;

		api
			.get(`/api/favorites/${user.id}/`)
			.then((res) => setFavorites(res.data))
			.catch((err) => console.error("Failed to fetch favorites:", err));
	}, [user?.id]);

	// This callback will remove the item from the state after successful deletion
	const handleRemove = (foodId) => {
		setFavorites((prev) => prev.filter((fav) => fav.food_item.id !== foodId));
	};

	return (
		<>
			<Header userName={user.first_name} />
			<div className="p-4">
				<ul>
					{favorites.map((item) => (
						<FavLists
							key={item.id}
							food={item}
							userId={user.id}
							onRemove={handleRemove}
						/>
					))}
				</ul>
			</div>
			<Navbar />
		</>
	);
}

export default Favorites;
