import PropTypes from "prop-types";
import Select from "react-select";
import FileDisplay from "./FileDisplay";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const dummyDoctors = [
	{ id: 1, name: "Dr. John Smith" },
	{ id: 2, name: "Dr. Emily Johnson" },
	{ id: 3, name: "Dr. Michael Brown" },
	{ id: 4, name: "Dr. Sarah Davis" },
	{ id: 5, name: "Dr. David Wilson" },
	{ id: 6, name: "Dr. Sarah Davis" },
	{ id: 7, name: "Dr. David Wilson" },
	{ id: 8, name: "Dr. Sarah Davis" },
	{ id: 9, name: "Dr. David Wilson" },
	{ id: 10, name: "Dr. Sarah Davis" },
	{ id: 11, name: "Dr. David Wilson" },
	{ id: 12, name: "Dr. Sarah Davis" },
	{ id: 13, name: "Dr. David Wilson" },
	{ id: 14, name: "Dr. Sarah Davis" },
	{ id: 15, name: "Dr. David Wilson" },
	{ id: 16, name: "Dr. Sarah Davis" },
	{ id: 17, name: "Dr. David Wilson" },
	{ id: 18, name: "Dr. Sarah Davis" },
	{ id: 19, name: "Dr. David Wilson" },
	{ id: 20, name: "Dr. Sarah Davis" }
];

export default function TreatmentModal({ patient }) {
	const [treatment, setTreatment] = useState({
		doctor: null,
		date: null,
		description: "",
		diagnoseImage: null,
		labeResults: null
	});

	// Handle input change
	const handleOnChange = (e) => {
		const { name, type, value, files } = e.target;

		// Handle file input
		if (type === "file") {
			setTreatment((prev) => ({ ...prev, [name]: files[0] }));
		} else {
			// Handle other types of input (text, date, time, etc.)
			setTreatment((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleRemoveFile = ({ name }) => {
		setTreatment((prev) => ({ ...prev, [name]: null }));
	};

	// convert doctors to correct format for react select library
	const options = dummyDoctors.map((doctor) => ({
		value: {
			id: doctor.id,
			name: doctor.name
		},
		label: doctor.name
	}));

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(treatment);
	};

	return (
		<dialog id="my_modal_1" className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<h3 className="font-bold text-lg text-blue-500">
					Add Treatment Record
				</h3>
				<form onSubmit={onSubmit} method="dialog">
					<div
						onClick={() => {
							document.getElementById("my_modal_1").close();
						}}
						className="btn btn-sm btn-circle btn-ghost text-black absolute right-2 top-2"
					>
						✕
					</div>
					<div className="flex gap-5 items-center mt-4 justify-between">
						<div className="flex items-center gap-2">
							<label
								htmlFor="doctor"
								className="text-black text-sm"
							>
								Doctor:
							</label>
							<Select
								defaultInputValue="Select a doctor..."
								value={treatment.doctor}
								name="doctor"
								onChange={(selectedOption) =>
									setTreatment((prev) => ({
										...prev,
										doctor: selectedOption
									}))
								}
								options={options}
								placeholder="Select a doctor..."
								isSearchable
								className="text-black font-medium border-sky-200 w-fit min-w-44"
							/>
						</div>

						<div className="flex items-center gap-2 w-6/12">
							<label
								htmlFor="doctor"
								className="text-black text-sm"
							>
								Patient:
							</label>
							<div className="py-[5.5px] px-4 font-semibold border-solid border-[1px] border-gray-300 rounded-[4px] text-black bg-white">
								{patient.firstName} {patient.lastName}
							</div>
						</div>
					</div>

					<div className="mt-3">
						<label htmlFor="doctor" className="text-black text-sm">
							Date & Time:
						</label>
						<div className="flex items-center gap-3 mt-2">
							<input
								type="date"
								value={treatment.date}
								onChange={handleOnChange}
								placeholder="Enter treatment date"
								name="date"
								id="date"
								className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
							/>
						</div>
					</div>

					<div className="mt-3">
						<textarea
							value={treatment.description}
							onChange={handleOnChange}
							placeholder="Description for this treatment record..."
							name="description"
							className="textarea textarea-bordered textarea-lg w-full mt-2 bg-white resize-none border-gray-300 text-sm text-black"
						></textarea>
					</div>

					<div className="mt-5">
						<div className="flex justify-between">
							<p className="text-black">Diagnose Image</p>
							<label
								htmlFor="diagnoseImage"
								className="text-black text-sm mr-2 p-2 rounded-full hover:bg-green-100 hover:text-green-400"
							>
								<FontAwesomeIcon icon={faPlus} />
							</label>
						</div>

						<input
							type="file"
							onChange={handleOnChange}
							name="diagnoseImage"
							id="diagnoseImage"
							className="hidden"
						/>

						{treatment.diagnoseImage && (
							<FileDisplay
								fileName={treatment.diagnoseImage.name}
								size={(
									treatment.diagnoseImage.size /
									(1024 * 1024)
								).toFixed(1)}
								onRemove={handleRemoveFile}
								name="diagnoseImage"
							/>
						)}
					</div>

					<div className="mt-5">
						<div className="flex justify-between">
							<p className="text-black">Lab Result</p>
							<label
								htmlFor="labeResults"
								className="text-black text-sm mr-2 p-2 rounded-full hover:bg-green-100 hover:text-green-400"
							>
								<FontAwesomeIcon icon={faPlus} />
							</label>
						</div>

						<input
							type="file"
							onChange={handleOnChange}
							name="labeResults"
							id="labeResults"
							className="hidden"
						/>

						{treatment.labeResults && (
							<FileDisplay
								fileName={treatment.labeResults.name}
								size={(
									treatment.labeResults.size /
									(1024 * 1024)
								).toFixed(1)}
								onRemove={handleRemoveFile}
								name="labeResults"
							/>
						)}
					</div>

					<div className="mt-5 flex gap-1">
						<button className="w-6/12 btn btn-success text-white">
							Save
						</button>
						<button
							type="reset"
							onClick={() => {
								document.getElementById("my_modal_1").close();
							}}
							className="w-6/12 btn btn-outline btn-error text-white"
						>
							cancel
						</button>
					</div>
				</form>
			</div>
		</dialog>
	);
}

TreatmentModal.propTypes = { patient: PropTypes.object.isRequired };
