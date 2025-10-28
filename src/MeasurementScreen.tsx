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
        return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const zone_data = [
      {zone: 1, range: '40 - 135 bpm', duration: 56},
      {zone: 2, range: '136 - 147 bpm', duration: 26},
      {zone: 3, range: '148 - 160 bpm', duration: 12},
      {zone: 4, range: '161 - 172 bpm', duration: 24},
      {zone: 5, range: '173 - 255 bpm', duration: 0},
    ];
    const zone_columns = [
      { header: 'Zone', accessorKey: 'zone' },
      { header: 'Duration', accessorKey: 'duration' },
      { header: 'Range', accessorKey: 'range' },
    ];

    const renderZoneTable = () => {
      const maxDuration = Math.max(...zone_data.map(item => item.duration));
      const getZoneColor = (zone: number) => {
        const colors = ['#3594c9', '#125e3f', '#e86422', '#8e3dc7', '#42a5f5'];
        return colors[zone - 1] || '#e3f2fd';
      };

      return (
        <table className="zone-table">
          <thead>
            <tr>
              {zone_columns.map((column) => (
                <th key={column.accessorKey}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {zone_data.map((row) => (
              <tr key={row.zone}>
                <td>{row.zone}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      style={{
                        display: 'inline-block',
                        height: '10px',
                        backgroundColor: getZoneColor(row.zone),
                        borderRadius: '3px',
                        width: maxDuration > 0 ? `${(row.duration / maxDuration) * 100}px` : '0px',
                        minWidth: row.duration > 0 ? '4px' : '0px'
                      }}
                    />
                    {row.duration}
                  </div>
                </td>
                <td>{row.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
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
        <h2>HR Measurements</h2>
        {currentDevice?.hrValues && currentDevice.hrValues.length > 0 ? (
          <div className="measurement-box">
            {/* <div className="measurement-label">❤️ Heart Rate</div> */}
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
            <div className="measurement-zones">
              {renderZoneTable()}
            </div>
          </div>
        ) : (
          <div className="measurement-box">
            <div className="no-measurements">
              No measurement data available
            </div>
          </div>
        )} 
      </div>
      <div className="measurement-bottom">
        {/* Show the button only if there are past measurements */}
        { selectedDevice?.pastMeasurements && selectedDevice.pastMeasurements.length > 1 && (
          <button className="view-activity-button" onClick={() => {
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