import React from 'react';
import { Device } from './Modoc.types';

const ChooseDateModal: React.FC<{
  deviceProfile: Device | null;
  setDeviceProfile: React.Dispatch<React.SetStateAction<Device | null>>;
  setShowDeviceProfile: React.Dispatch<React.SetStateAction<boolean>>;
  handleChooseDate: () => void;
}> = ({ deviceProfile, setDeviceProfile, setShowDeviceProfile, handleChooseDate }) =>  {
  return (
    <div className="modal">
        <h3>Past Activity for {deviceProfile?.id}</h3>
            {deviceProfile ? (
            <div className="profile-details">
                <p>Heart Rate Zone 1: {deviceProfile.zones[0]?.minHR} - {deviceProfile.zones[0]?.maxHR} bpm</p>
            </div>
            ) : (
            <p>Loading...</p>
            )}
        <button
            onClick={() => {
            handleChooseDate();
            setShowDeviceProfile(false);
            }}
        >
            Save
        </button>
    </div>
  );
}

export default ChooseDateModal;
