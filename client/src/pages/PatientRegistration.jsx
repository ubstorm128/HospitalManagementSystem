import { useState } from 'react';

const initialFormState = {
    fullName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    bloodGroup: '',
    emergencyName: '',
    emergencyNumber: '',
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function validateField(name, value) {
    switch (name) {
        case 'fullName':
            if (!value.trim()) return 'Full name is required.';
            if (value.trim().length < 3) return 'Name must be at least 3 characters.';
            return '';
        case 'dob':
            if (!value) return 'Date of birth is required.';
            if (new Date(value) > new Date()) return 'Date of birth cannot be in the future.';
            return '';
        case 'gender':
            if (!value) return 'Please select a gender.';
            return '';
        case 'contactNumber':
            if (!value.trim()) return 'Contact number is required.';
            if (!/^\d{10}$/.test(value.trim())) return 'Enter a valid 10-digit phone number.';
            return '';
        case 'email':
            if (!value.trim()) return 'Email is required.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address.';
            return '';
        case 'address':
            if (!value.trim()) return 'Address is required.';
            if (value.trim().length < 10) return 'Address must be at least 10 characters.';
            return '';
        case 'bloodGroup':
            if (!value) return 'Please select a blood group.';
            return '';
        case 'emergencyName':
            if (!value.trim()) return 'Emergency contact name is required.';
            return '';
        case 'emergencyNumber':
            if (!value.trim()) return 'Emergency contact number is required.';
            if (!/^\d{10}$/.test(value.trim())) return 'Enter a valid 10-digit phone number.';
            return '';
        default:
            return '';
    }
}

export default function PatientRegistration() {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateAll = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            newErrors[key] = validateField(key, formData[key]);
        });
        setErrors(newErrors);
        setTouched(
            Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
        );
        return Object.values(newErrors).every((err) => !err);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;

        setSubmittedData(formData);
        console.log('Patient registered:', formData);
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setErrors({});
        setTouched({});
        setSubmittedData(null);
    };

    const fieldClass = (name) =>
        `form-input${touched[name] && errors[name] ? ' form-input-error' : ''}`;

    return (
        <div className="page">
            <div className="auth-card">
                <div className="auth-card-header">
                    <h1 className="auth-card-title">Patient Registration</h1>
                    <p className="auth-card-subtitle">
                        Enter patient details to create a new record.
                    </p>
                </div>

                {submittedData && (
                    <div className="form-success">
                        Patient <strong>{submittedData.fullName}</strong> registered successfully.
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="fullName">
                            Full Name <span className="required-indicator">*</span>
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="e.g. Ananya Sharma"
                            value={formData.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={fieldClass('fullName')}
                        />
                        {touched.fullName && errors.fullName && (
                            <p className="field-error">{errors.fullName}</p>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dob">
                                Date of Birth <span className="required-indicator">*</span>
                            </label>
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={fieldClass('dob')}
                            />
                            {touched.dob && errors.dob && <p className="field-error">{errors.dob}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">
                                Gender <span className="required-indicator">*</span>
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={fieldClass('gender')}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {touched.gender && errors.gender && (
                                <p className="field-error">{errors.gender}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="contactNumber">
                                Contact Number <span className="required-indicator">*</span>
                            </label>
                            <input
                                id="contactNumber"
                                name="contactNumber"
                                type="tel"
                                placeholder="10-digit number"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={fieldClass('contactNumber')}
                            />
                            {touched.contactNumber && errors.contactNumber && (
                                <p className="field-error">{errors.contactNumber}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email <span className="required-indicator">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="patient@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={fieldClass('email')}
                            />
                            {touched.email && errors.email && <p className="field-error">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">
                            Address <span className="required-indicator">*</span>
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            rows="3"
                            placeholder="House no., street, city, state, PIN"
                            value={formData.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={fieldClass('address')}
                        />
                        {touched.address && errors.address && (
                            <p className="field-error">{errors.address}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="bloodGroup">
                            Blood Group <span className="required-indicator">*</span>
                        </label>
                        <select
                            id="bloodGroup"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={fieldClass('bloodGroup')}
                        >
                            <option value="">Select blood group</option>
                            {bloodGroups.map((bg) => (
                                <option key={bg} value={bg}>
                                    {bg}
                                </option>
                            ))}
                        </select>
                        {touched.bloodGroup && errors.bloodGroup && (
                            <p className="field-error">{errors.bloodGroup}</p>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="emergencyName">
                                Emergency Contact Name <span className="required-indicator">*</span>
                            </label>
                            <input
                                id="emergencyName"
                                name="emergencyName"
                                type="text"
                                placeholder="e.g. Rakesh Sharma"
                                value={formData.emergencyName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={fieldClass('emergencyName')}
                            />
                            {touched.emergencyName && errors.emergencyName && (
                                <p className="field-error">{errors.emergencyName}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="emergencyNumber">
                                Emergency Contact Number <span className="required-indicator">*</span>
                            </label>
                            <input
                                id="emergencyNumber"
                                name="emergencyNumber"
                                type="tel"
                                placeholder="10-digit number"
                                value={formData.emergencyNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={fieldClass('emergencyNumber')}
                            />
                            {touched.emergencyNumber && errors.emergencyNumber && (
                                <p className="field-error">{errors.emergencyNumber}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>
                            Reset
                        </button>
                        <button type="submit" className="btn">
                            Register Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}