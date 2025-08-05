import React, { useEffect, useState } from "react";import { useNavigate } from "react-router-dom";import ArrowBackIcon from "@mui/icons-material/ArrowBack";import FavoriteIcon from "@mui/icons-material/Favorite";
import { getUserInfoFromToken } from "../../utils/auth";
import api from "../../assets/api";

function Header({ foodId }) {
	const navigate = useNavigate();
	const token = JSON.parse(localStorage.getItem("userData"))?.access;
	const user = getUserInfoFromToken(token);
	const [isFavorited, setIsFavorited] = useState(false);

	useEffect(() => {
		if (user?.id && foodId) {
			api
				.get(`/api/favorites/check/${user.id}/${foodId}/`)
				.then((res) => {
					setIsFavorited(res.data.is_favorited);
				})
				.catch((err) => console.error("Favorite check failed:", err));
		}
	}, [user?.id, foodId]);

	const toggleFavorite = async () => {
		try {
			if (isFavorited) {
				await api.post("/api/favorites/remove/", {
					user_id: user.id,
					food_id: foodId,
				});
				setIsFavorited(false);
			} else {
				await api.post("/api/favorites/add/", {
					user_id: user.id,
					food_id: foodId,
				});
				setIsFavorited(true);
			}
		} catch (error) {
			console.error("Favorite toggle failed:", error.response?.data || error.message);
		}
	};

	return (
		<div className="flex flex-row justify-between items-center p-4">
			<ArrowBackIcon
				fontSize="medium"
				className="cursor-pointer"
				onClick={() => navigate(-1)}
			/>
			<p className="font-semibold text-lg">Food Details</p>
			<FavoriteIcon
				fontSize="medium"
				onClick={toggleFavorite}
				className={`cursor-pointer transition-colors ${
					isFavorited ? "text-red-500" : "text-gray-400 hover:text-red-400"
				}`}
			/>
		</div>
	);
}

export default Header;
