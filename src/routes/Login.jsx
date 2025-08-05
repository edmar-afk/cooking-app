import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../assets/api"; // make sure you use your correct API instance
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const res = await api.post("/api/login/", { username: email, password });

			// Save full user data to localStorage
			localStorage.setItem("userData", JSON.stringify(res.data));

			// SweetAlert Success Message
			Swal.fire({
				title: "Login successful!",
				text: "Redirecting to home...",
				icon: "success",
				timer: 5000,
				showConfirmButton: false,
				allowOutsideClick: false,
				allowEscapeKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			}).then(() => {
				navigate("/home");
			});
		} catch (err) {
			Swal.fire({
				title: "Login failed!",
				text: "Please check your credentials.",
				icon: "error",
				confirmButtonColor: "#d33",
			});
			console.error(err.response?.data || err.message);
		}
	};

	return (
		<>
			<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
				<Link
					to={"/"}
					className="fixed left-3 top-3 p-2 shadow-xl rounded-full bg-gray-100">
					<ArrowBackIcon />
				</Link>
				<div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
					<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
						<div className="mt-12 flex flex-col items-center">
							<h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
							<div className="w-full flex-1 mt-8">
								<div className="mx-auto max-w-xs">
									<input
										className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none"
										type="email"
										placeholder="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<input
										className="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none"
										type="password"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<button
										onClick={handleLogin}
										className="mt-5 tracking-wide font-semibold bg-green-500 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
											/>
										</svg>
										<span className="ml-3">Login</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
