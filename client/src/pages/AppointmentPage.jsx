import { useEffect, useState } from "react";
import DurationModal from "../components/appointment/main/DurationModal";
import AppointmentTable from "../components/appointment/main/AppointmentTable";
import { useNavigate } from "react-router-dom";

export default function AppointmentPage() {
	const navigate = useNavigate();

	const [duration, setDuration] = useState({
		startDate: "",
		endDate: ""
	});

	const [mode, setMode] = useState(true);

	const checkDuration = (duration) => {
		if (duration && duration.startDate && duration.endDate) {
			setDuration({
				startDate: duration.startDate,
				endDate: duration.endDate
			});
		} else {
			document.getElementById("duration_modal").showModal();
		}
	};

	useEffect(() => {
		const fetch = JSON.parse(localStorage.getItem("duration"));
		checkDuration(fetch);
	}, []);

	const handleUpdateDuration = (newDuration) => {
		setDuration(newDuration);
		localStorage.setItem("duration", JSON.stringify(newDuration));
		document.getElementById("duration_modal").close();
		checkDuration(newDuration);
	};

	const handleView = (mode) => {
		setMode(mode === "available" ? true : false);
		navigate(`/appointment?mode=${mode}`);
	};

	return (
		<div className="flex flex-col mt-5 gap-5">
			<h1 className="mt-5 text-center w-full text-blue-400 text-5xl font-bold">
				Appointment Management
			</h1>

			<div className="flex justify-between mt-2">
				<div className="flex gap-1">
					<div
						onClick={() => handleView("available")}
						className={`p-2 rounded bg-blue-400 text-white hover:bg-blue-300 cursor-pointer ${
							mode && "bg-blue-900"
						}`}
					>
						<p>Available</p>
					</div>

					<div
						onClick={() => handleView("busy")}
						className={`p-2 rounded bg-blue-400 text-white hover:bg-blue-300 cursor-pointer ${
							!mode && "bg-blue-900"
						}`}
					>
						<p>Busy</p>
					</div>
				</div>

				<div className="flex gap-1">
					<div className="p-2 flex items-center bg-blue-400 rounded text-white font-semibold text-lg">
						<p>
							{duration.startDate} {"-> "} {duration.endDate}
						</p>
					</div>

					{duration && (
						<DurationModal
							key={"appointment_page"}
							isTreatment={true}
							duration={duration}
							onUpdate={handleUpdateDuration}
							type="duration"
						/>
					)}

					<div
						onClick={() => {
							document
								.getElementById("duration_modal")
								.showModal();
						}}
						className="px-2 flex justify-center items-center bg-blue-400 rounded text-white transition ease-in-out hover:bg-blue-300 cursor-pointer"
					>
						Edit Duration
					</div>
				</div>
			</div>

			<AppointmentTable duration={duration} />
		</div>
	);
}
