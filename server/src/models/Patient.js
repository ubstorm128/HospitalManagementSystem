const mongoose = require('mongoose');

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const PHONE = /^\d{10}$/;

const patientSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
            minlength: [3, 'Name must be at least 3 characters'],
        },
        dob: {
            type: Date,
            required: [true, 'Date of birth is required'],
            validate: {
                validator: (value) => value <= new Date(),
                message: 'Date of birth cannot be in the future',
            },
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['Male', 'Female', 'Other'],
        },
        contactNumber: {
            type: String,
            required: [true, 'Contact number is required'],
            trim: true,
            match: [PHONE, 'Enter a valid 10-digit phone number'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true,
            minlength: [10, 'Address must be at least 10 characters'],
        },
        bloodGroup: {
            type: String,
            required: [true, 'Blood group is required'],
            enum: BLOOD_GROUPS,
        },
        emergencyName: {
            type: String,
            required: [true, 'Emergency contact name is required'],
            trim: true,
        },
        emergencyNumber: {
            type: String,
            required: [true, 'Emergency contact number is required'],
            trim: true,
            match: [PHONE, 'Enter a valid 10-digit phone number'],
        },
        medicalHistory: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);