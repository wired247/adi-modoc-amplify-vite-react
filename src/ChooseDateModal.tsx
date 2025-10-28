import React from 'react';
import { Device } from './Modoc.types';

const ChooseDateModal: React.FC<{
  deviceProfile: Device | null;
  setShowChooseDate: React.Dispatch<React.SetStateAction<boolean>>;
  handleChooseDate: (date: string, key: string) => void;
  isLoading?: boolean;
}> = ({ deviceProfile, setShowChooseDate, handleChooseDate, isLoading = false }) =>  {
  return (
    <div className="modal">
      <h3>Past Activity for {deviceProfile?.id}</h3>
      
      {isLoading && (
        <div className="loading-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="loading-spinner" style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      )}
      
      <div className="profile-details" style={{ opacity: isLoading ? 0.5 : 1 }}>
        {deviceProfile?.pastMeasurements && deviceProfile.pastMeasurements.length > 0 ? (
          <div>
            {deviceProfile.pastMeasurements.map((measurement, index) => (
              <p key={index}>
                <a 
                  href={`#${index}`} 
                  onClick={isLoading ? undefined : () => { 
                    handleChooseDate(measurement.date, measurement.key); 
                  }}
                  style={{ 
                    pointerEvents: isLoading ? 'none' : 'auto',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1
                  }}
                >
                  {measurement.date}
                </a>
              </p>
            )) }
          </div>
        ) : (
          <p>No past measurements available.</p>
        ) }
      </div>
      <p>&nbsp;</p>
      <button 
        onClick={() => { setShowChooseDate(false); }}
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.6 : 1 }}
      >
        Cancel
      </button>
    </div>
  );
}

export default ChooseDateModal;
