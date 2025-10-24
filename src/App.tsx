import React, { useState, useRef, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut, getCurrentUser, fetchAuthSession, AuthUser } from 'aws-amplify/auth';
import { Device } from './Modoc.types.ts';
import { DefaultHrData, DeviceDefaults } from './DeviceDefaults.tsx';
import DashboardTable from './DashboardTable.tsx';
import DeviceProfileModal from './DeviceProfileModal.tsx';
import MeasurementScreen from './MeasurementScreen.tsx';
import PrescriptionModal from './PrescriptionModal.tsx';
import ChooseDateModal from './ChooseDateModal.tsx';
import AnalogDevicesLogo1 from "./AnalogDevicesLogo1";
import './App.css';

const MainApp: React.FC = () => {
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
  const [showPrescription, setShowPrescription] = useState(false);
  const [showChooseDate, setShowChooseDate] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authentication state
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authSession, setAuthSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // AWS endpoint URL
  // 'https://<api-id>.execute-api.<region>.amazonaws.com/<stage>/<resource>'
  const AWS_DEVICES_ENDPOINT = 'https://hwm6t7hyy1.execute-api.us-east-1.amazonaws.com/dev/dashboard-devices';
  // const AWS_DEVICES_ENDPOINT = 'https://x4oa3j9zc8.execute-api.us-east-1.amazonaws.com/test/dashboard-devices';

  useEffect(() => {
    fetchAuthInfo();
  }, []);

  // Fetch authentication information
  const fetchAuthInfo = async () => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      
      const [user, session] = await Promise.all([
        getCurrentUser(),
        fetchAuthSession(),
      ]);
      
      setAuthUser(user);
      setAuthSession(session);
      // console.log("ID token:", session.tokens?.idToken?.toString());
      fetchDevices(session);

    } catch (error) {
      console.error('Error fetching auth info:', error);
      setAuthError(error instanceof Error ? error.message : 'Unknown auth error');
    } finally {
      setAuthLoading(false);
    }
  };

  const userIsAdmin = (): boolean => {
    // Check if the authenticated user is admin
    // TODO: use group membership or claim in ID token?
    if (!authUser) return false;
    // DcsSandboxUserPool Admin UserId
    if (authUser.userId == "8428b468-5091-7062-e9ae-79f76c9d9ebc") return true;
    // amplifyAuthUserPool4BA7F805-z883FV3anyA7 User pool
    if (authUser.userId == "d4682488-e061-70ca-360b-43a982545222") return true;
    return false;
  }

  const fetchDevices = async (session: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // Try CORS first, fallback to no-cors if needed
      let response;
      if (session != null && session.tokens != null) {
        try {
          response = await fetch(AWS_DEVICES_ENDPOINT, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Authorization': `Bearer ${session.tokens?.idToken?.toString()}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            credentials: 'omit'
          });
        } catch (corsError) {
          console.warn('CORS request failed, trying no-cors mode:', corsError);
          // Fallback to no-cors mode (won't be able to read response body?)
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
      } else {
        console.error('missing authSession tokens', authSession);
        throw new Error('Missing header for fetchDevices()');
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
      setDevices(DeviceDefaults);
    } finally {
      setLoading(false);
    }
  };

  const fetchOneDeviceValues = async (session: any, deviceId: string, s3Path: string) => {
    try {
      // setLoading(true);
      // setError(null);

      if (session != null && session.tokens != null) {
        const response = await fetch(`${AWS_DEVICES_ENDPOINT}/${deviceId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.tokens?.idToken?.toString()}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'omit',
          body: JSON.stringify({ "s3Key": s3Path, "uploadDate": "2024-10-24 12:32" })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch device: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setDeviceProfile(data);
      } else {
        console.error('missing authSession tokens', authSession);
        throw new Error('Missing header for fetchOneDeviceValues()');
      }
    } catch (err) {
      // const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      // setError(errorMessage);
      console.error('Error fetching device values:', err);
    } finally {
      // setLoading(false);
    }
};

  const handleAddDevice = async () => {
    if (newDevice.kitId && newDevice.deviceId) {
      const device: Device = {
        id: newDevice.deviceId,
        kitId: newDevice.kitId,
        status: 'disconnected',
        heartRate: 0,
        lastActive: new Date().toISOString(),
        batteryLevel: 100,
        detail: '',
        zones: [],
        hrValues: [],
        pastMeasurements: []
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

  const renderDashboard = () => (
    <div className="dashboard-view">
      <h2>Device Dashboard</h2>
      
      {/* Amplify Authentication Information Display */}
      {authLoading || authError && (
        <div className="auth-info">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
            {authLoading && (
              <div><strong>Loading...</strong></div>
            )}
            {authError && (
              <div style={{ color: '#dc3545' }}><strong>Auth Error:</strong> {authError}</div>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <div className="error-message-outlined">
          <strong>Error loading devices:</strong> {error}
          <button 
            onClick={() => fetchDevices(authSession)} 
            className="auth-retry"
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
        <DashboardTable 
          devices={devices} 
          setSelectedDevice={setSelectedDevice }
          setDeviceProfile={ setDeviceProfile }
          setShowDeviceProfile={ setShowDeviceProfile }
          setShowPrescription={ setShowPrescription }
        />
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
    <MeasurementScreen 
      selectedDevice={selectedDevice} 
      setSelectedDevice={setSelectedDevice}
      setShowChooseDate={setShowChooseDate}
    />
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

          {/* Admin-only links, check currentUser */}
          {userIsAdmin() && (
            <div>
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
            </div>
          )}

          <button
            className="nav-item sign-out"
            onClick={() => signOut()}
            style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.2)' }}
          >
            <span className="icon">🚪</span>
            {!isCollapsed && <span>Sign Out</span>}
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

      {showChooseDate && (
        <div className="modal-overlay">
          <ChooseDateModal
            deviceProfile={selectedDevice}
            setShowChooseDate={setShowChooseDate}
            handleChooseDate={(date: string, key: string) => {
              console.log(`Chose S3 ${date} key: ${key}`);
              fetchOneDeviceValues(authSession, 'user1', key)
              console.log("updated profile after fetchOneDeviceValues()?")
              console.log(deviceProfile)
              selectedDevice && setSelectedDevice({ ...selectedDevice, hrValues: DefaultHrData });
              setShowChooseDate(false);
            }}
          />
        </div>
      )}

      {showDeviceProfile && (
        <div className="modal-overlay">
          <DeviceProfileModal
            deviceProfile={deviceProfile}
            setDeviceProfile={setDeviceProfile}
            setShowDeviceProfile={setShowDeviceProfile}
            handleUpdateProfile={handleUpdateProfile}
          />
        </div>
      )}

      {showPrescription && (
        <div className="modal-overlay">
          <PrescriptionModal
            deviceProfile={deviceProfile}
            isOpen={showPrescription}
            onClose={() => setShowPrescription(false)}
            onSave={(prescriptionData) => {
              console.log('Prescription saved:', prescriptionData);
              setShowPrescription(false);
            }}
          />
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

// use <Authenticator hideSignUp> to disable sign up option
const App: React.FC = () => {
  return (
    <Authenticator hideSignUp>
      <MainApp />
    </Authenticator>
  );
};

export default App;
