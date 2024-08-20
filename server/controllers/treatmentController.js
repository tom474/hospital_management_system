const express = require("express");
const database = require("../models/database");

// Get treatment by patient id
const getTreatmentByPatientId = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL GetTreatmentByPatientId(?)", [patient_id]);
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get treatments by date
const getTreatmentByDate = async (req, res) => {
	try {
		const date = req.params.date;
		const [rows] = await database.poolAdmin.query("CALL GetTreatmentByDate(?)", [date]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get treatment by patient id and date (yyyy-mm-dd)
const getTreatmentByPatientIdAndDate = async (req, res) => {
	try {
		const { patient_id, date } = req.body;
		const [rows] = await database.poolAdmin.query("CALL GetTreatmentByPatientIdAndDate(?, ?)", [
			patient_id,
			date,
		]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Create a new treatment
const createTreatment = async (req, res) => {
	try {
		const { patient_id, staff_id, date, description } = req.body;
		const [rows] = await database.poolAdmin.query(
			"CALL CreateTreatment(?, ?, ?, ?)",
			[patient_id, staff_id, date, description]
		);
		res.json({ message: "Treatment created successfully", treatment: rows[0] });
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	getTreatmentByPatientId,
	getTreatmentByDate,
	getTreatmentByPatientIdAndDate,
	createTreatment,
};
