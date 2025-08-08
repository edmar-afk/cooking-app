import { useNavigate } from "react-router-dom";
import bg from "../assets/images/welcomebg.jpg";
import Features from "../components/Features";
import { Link } from "react-router-dom";

function Welcome() {
	const navigate = useNavigate();

	const requestMicPermission = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			console.log("Mic access granted:", stream);
			alert("Microphone access granted. You can now use voice features.");
			navigate("/home");
		} catch (err) {
			console.error("Mic access error:", err);
			alert("Microphone permission denied. Voice commands won't work.");
		}
	};

	return (
		<div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
			<img
				src={bg}
				alt="Background"
				className="absolute w-full h-full object-cover -z-10 rotate-180"
			/>
			<div className="absolute bottom-0 z-20 p-8 rounded-xl text-center w-full max-w-xl custom-welcome-bg custom-welcome-text custom-welcome-blur">
				<h1 className="text-3xl font-extrabold mb-4">Welcome to 🎉</h1>
				<p className="text-xl">Cooking instructions innovation of speech recognition</p>
				<Features />
				<div>
					<button
						onClick={requestMicPermission}
						className="relative z-20 mt-6 px-6 py-3 text-sm font-extrabold transition-all custom-welcome-button">
						Continue as Guest
					</button>
					<p className="text-xs">OR</p>
					<div className="mt-2">
						<Link className="text-sm font-extrabold custom-welcome-link" to={"/login"}>
							Login
						</Link>
						<span className="mx-3">|</span>
						<Link className="text-sm font-extrabold custom-welcome-link" to={"/register"}>
							Register
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Welcome;
