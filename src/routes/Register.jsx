import React, { useState } from "react";
import api from "../assets/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Register() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		first_name: "",
		last_name: "",
		password: "",
		retypePassword: "",
		bio: "",
		profile_picture: null,
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.password !== form.retypePassword) return;

		const formData = new FormData();
		formData.append("username", form.email);
		for (let key in form) {
			if (key !== "retypePassword") {
				formData.append(key, form[key]);
			}
		}

		try {
			await api.post("/api/register/", formData);

			Swal.fire({
				title: "Success!",
				text: "Registered successfully. Redirecting to login...",
				icon: "success",
				timer: 5000,
				showConfirmButton: false,
				allowOutsideClick: false,
				allowEscapeKey: false,
				didOpen: () => {
					Swal.showLoading();
				},
			}).then(() => navigate("/login"));
		} catch (err) {
			Swal.fire({
				title: "Error!",
				text: err.response?.data?.detail || "Registration failed. Please check your inputs.",
				icon: "error",
				confirmButtonColor: "#d33",
			});
		}
	};

	const passwordMismatch = form.password && form.retypePassword && form.password !== form.retypePassword;

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
			<Link to={'/'} className="fixed left-3 top-3 p-2 shadow-xl rounded-full bg-gray-100"><ArrowBackIcon/></Link>
			<div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
					<div className="mt-12 flex flex-col items-center">
						<h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
						<form
							className="w-full flex-1 mt-8"
							onSubmit={handleSubmit}
							encType="multipart/form-data">
							<div className="mx-auto max-w-xs flex flex-col gap-4">
								<input
									type="email"
									name="email"
									placeholder="Email"
									onChange={handleChange}
									required
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none"
								/>
								<input
									type="text"
									name="first_name"
									placeholder="First Name"
									onChange={handleChange}
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none"
								/>
								<input
									type="text"
									name="last_name"
									placeholder="Last Name"
									onChange={handleChange}
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none"
								/>
								<input
									type="password"
									name="password"
									placeholder="Password"
									onChange={handleChange}
									required
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none"
								/>
								<input
									type="password"
									name="retypePassword"
									placeholder="Retype Password"
									onChange={handleChange}
									required
									className={`w-full px-8 py-4 rounded-lg font-medium ${
										passwordMismatch ? "bg-red-200" : "bg-gray-100"
									} border border-gray-200 text-sm focus:outline-none`}
								/>
								{passwordMismatch && <p className="text-red-500 text-sm -mt-2">Passwords do not match</p>}
								<textarea
									name="bio"
									placeholder="Short bio (Optional)"
									onChange={handleChange}
									className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none"
								/>
								<input
									type="file"
									name="profile_picture"
									accept="image/*"
									onChange={handleChange}
									className="w-full"
								/>
								<button
									type="submit"
									disabled={passwordMismatch}
									className={`mt-5 tracking-wide font-semibold ${
										passwordMismatch ? "bg-red-500" : "bg-green-500 hover:bg-green-700"
									} text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center`}>
									<span className="ml-3">Sign Up</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
