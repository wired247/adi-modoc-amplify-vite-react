import React from 'react';
import { Device } from './Modoc.types';

const ChooseDateModal: React.FC<{
  deviceProfile: Device | null;
  setShowChooseDate: React.Dispatch<React.SetStateAction<boolean>>;
  handleChooseDate: (date: string, key: string) => void;
}> = ({ deviceProfile, setShowChooseDate, handleChooseDate }) =>  {
  return (
    <div className="modal">
      <h3>Past Activity for {deviceProfile?.id}</h3>
      <div className="profile-details">
        {deviceProfile?.pastMeasurements && deviceProfile.pastMeasurements.length > 0 ? (
          <div>
            {deviceProfile.pastMeasurements.map((measurement, index) => (
              <p key={index}>
                <a href={`#${index}`} onClick={() => { 
                  handleChooseDate(measurement.date, measurement.key); 
                }}>{measurement.date}</a>
              </p>
            )) }
          </div>
        ) : (
          <p>No past measurements available.</p>
        ) }
      </div>
      <p>&nbsp;</p>
      <button onClick={() => { setShowChooseDate(false); }}>Cancel</button>
    </div>
  );
}

export default ChooseDateModal;
