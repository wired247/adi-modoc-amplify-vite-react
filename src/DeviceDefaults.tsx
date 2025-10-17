import { Device } from './Modoc.types';

// Default device data for initial state or testing
const DeviceDefaults: Device[] = [
        {
          "id": "ADI_Nihanth_device",
          "kitId": "KIT001",
          "status": "disconnected",
          "heartRate": 82,
          "lastActive": "2025-04-04T09:12:13",
          "batteryLevel": 50,
          "detail": "https://d18xy4xgz3veo8.cloudfront.net/pub/ADI_Nihanth_device/",
          "zones": [
            { "order": 1, "minHR": 40, "maxHR": 135, "duration": 20, "color": "#00FF00" },
            { "order": 2, "minHR": 136, "maxHR": 147, "duration": 20, "color": "#FFFF00" },
            { "order": 3, "minHR": 161, "maxHR": 172, "duration": 30, "color": "#FFA500" },
            { "order": 4, "minHR": 136, "maxHR": 147, "duration": 20, "color": "#FF0000" },
            { "order": 5, "minHR": 40, "maxHR": 135, "duration": 30, "color": "#FF0000" }
          ]
        },
        {
          "id": "ADI_Samsung_SM-A146U1",
          "kitId": "KIT002",
          "status": "disconnected",
          "heartRate": 65,
          "lastActive": "2025-04-09T16:39:16",
          "batteryLevel": 50,
          "detail": "https://d18xy4xgz3veo8.cloudfront.net/pub/ADI_Samsung_SM-A146U1/",
          "zones": [
            { "order": 1, "minHR": 40, "maxHR": 135, "duration": 20, "color": "#00FF00" },
            { "order": 2, "minHR": 136, "maxHR": 147, "duration": 20, "color": "#FFFF00" },
            { "order": 3, "minHR": 161, "maxHR": 172, "duration": 30, "color": "#FFA500" },
            { "order": 4, "minHR": 136, "maxHR": 147, "duration": 20, "color": "#FF0000" },
            { "order": 5, "minHR": 40, "maxHR": 135, "duration": 30, "color": "#FF0000" }
          ]
        },
        {
          "id": "ADI_Subash_testing",
          "kitId": "KIT003",
          "status": "disconnected",
          "heartRate": 0,
          "lastActive": "2025-04-07T05:02:57",
          "batteryLevel": 80,
          "detail": "https://d18xy4xgz3veo8.cloudfront.net/pub/ADI_Subash_testing/",
          "zones": [
            { "order": 1, "minHR": 40, "maxHR": 135, "duration": 20, "color": "#00FF00" },
            { "order": 2, "minHR": 136, "maxHR": 147, "duration": 20, "color": "#FFFF00" },
            { "order": 3, "minHR": 161, "maxHR": 172, "duration": 30, "color": "#FFA500" },
            { "order": 4, "minHR": 136, "maxHR": 147, "duration": 20, "color": "#FF0000" },
            { "order": 5, "minHR": 40, "maxHR": 135, "duration": 30, "color": "#FF0000" }
          ]
        },
        {
          "id": "ADI_User1_test_device",
          "kitId": "KIT004",
          "status": "disconnected",
          "heartRate": 0,
          "lastActive": "2025-08-13T09:47:29",
          "batteryLevel": 40,
          "detail": "https://d18xy4xgz3veo8.cloudfront.net/pub/ADI_User1_test_device/",
          "zones": [
            { "order": 1, "minHR": 40, "maxHR": 135, "duration": 20, "color": "#00FF00" },
            { "order": 2, "minHR": 136, "maxHR": 147, "duration": 20, "color": "#FFFF00" },
            { "order": 3, "minHR": 161, "maxHR": 172, "duration": 30, "color": "#FFA500" },
            { "order": 4, "minHR": 136, "maxHR": 147, "duration": 20, "color": "#FF0000" },
            { "order": 5, "minHR": 40, "maxHR": 135, "duration": 30, "color": "#FF0000" }
          ]
        },
      ];

export default DeviceDefaults;
