import React from 'react';
import { Device } from './Modoc.types';

const DeviceProfileModal: React.FC<{
  deviceProfile: Device | null;
  setDeviceProfile: React.Dispatch<React.SetStateAction<Device | null>>;
  setShowDeviceProfile: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateProfile: () => void;
}> = ({ deviceProfile, setDeviceProfile, setShowDeviceProfile, handleUpdateProfile }) =>  {
  return (
    <div className="modal">
        <h3>Zone Thresholds for {deviceProfile?.id}</h3>
            {deviceProfile ? (
            <div className="profile-details">
                {/*
                <div className="form-group">
                <label>Kit ID:</label>
                <input
                    type="text"
                    value={deviceProfile.kitId}
                    onChange={(e) => setDeviceProfile({ ...deviceProfile, kitId: e.target.value })}
                />
                </div>
                */}
                <div className="form-group">
                    <label>Zone 1:</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <label className="profile-label">Min HR:</label>
                            <input
                                type="number"
                                value={deviceProfile.zones[0].minHR}
                                onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[0], minHR: Number(e.target.value) }] })}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <span className="profile-captions">to</span>
                        <div style={{ flex: 1 }}>
                            <label className="profile-label">Max HR:</label>
                            <input
                                type="number"
                                value={deviceProfile.zones[0].maxHR}
                                onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[0], maxHR: Number(e.target.value) }] })}
                                style={{ width: '100%' }}
                            />
                        </div>
                        {/* <span className="profile-captions">for 20 seconds</span> */}
                    </div>
                </div>
                <div className="form-group">
                    <label>Zone 2:</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <label className="profile-label">Min HR:</label>
                            <input
                                type="number"
                                value={deviceProfile.zones[1].minHR}
                                onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[1], minHR: Number(e.target.value) }] })}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <span className="profile-captions">to</span>
                        <div style={{ flex: 1 }}>
                            <label className="profile-label">Max HR:</label>
                            <input
                                type="number"
                                value={deviceProfile.zones[1].maxHR}
                                onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[1], maxHR: Number(e.target.value) }] })}
                                style={{ width: '100%' }}
                            />
                        </div>
                        {/* <span className="profile-captions"> for 30 seconds</span> */}
                    </div>
                </div>
                <div className="form-group">
                    <label>Zone 3:</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <label className="profile-label">Min HR:</label>
                            <input
                                type="number"
                                value={deviceProfile.zones[2].minHR}
                                onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[2], minHR: Number(e.target.value) }] })}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <span className="profile-captions">to</span>
                        <div style={{ flex: 1 }}>
                            <label className="profile-label">Max HR:</label>
                            <input
                                type="number"
                                value={deviceProfile.zones[2].maxHR}
                                onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[2], maxHR: Number(e.target.value) }] })}
                                style={{ width: '100%' }}
                            />
                        </div>
                        {/* <span className="profile-captions"> for 20 seconds</span> */}
                    </div>
                </div>
                <div className="form-group">
                    <label>Zone 4:</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <label className="profile-label">Min HR:</label>
                            <input
                                type="number"
                                value={deviceProfile.zones[3].minHR}
                                onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[3], minHR: Number(e.target.value) }] })}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <span className="profile-captions">to</span>
                        <div style={{ flex: 1 }}>
                            <label className="profile-label">Max HR:</label>
                            <input
                                type="number"
                                value={deviceProfile.zones[3].maxHR}
                                onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[3], maxHR: Number(e.target.value) }] })}
                                style={{ width: '100%' }}
                            />
                        </div>
                        {/* <span className="profile-captions"> for 30 seconds</span> */}
                    </div>
                </div>
                <div className="form-group">
                    <label>Zone 5:</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                        <label className="profile-label">Min HR:</label>
                        <input
                            type="number"
                            value={deviceProfile.zones[4].minHR}
                            onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[4], minHR: Number(e.target.value) }] })}
                            style={{ width: '100%' }}
                        />
                        </div>
                        <span className="profile-captions">to</span>
                        <div style={{ flex: 1 }}>
                        <label className="profile-label">Max HR:</label>
                        <input
                            type="number"
                            value={deviceProfile.zones[4].maxHR}
                            onChange={(e) => setDeviceProfile({ ...deviceProfile, zones: [{ ...deviceProfile.zones[4], maxHR: Number(e.target.value) }] })}
                            style={{ width: '100%' }}
                        />
                        </div>
                        {/* <span className="profile-captions">for 20 seconds</span> */}
                    </div>
                </div>
                {/*
                <div className="form-group">
                <label>Detail URL:</label>
                <input
                    type="text"
                    value={deviceProfile.detail}
                    onChange={(e) => setDeviceProfile({ ...deviceProfile, detail: e.target.value })}
                />
                </div>
                */}
            </div>
            ) : (
            <div className="error-message-outlined">
                <strong>No device profile selected.</strong>
            </div>
            )}
        <div className="modal-buttons">
            <button onClick={handleUpdateProfile}>Submit</button>
            <button onClick={() => setShowDeviceProfile(false)}>Close</button>
        </div>
    </div>
  );
}

export default DeviceProfileModal;