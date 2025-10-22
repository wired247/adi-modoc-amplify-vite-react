export interface Device {
  id: string;
  kitId: string;
  status: 'active' | 'standby' | 'disconnected';
  heartRate: number;
  lastActive: string;
  batteryLevel: number;
  detail: string;
  zones: HrZone[];
  hrValues: { x: number; y: number }[];
}

export interface HrZone {
  order: number
  minHR: number;
  maxHR: number;
  duration: number; // in seconds
  color: string;    // hex color code
}

export interface Kit {
  id: string;
  owner: string;
  device: Device | null;
}
