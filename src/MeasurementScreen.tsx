import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Device } from './Modoc.types';

const MeasurementScreen: React.FC<{ 
    selectedDevice: Device | null; 
    setSelectedDevice: (device: Device | null) => void; 
}> = ({ selectedDevice, setSelectedDevice }) => {

    function openUrlInNewTab(detail: string) {
        window.open(detail, '_blank', 'noopener,noreferrer');
    }
    const hrData = [
      {
        id: "heartRate_1",
        data: [
            { x: 0, y: 88 },
            { x: 2, y: 90 },
            { x: 4, y: 93 },
            { x: 6, y: 94 },
            { x: 8, y: 95 },
            { x: 10, y: 98 },
            { x: 12, y: 102 },
            { x: 14, y: 103 },
            { x: 16, y: 102 },
            { x: 18, y: 101 },
            { x: 20, y: 98 },
            { x: 22, y: 96 },
            { x: 24, y: 93 },
            { x: 26, y: 90 },
            { x: 28, y: 90 },
            { x: 30, y: 90 },
            { x: 32, y: 90 },
            { x: 34, y: 90 },
            { x: 36, y: 91 },
            { x: 38, y: 92 },
            { x: 40, y: 91 },
            { x: 42, y: 90 },
            { x: 44, y: 90 },
            { x: 46, y: 92 },
            { x: 48, y: 96 },
            { x: 50, y: 102 },
            { x: 52, y: 106 },
            { x: 54, y: 104 },
            { x: 56, y: 102 },
            { x: 58, y: 99 },
            { x: 60, y: 97 },
            { x: 62, y: 96 },
            { x: 64, y: 96 },
            { x: 68, y: 96 },
            { x: 70, y: 96 },
            { x: 72, y: 94 },
            { x: 74, y: 96 },
            { x: 76, y: 95 },
            { x: 78, y: 94 },
            { x: 80, y: 94 },
            { x: 82, y: 92 },
            { x: 84, y: 94 },
            { x: 86, y: 97 },
            { x: 88, y: 96 },
            { x: 90, y: 92 },
            { x: 92, y: 82 },
            { x: 94, y: 77 },
            { x: 96, y: 74 },
            { x: 98, y: 73 },
            { x: 100, y: 77 },
            { x: 102, y: 82 },
            { x: 104, y: 88 },
            { x: 106, y: 91 },
            { x: 108, y: 92 },
            { x: 110, y: 95 },
            { x: 112, y: 94 },
            { x: 114, y: 90 },
            { x: 116, y: 88 },
            { x: 118, y: 88 },
            { x: 120, y: 89 },
            { x: 122, y: 91 },
            { x: 124, y: 92 },
            { x: 128, y: 91 }
        ]
      }
    ]

    return (
    <div className="measurement-screen">
      <div className="measurement-header">
        <button className="back-button" onClick={() => setSelectedDevice(null)}>
          ← Back
        </button>
        <div className="device-info">
          <h3>{selectedDevice?.id}</h3>
          <span>Kit: {selectedDevice?.kitId}</span>
          <span>Battery: {selectedDevice?.batteryLevel}%</span>
        </div>
      </div>
      <div className="measurements-container">
        <h2>Measurements</h2>
        <div className="measurement-box">
          <div className="measurement-label">❤️ Heart Rate</div>
          <div className="measurement-value">
            <ResponsiveLine 
              data={hrData}
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
          if (selectedDevice?.detail) {
            openUrlInNewTab(selectedDevice.detail);
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