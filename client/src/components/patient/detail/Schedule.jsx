import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import ScheduleDetail from "./ScheduleDetail";
import { useState } from "react";

const dummyData = [
	{
		id: 1,
		date: "2024-08-01",
		doctor: "Dr. John Smith",
		startTime: "10:00",
		endTime: "11:00",
		purpose: "General Checkup"
	},
	{
		id: 2,
		date: "2024-08-05",
		doctor: "Dr. Emily Johnson",
		startTime: "02:00",
		endTime: "03:00",
		purpose: "Follow-up on Blood Test Results"
	},
	{
		id: 3,
		date: "2024-08-10",
		doctor: "Dr. Michael Brown",
		startTime: "09:00",
		endTime: "10:00",
		purpose:
			"Consultation for Allergy Symptoms Consultation for Allergy SymptomsConsultation for Allergy SymptomsConsultation for Allergy Symptoms"
	},
	{
		id: 4,
		date: "2024-08-12",
		doctor: "Dr. Sarah Davis",
		startTime: "11:30",
		endTime: "12:30",
		purpose: "Dermatology Consultation"
	},
	{
		id: 5,
		date: "2024-08-15",
		doctor: "Dr. David Wilson",
		startTime: "01:00",
		endTime: "02:00",
		purpose: "Review of Medication Plan"
	}
];

const columns = [
	{ key: "date", title: "Date", size: "w-[10%]" },
	{ key: "doctor", title: "Doctor", size: "w-[15%]" },
	{ key: "time", title: "Time", size: "w-[12%]" },
	{ key: "purpose", title: "Purpose", size: "w-4/12" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];

export default function Schedule({ patient }) {
	const [currentPage, setCurrentPage] = useState(1);
	const patientsPerPage = 10;
	const indexOfLastSchedule = currentPage * patientsPerPage;
	const indexOfFirstSchedule = indexOfLastSchedule - patientsPerPage;
	const currentSchedule = dummyData.slice(
		indexOfFirstSchedule,
		indexOfLastSchedule
	);
	const totalPages = Math.ceil(dummyData.length / patientsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	console.log(patient);
	const fullName = `${patient.firstName} ${patient.lastName}`;
	return (
		<div className="w-9/12 mb-6">
			<div className="mb-2 flex justify-between">
				<h1 className="font-semibold text-3xl text-blue-600">
					Patient Schedule
				</h1>
			</div>

			<div className="border-[1px] rounded-lg border-solid border-gray-400 p-2">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									className={`${column.size} text-blue-500 text-base`}
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{currentSchedule.map((data, index) => (
							<tr key={index}>
								<td className="align-top text-black">
									{data.date}
								</td>
								<td className="align-top text-black">
									{data.doctor}
								</td>
								<td className="align-top text-black">
									{data.startTime} - {data.endTime}
								</td>
								<td className="align-top text-black">
									{data.purpose}
								</td>
								<td className="align-top text-black">
									<ScheduleDetail
										schedule={data}
										patient={fullName}
									/>
									<div
										onClick={() => {
											document
												.getElementById(
													`schedule_${data.id}`
												)
												.showModal();
										}}
										className="btn btn-outline rounded-full btn-success hover:text-white"
									>
										<FontAwesomeIcon icon={faEye} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-end mb-5 mt-2">
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => paginate(i + 1)}
						className={`px-3 py-1 mx-1 ${
							currentPage === i + 1
								? "bg-blue-400 text-white"
								: "bg-gray-200"
						} rounded`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
}

Schedule.propTypes = { patient: PropTypes.object.isRequired };
