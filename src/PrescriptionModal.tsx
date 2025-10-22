import React, { useState } from 'react';
// import './PrescriptionModal.css';

interface PrescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (prescriptionData: any) => void;
}

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
    isOpen,
    onClose,
    onSave
}) => {
    const [formData, setFormData] = useState({
        patientName: '',
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Prescription Details</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="patientName">Patient Name</label>
                            <input
                                type="text"
                                id="patientName"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="medication">Medication</label>
                            <input
                                type="text"
                                id="medication"
                                name="medication"
                                value={formData.medication}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dosage">Dosage</label>
                            <input
                                type="text"
                                id="dosage"
                                name="dosage"
                                value={formData.dosage}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="frequency">Frequency</label>
                            <input
                                type="text"
                                id="frequency"
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration">Duration</label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-button">
                            Save Prescription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PrescriptionModal;