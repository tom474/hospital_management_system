const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const database = require("../models/database");

// Get all staffs with optional sorting order and department filter
const getAllStaffs = async (req, res) => {
    try {
        const { order = 'ASC', department_id = null } = req.query;
        const [rows] = await database.poolAdmin.query("CALL getAllStaffs(?, ?)", [order, department_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get staff by id
const getStaffById = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL getStaffByStaffId(?)", [staff_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new staff
const createStaff = async (req, res) => {
    try {
        const { first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id } = req.body;
        const [rows] = await database.poolAdmin.query(
            "CALL createStaff(?, ?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id]
        );
        res.json({ message: "Staff created successfully", staff: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a staff information
const updateStaff = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const { first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id } = req.body;
        const [rows] = await database.poolAdmin.query(
            "CALL updateStaff(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [staff_id, first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id]
        );
        res.json({ message: "Staff updated successfully", staff: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get staff's available time based on schedule and appointment
const getStaffAvailableTime = async (req, res) => {
    try {
        const { staff_id, date } = req.body;
        const [rows] = await database.poolAdmin.query("CALL GetStaffAvailableTime(?, ?)", [staff_id, date]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Add a staff document (e.g., certificates, training materials)
const addStaffDocument = async (req, res) => {
    const mongoClient = new MongoClient(process.env.MONGO_URI);

    try {
        const { staff_id, document_type, description, document_content } = req.body;

        // Connect to MongoDB
        await mongoClient.connect();
        const db = mongoClient.db(process.env.MONGO_DATABASE_NAME);
        const Document = db.collection('Documents');

        // Generate a unique document ID
        const documentId = uuidv4();

        // Insert the document into MongoDB
        const document = {
            entityType: "Staff",
            entityId: staff_id,
            documentType: document_type,
            documentId: documentId,
            description: description,
            content: document_content
        };
        await Document.insertOne(document);

        // Insert the reference into MySQL
        const [rows] = await database.poolAdmin.query(
            "CALL createDocumentReference(?, ?, ?, ?, ?)",
            ['Staff', staff_id, document_type, documentId, description]
        );

        // Close MongoDB connection
        await mongoClient.close();

        res.json({ message: "Document added successfully", document: rows[0] });
    } catch (err) {
        await mongoClient.close();
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllStaffs,
    getStaffById,
    getStaffAvailableTime,
    createStaff,
    updateStaff,
    addStaffDocument,
};
