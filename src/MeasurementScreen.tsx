import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Device } from './Modoc.types';
import { DefaultHrData } from './DeviceDefaults';

const MeasurementScreen: React.FC<{
    selectedDevice: Device | null; 
    setSelectedDevice: (device: Device | null) => void;
    setShowChooseDate: (show: boolean) => void;
}> = ({ selectedDevice, setSelectedDevice, setShowChooseDate }) => {

    const [currentDevice, setCurrentDevice] = useState<Device | null>(selectedDevice);
    const [currentMeasurementValues, setMeasurementValues] = useState<Array<any>>(currentDevice?.hrValues || DefaultHrData);
    const [currentMeasurementDate, setMeasurementDate] = useState<string>(currentDevice?.lastActive || '');

    // Update local state when selectedDevice changes
    useEffect(() => {
        setCurrentDevice(selectedDevice);
        setMeasurementValues(selectedDevice?.hrValues || DefaultHrData);
        setMeasurementDate(selectedDevice?.lastActive || '');
    }, [selectedDevice]);

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
          <h3>{currentDevice?.id}</h3>
          <span>Kit: {currentDevice?.kitId}</span>
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
        {/* Show the button only if there are past measurements */}
        { selectedDevice?.pastMeasurements && selectedDevice.pastMeasurements.length > 1 && (
          <button className="view-activity-button" onClick={() => {
            // loadPastMeasurements(selectedDevice.pastMeasurements);
            setShowChooseDate(true);
          }}>
          View All Activity
        </button>
        )}
      </div>
    </div>
  );
};

export default MeasurementScreen;