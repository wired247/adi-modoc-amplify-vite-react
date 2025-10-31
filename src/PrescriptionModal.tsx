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

    const getTargetForZoneIndex = (index: number) => {
        if (!deviceProfile || !deviceProfile.targets) return indexToZoneKey(index);
        const target = deviceProfile.targets[index];
        return target ? target.zone : indexToZoneKey(index);
    }

    const indexToZoneKey = (index: number) => {
        switch (index) {
            case 0: return formData.first;
            case 1: return formData.second;
            case 2: return formData.third;
            case 3: return formData.fourth;
            case 4: return formData.fifth;
            default: return formData.first;
        }
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
                                    value={getTargetForZoneIndex(0)} onChange={handleSelectChange} >
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
                                    value={getTargetForZoneIndex(1)} onChange={handleSelectChange} >
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
                                    value={getTargetForZoneIndex(2)} onChange={handleSelectChange} >
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
                                    value={getTargetForZoneIndex(3)} onChange={handleSelectChange} >
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
                                    value={getTargetForZoneIndex(4)} onChange={handleSelectChange} >
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
                <button type="submit" className="save-button" onClick={() => onSave(formData)}>
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