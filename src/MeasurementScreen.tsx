import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Device } from './Modoc.types';
import { DefaultHrData } from './DeviceDefaults';

const MeasurementScreen: React.FC<{
    selectedDevice: Device | null; 
    setSelectedDevice: (device: Device | null) => void;
    setShowChooseDate: (show: boolean) => void;
}> = ({ selectedDevice, setSelectedDevice, setShowChooseDate }) => {

    const [currentMeasurementValues, setMeasurementValues] = useState<Array<any>>(selectedDevice?.hrValues || DefaultHrData);
    const [currentMeasurementDate, setMeasurementDate] = useState<string>(selectedDevice?.lastActive || '');

    const formatDate = (date: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;
    };

    const loadPastMeasurements = (links: Array<any>) => {
        console.log(`Loading past measurements from: ${links.length} entries`);
        setMeasurementValues(DefaultHrData);
        // TODO: also setMeasurementDate
    };

    return (
    <div className="measurement-screen">
      <div className="measurement-header">
        <button className="back-button" onClick={() => setSelectedDevice(null)}>
          ← Back
        </button>
        <div className="device-info">
          <h3>{selectedDevice?.id}</h3>
          <span>Kit: {selectedDevice?.kitId}</span>
          <span>Date: {currentMeasurementDate.length > 0 && formatDate(new Date(currentMeasurementDate))}</span>
        </div>
      </div>
      <div className="measurements-container">
        <h2>Measurements</h2>
        <div className="measurement-box">
          <div className="measurement-label">❤️ Heart Rate</div>
          <div className="measurement-value">
            <ResponsiveLine 
              data={[
                {
                  id: "heartRate_1",
                  data: currentMeasurementValues
                }
              ]}
              yScale={{ type: 'linear', min: 0, max: 'auto', stacked: true, reverse: false }}
              curve='natural'
              useMesh={true}
              margin={{ top: 10, right: 30, bottom: 30, left: 40 }}
              xScale={{ type: 'linear' }}
              axisBottom={{ legend: 'Time', legendOffset: 20, legendPosition: 'middle' }}
              axisLeft={{ legend: 'BPM', legendOffset: -30, legendPosition: 'middle' }}
              colors={{ scheme: 'nivo' }}
              lineWidth={3}
              pointSize={6}
              pointColor={{ theme: 'background' }}
            />
          </div>
        </div>
      </div>
      <div className="measurement-bottom">
        <button className="view-activity-button" onClick={() => {
          if (selectedDevice?.pastMeasurements && selectedDevice.pastMeasurements.length > 0) {
            // loadPastMeasurements(selectedDevice.pastMeasurements);
            setShowChooseDate(true);
          } else {
            alert('No detail URL available for this device.');
          }
        }}>
          View All Activity
        </button>
      </div>  
    </div>
  );
};

export default MeasurementScreen;