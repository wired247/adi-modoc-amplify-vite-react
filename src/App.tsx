import React, { useState, useRef, useEffect } from 'react';
import AnalogDevicesLogo1 from "./AnalogDevicesLogo1";
import './App.css';

interface Device {
  id: string;
  kitId: string;
  status: 'active' | 'standby' | 'disconnected';
  heartRate: number;
  lastActive: string;
  batteryLevel: number;
  detail: string;
  minHR: number;
  maxHR: number;
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'devices' | 'administration'>('dashboard');
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showDeleteDevice, setShowDeleteDevice] = useState(false);
  const [newDevice, setNewDevice] = useState({ kitId: '', deviceId: '' });
  const [selectedForDeletion, setSelectedForDeletion] = useState<string[]>([]);
  const [deviceProfile, setDeviceProfile] = useState<Device | null>(null);
  const [showDeviceProfile, setShowDeviceProfile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;
  };

  // AWS endpoint URL
  // 'https://<api-id>.execute-api.<region>.amazonaws.com/<stage>/<resource>'
  const AWS_DEVICES_ENDPOINT = 'https://hwm6t7hyy1.execute-api.us-east-1.amazonaws.com/dev/dashboard-devices';

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try CORS first, fallback to no-cors if needed
      let response;
      try {
        response = await fetch(AWS_DEVICES_ENDPOINT, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'omit'
        });
      } catch (corsError) {
        console.warn('CORS request failed, trying no-cors mode:', corsError);
        // Fallback to no-cors mode (won't be able to read response body)
        response = await fetch(AWS_DEVICES_ENDPOINT, {
          method: 'GET',
          mode: 'no-cors'
        });
      }
      
      // For no-cors mode, we can't check response.ok or read JSON
      if (response.type === 'opaque') {
        console.info('Received opaque response (no-cors mode), using fallback data');
        throw new Error('CORS configuration needed on server');
      }
      
      if (!response.ok) {
        throw new Error(`Failed to fetch devices: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate that the response has the expected structure
      if (Array.isArray(data)) {
        setDevices(data);
      } else if (data.devices && Array.isArray(data.devices)) {
        setDevices(data.devices);
      } else {
        throw new Error('Invalid response format: expected array of devices');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      // Provide specific guidance for CORS errors
      if (errorMessage.includes('CORS') || errorMessage.includes('blocked')) {
        setError('CORS Error, using fallback data');
      } else {
        setError(errorMessage);
      }
      console.error('Error fetching devices:', err);
      
      // Fallback to hardcoded data in case of error
      setDevices([
        {
          "id": "ADI_Nihanth_device",
          "kitId": "KIT001",
          "status": "disconnected",
          "heartRate": 82,
          "lastActive": "2025-04-04T09:12:13",
          "batteryLevel": 50,
          "detail": "https://d18xy4xgz3veo8.cloudfront.net/pub/ADI_Nihanth_device/",
          "minHR": 78,
          "maxHR": 120
        },
        {
          "id": "ADI_Samsung_SM-A146U1",
          "kitId": "KIT002",
          "status": "disconnected",
          "heartRate": 65,
          "lastActive": "2025-04-09T16:39:16",
          "batteryLevel": 50,
          "detail": "https://d18xy4xgz3veo8.cloudfront.net/pub/ADI_Samsung_SM-A146U1/",
          "minHR": 65,
          "maxHR": 110
        },
        {
          "id": "ADI_Subash_testing",
          "kitId": "KIT003",
          "status": "disconnected",
          "heartRate": 0,
          "lastActive": "2025-04-07T05:02:57",
          "batteryLevel": 80,
          "detail": "https://d18xy4xgz3veo8.cloudfront.net/pub/ADI_Subash_testing/",
          "minHR": 78,
          "maxHR": 115
        },
        {
          "id": "ADI_User1_test_device",
          "kitId": "KIT004",
          "status": "disconnected",
          "heartRate": 0,
          "lastActive": "2025-08-13T09:47:29",
          "batteryLevel": 40,
          "detail": "https://d18xy4xgz3veo8.cloudfront.net/pub/ADI_User1_test_device/",
          "minHR": 68,
          "maxHR": 100
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleAddDevice = async () => {
    if (newDevice.kitId && newDevice.deviceId) {
      const device: Device = {
        id: newDevice.deviceId,
        kitId: newDevice.kitId,
        status: 'disconnected',
        heartRate: 0,
        lastActive: new Date().toISOString(),
        batteryLevel: 100,
        detail: ''
      };

      try {
        // Optimistically update the UI
        setDevices([...devices, device]);
        setNewDevice({ kitId: '', deviceId: '' });
        setShowAddDevice(false);

        // Try to sync with server (optional - remove if no POST endpoint)
        // await fetch(AWS_DEVICES_ENDPOINT, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(device)
        // });
        
      } catch (error) {
        console.error('Error adding device to server:', error);
        // Could show a notification here that local add succeeded but sync failed
      }
    }
  };

  const handleDeleteDevices = () => {
    setDevices(devices.filter(d => !selectedForDeletion.includes(d.id)));
    setSelectedForDeletion([]);
    setShowDeleteDevice(false);
  };

  const handleUpdateProfile = async () => {
    if (deviceProfile) {
      const deviceId = deviceProfile.id
      let response;
      try {
        // update local state
        setDevices(devices.map(d => d.id === deviceId ? deviceProfile : d));
        setShowDeviceProfile(false);

        // update device shadow on the server
        response = await fetch(`${AWS_DEVICES_ENDPOINT}/${deviceId}`, {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(deviceProfile)
        });

        if (!response.ok) {
          console.error(`Failed to fetch devices: ${response.status} ${response.statusText}`, response);
        }
      
        const message = await response.json();
        console.log("profile updated:")
        console.log(message)

      } catch (error) {
        console.error('Error updating device profile:', error);
      }
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const openUrlInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderDashboard = () => (
    <div className="dashboard-view">
      <h2>Device Dashboard</h2>
      
      {error && (
        <div className="error-message" style={{ 
          backgroundColor: '#fee', 
          color: '#c00', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          border: '1px solid #fcc'
        }}>
          <strong>Error loading devices:</strong> {error}
          <button 
            onClick={fetchDevices} 
            style={{ 
              marginLeft: '10px', 
              padding: '5px 10px', 
              backgroundColor: '#004985', 
              color: 'white', 
              border: 'none', 
              borderRadius: '3px', 
              cursor: 'pointer' 
            }}
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-message" style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#666' 
        }}>
          Loading devices...
        </div>
      ) : (
        <table className="device-table">
          <thead>
            <tr>
              <th>Device ID</th>
              {/* <th>Status</th> */}
              <th>Heart Rate</th>
              <th>Last Active</th>
              <th>Battery Level</th>
              <th>Activities</th>
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
                  <td>{device.batteryLevel}%</td>
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
      )}
    </div>
  );

  const renderDevices = () => (
    <div className="devices-view">
      <h2>Device Operations</h2>
      <div className="operation-tiles">
        <div className="operation-tile device-action" onClick={() => setShowAddDevice(true)}>
          <h3>Add Device</h3>
          <p>Register a new device</p>
        </div>
      </div>
    </div>
  );

  const renderAdministration = () => (
    <div className="administration-view">
      <h2>Administration</h2>
      <div className="operation-tiles">
        <div className="operation-tile upload-profile" onClick={handleFileUpload}>
          <h3>Upload Profile</h3>
          <p>Upload patient profile data</p>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              console.log('File selected:', e.target.files?.[0]);
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderMeasurementScreen = () => (
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

  return (
    <div className="app">
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}> 
        <div className="logo-container">
          <AnalogDevicesLogo1 width={isCollapsed ? 40 : 120} height={40} />
        </div>
        <button className="collapse-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '→' : '←'}
        </button>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveView('dashboard'); setSelectedDevice(null); }}
          >
            <span className="icon">📊</span>
            {!isCollapsed && <span>Dashboard</span>}
          </button>
          <button
            className={`nav-item ${activeView === 'devices' ? 'active' : ''}`}
            onClick={() => { setActiveView('devices'); setSelectedDevice(null); }}
          >
            <span className="icon">📱</span>
            {!isCollapsed && <span>Devices</span>}
          </button>
          <button
            className={`nav-item ${activeView === 'administration' ? 'active' : ''}`}
            onClick={() => { setActiveView('administration'); setSelectedDevice(null); }}
          >
            <span className="icon">⚙️</span>
            {!isCollapsed && <span>Administration</span>}
          </button>
        </nav>
      </div>

      <div className="main-content">
        {selectedDevice ? (
          renderMeasurementScreen()
        ) :(
          <>
            {activeView === 'dashboard' && renderDashboard()}
            {activeView === 'devices' && renderDevices()}
            {activeView === 'administration' && renderAdministration()}
          </>
        )}
      </div>

      {showDeviceProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Profile for {deviceProfile?.id}</h3>
              {deviceProfile ? (
                <div className="profile-details">
                  <div className="form-group">
                    <label>Kit ID:</label>
                    <input
                      type="text"
                      value={deviceProfile.kitId}
                      onChange={(e) => setDeviceProfile({ ...deviceProfile, kitId: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Min HR:</label>
                    <input
                      type="text"
                      value={deviceProfile.minHR}
                      onChange={(e) => setDeviceProfile({ ...deviceProfile, minHR: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Max HR:</label>
                    <input
                      type="text"
                      value={deviceProfile.maxHR}
                      onChange={(e) => setDeviceProfile({ ...deviceProfile, maxHR: Number(e.target.value) })}
                    />
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
                <div className="error-message" style={{
                  backgroundColor: '#fee',
                  color: '#c00',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '20px',
                  border: '1px solid #fcc'
                }}>
                  <strong>No device profile selected.</strong>
                </div>
              )}
            <div className="modal-buttons">
              <button onClick={handleUpdateProfile}>Submit</button>
              <button onClick={() => setShowDeviceProfile(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showAddDevice && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Device</h3>
            <div className="form-group">
              <label>Kit ID:</label>
              <input
                type="text"
                value={newDevice.kitId}
                onChange={(e) => setNewDevice({ ...newDevice, kitId: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Device ID:</label>
              <input
                type="text"
                value={newDevice.deviceId}
                onChange={(e) => setNewDevice({ ...newDevice, deviceId: e.target.value })}
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleAddDevice}>Submit</button>
              <button onClick={() => setShowAddDevice(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteDevice && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Devices</h3>
            <div className="device-list">
              {devices.map(device => (
                <label key={device.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedForDeletion.includes(device.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedForDeletion([...selectedForDeletion, device.id]);
                      } else {
                        setSelectedForDeletion(selectedForDeletion.filter(id => id !== device.id));
                      }
                    }}
                  />
                  {device.id}
                </label>
              ))}
            </div>
            <div className="modal-buttons">
              <button onClick={handleDeleteDevices}>Delete Selected</button>
              <button onClick={() => { setShowDeleteDevice(false); setSelectedForDeletion([]); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
