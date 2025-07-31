import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./routes/Welcome";
import Home from "./components/Home/Home";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Welcome />}
				/>
				<Route
					path="/home"
					element={<Home />}
				/>
				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
