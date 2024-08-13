import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddPatientPage() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		birthDate: "",
		address: "",
		email: "",
		phoneNumber: "",
		allergies: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log(formData);
	};

	return (
		<>
			<div className="mb-3 mt-5">
				<Link
					className="text-2xl  font-bold cursor-pointer transition ease-in-out hover:text-blue-600"
					to={"/patient"}
				>
					Back
				</Link>
			</div>
			<div className="w-full mx-auto  mb-10 p-6 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-blue-400">
					Add New Patient
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">
							First Name:
						</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">
							Last Name:
						</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">
							Birth Date:
						</label>
						<input
							type="date"
							name="birthDate"
							value={formData.birthDate}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Address:</label>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Email:</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">
							Phone Number:
						</label>
						<input
							type="tel"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">
							Allergies:
						</label>
						<input
							type="text"
							name="allergies"
							value={formData.allergies}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
					>
						Add Patient
					</button>
				</form>
			</div>
		</>
	);
}
