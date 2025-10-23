import React, { useState } from 'react';
import { Device, zoneChoice } from './Modoc.types';

interface PrescriptionModalProps {
    deviceProfile: Device | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (prescriptionData: any) => void;
}

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
    deviceProfile,
    isOpen,
    onClose,
    onSave
}) => {
    const [formData, setFormData] = useState({
        first: zoneChoice.Zone1,
        second: zoneChoice.Zone2,
        third: zoneChoice.Zone4,
        fourth: zoneChoice.Zone2,
        fifth: zoneChoice.Zone1,
        firstDuration: 20,
        secondDuration: 20,
        thirdDuration: 30,
        fourthDuration: 20,
        fifthDuration: 30
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      handleSelectChange(event);
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <h3>Prescription for {deviceProfile?.id}</h3>
            {deviceProfile ? (
            <form onSubmit={handleSubmit}>
                <div className="prescription-details">
                    <div className="form-group">
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <select id="first" name="first" className="prescription-select" 
                                    value={formData.first} onChange={handleSelectChange} >
                                    {Object.values(zoneChoice).map(zone => (
                                        <option key={zone} value={zone}>{zone}</option>
                                    ))}
                                </select>
                            </div>
                            <span className="prescription-captions">for</span>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    id="firstDuration"
                                    name="firstDuration"
                                    value={formData.firstDuration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>seconds</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <select id="second" name="second" className="prescription-select"
                                    value={formData.second} onChange={handleSelectChange} >
                                    {Object.values(zoneChoice).map(zone => (
                                        <option key={zone} value={zone}>{zone}</option>
                                    ))}
                                </select>
                            </div>
                            <span className="prescription-captions">for</span>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    id="secondDuration"
                                    name="secondDuration"
                                    value={formData.secondDuration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>seconds</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <select id="third" name="third" className="prescription-select"
                                    value={formData.third} onChange={handleSelectChange} >
                                    {Object.values(zoneChoice).map(zone => (
                                        <option key={zone} value={zone}>{zone}</option>
                                    ))}
                                </select>
                            </div>
                            <span className="prescription-captions">for</span>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    id="thirdDuration"
                                    name="thirdDuration"
                                    value={formData.thirdDuration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>seconds</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <select id="fourth" name="fourth" className="prescription-select"
                                    value={formData.fourth} onChange={handleSelectChange} >
                                    {Object.values(zoneChoice).map(zone => (
                                        <option key={zone} value={zone}>{zone}</option>
                                    ))}
                                </select>
                            </div>
                            <span className="prescription-captions">for</span>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    id="fourthDuration"
                                    name="fourthDuration"
                                    value={formData.fourthDuration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>seconds</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <select id="fifth" name="fifth" className="prescription-select"
                                    value={formData.fifth} onChange={handleSelectChange} >
                                    {Object.values(zoneChoice).map(zone => (
                                        <option key={zone} value={zone}>{zone}</option>
                                    ))}
                                </select>
                            </div>
                            <span className="prescription-captions">for</span>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    id="fifthDuration"
                                    name="fifthDuration"
                                    value={formData.fifthDuration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div style={{ flex: 1 }}>seconds</div>
                        </div>
                    </div>
                </div>
            </form>
            ) : (
            <div className="error-message-outlined">
                <strong>No device profile selected.</strong>
            </div>
            )}
            <div className="modal-buttons">
                <button type="submit" className="save-button">
                    Save Prescription
                </button>
                <button type="button" className="cancel-button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PrescriptionModal;