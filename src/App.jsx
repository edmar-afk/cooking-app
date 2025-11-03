import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./routes/Welcome";
import Home from "./components/Home/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Recipe from "./routes/Recipe";
import Favorites from "./routes/Favorites";
import RecipeStop from "./routes/RecipeStop";
import RecipePlay from "./routes/RecipePlay";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/:foodId" element={<Recipe />} />
        <Route path="/recipe/:foodId/stop" element={<RecipeStop />} />
        <Route path="/recipe/:foodId/play" element={<RecipePlay />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
