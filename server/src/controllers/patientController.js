const mongoose = require('mongoose');
const Patient = require('../models/Patient');

const handleError = (res, error) => {
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e) => e.message);
        return res.status(400).json({ success: false, message: 'Validation failed', errors: messages });
    }
    if (error.name === 'CastError') {
        return res.status(400).json({ success: false, message: 'Invalid ID or data format' });
    }
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
};

const isValidId = (id) => mongoose.isValidObjectId(id);

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.json({ success: true, count: patients.length, data: patients });
    } catch (error) {
        handleError(res, error);
    }
};

const getPatientById = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid patient ID' });
        }
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.json({ success: true, data: patient });
    } catch (error) {
        handleError(res, error);
    }
};

const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body || {});
        res.status(201).json({ success: true, message: 'Patient created successfully', data: patient });
    } catch (error) {
        handleError(res, error);
    }
};

const updatePatient = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid patient ID' });
        }
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body || {}, {
            new: true,
            runValidators: true,
        });
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.json({ success: true, message: 'Patient updated successfully', data: patient });
    } catch (error) {
        handleError(res, error);
    }
};

const deletePatient = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid patient ID' });
        }
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.json({ success: true, message: 'Patient deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
};