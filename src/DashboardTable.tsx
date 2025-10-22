import React from "react";

import { Device } from "./Modoc.types";

const DashboardTable: React.FC<{
  devices: Device[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<Device | null>>;
  setDeviceProfile: React.Dispatch<React.SetStateAction<Device | null>>;
  setShowDeviceProfile: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ devices, setSelectedDevice, setDeviceProfile, setShowDeviceProfile }) => {

    const formatDate = (date: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;
    };

  return (
    <table className="device-table">
          <thead>
            <tr>
              <th>Kit</th>
              <th>User ID</th>
              {/* <th>Status</th> */}
              <th>Avg. Heart Rate</th>
              <th>Last Active</th>
              {/* <th>Battery Level</th> */}
              <th>Thresholds</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>
            {devices.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  No devices found
                </td>
              </tr>
            ) : (
              devices.map(device => (
                <tr key={device.id}>
                  <td>{device.kitId}</td>
                  <td>
                    <button className="device-link" onClick={() => setSelectedDevice(device)}>
                      {device.id}
                    </button>
                  </td>
                  {/*}
                  <td>
                    <div className="status-container">
                      <span className={`status-led ${device.status}`}></span>
                      <span>{device.status}</span>
                    </div>
                  </td>
                  */}
                  <td>{device.heartRate} bpm</td>
                  <td>{formatDate(new Date(device.lastActive))}</td>
                  {/*}
                  <td>{device.batteryLevel}%</td>
                  */}
                  <td>
                    <button className="device-profile" onClick={() => {
                      setDeviceProfile(device);
                      setShowDeviceProfile(true);
                    }}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button className="device-profile" onClick={() => { 
                      setDeviceProfile(device); 
                      setShowDeviceProfile(true);
                    }}>
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
  )};

  export default DashboardTable;