import { useParams } from "react-router-dom";
import Header from "../components/recipes/Header";
import Body from "../components/recipes/Body";
import Recipes from "../components/recipes/Recipes";
import NavBar from "../components/NavBar";

function Recipe() {
	const { foodId } = useParams();
	console.log(foodId); // e.g., "123"

	return (
		<>
			<Header foodId={foodId} />
			<Body foodId={foodId} />
			<Recipes foodId={foodId} />
			<NavBar/>
		</>
	);
}

export default Recipe;
