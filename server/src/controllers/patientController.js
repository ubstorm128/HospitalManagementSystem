const getPatients = (req, res) => {
    res.json({ success: true, message: 'Get all patients' });
};

const getPatientById = (req, res) => {
    res.json({ success: true, message: 'Get patient', id: req.params.id });
};

const createPatient = (req, res) => {
    res.status(201).json({ success: true, message: 'Patient created', data: req.body });
};

const updatePatient = (req, res) => {
    res.json({ success: true, message: 'Patient updated', id: req.params.id, data: req.body });
};

const deletePatient = (req, res) => {
    res.json({ success: true, message: 'Patient deleted', id: req.params.id });
};

module.exports = {
    getPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
};