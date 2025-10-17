import React from "react";

// This component is based on the official Analog Devices full-color logo SVG
const AnalogDevicesLogo1: React.FC<{ width?: number; height?: number }> = ({ width = 120, height = 40 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 400 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Triangle (blue) */}
    <rect x="10" y="10" width="70" height="70" fill="#004985" />
    <polygon points="20,10 70,40 20,70" fill="#fff" />
    {/* Text: ANALOG DEVICES (black) */}
    <text x="90" y="55" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="40" fill="#004985">
      ANALOG
    </text>
    <text x="90" y="100" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="40" fill="#004985">
      DEVICES
    </text>
  </svg>
);

export default AnalogDevicesLogo1;
