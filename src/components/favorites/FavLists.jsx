import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import api from "../../assets/api";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

function getShortTimeAgo(date) {
  const now = dayjs();
  const target = dayjs(date);
  const diffInMinutes = now.diff(target, "minute");
  const diffInHours = now.diff(target, "hour");
  const diffInDays = now.diff(target, "day");
  const diffInYears = now.diff(target, "year");

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 365) return `${diffInDays}d ago`;
  return `${diffInYears}y ago`;
}

function FavLists({ food, userId, onRemove }) {
  const item = food.food_item;
  const timeAgo = getShortTimeAgo(food.fav_added);

  const handleRemove = async () => {
    const confirm = await Swal.fire({
      title: "Remove from Favorites?",
      text: "Are you sure you want to remove this item from your favorites?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await api.post("/api/favorites/remove/", {
          user_id: userId,
          food_id: item.id,
        });

        if (response.status === 200) {
          Swal.fire({
            title: "Removed!",
            text: "Successfully removed from favorites.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          if (onRemove) onRemove(item.id);
        }
      } catch (error) {
        console.error("Failed to remove favorite:", error);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  return (
    <Link to={`/recipe/${item.id}`}>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={`${BASE_URL}${item.image}`}
            alt={item.name}
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {item.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button
            onClick={handleRemove}
            className="text-sm leading-6 text-red-600 flex items-center"
          >
            <FavoriteIcon className="mr-1 text-red-600" />
            Remove
          </button>
          <p className="mt-1 text-xs leading-5 text-gray-400 font-bold">
            Added {timeAgo}
          </p>
        </div>
      </li>{" "}
    </Link>
  );
}

export default FavLists;
