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
  pastMeasurements: { date: string; key: string; }[];
  targets: { zone: string, duration: number }[];
}

export interface HrZone {
  order: number
  minHR: number;
  maxHR: number;
  color: string;    // hex color code
}

export interface Kit {
  id: string;
  owner: string;
  device: Device | null;
}

export enum zoneChoice {
  Zone1 = "Zone 1",
  Zone2 = "Zone 2",
  Zone3 = "Zone 3",
  Zone4 = "Zone 4",
  Zone5 = "Zone 5"
}
