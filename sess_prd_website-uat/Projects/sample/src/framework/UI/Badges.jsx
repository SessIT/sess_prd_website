import React from "react";

const CHAMBER_BADGES = [
  { name: "TEMO", shape: "circle", color: "#E24B4A", borderColor: "#E24B4A" },
  { name: "RH", shape: "circle", color: "#378ADD", borderColor: "#378ADD" },
  { name: "RAIN", shape: "circle", color: "#378ADD", borderColor: "#378ADD" },
//   { name: "Altitude", shape: "circle", color: "#7F77DD", borderColor: "#7F77DD" },
//   { name: "Pressure", shape: "circle", color: "#EF9F27", borderColor: "#EF9F27" },
//   { name: "Volt", shape: "diamond", color: "#EF9F27", borderColor: "#EF9F27" },
//   { name: "Vibration", shape: "double-circle", color: "#1D9E75", borderColor: "#1D9E75" },
//   { name: "UV Index", shape: "octagon", color: "#D85A30", borderColor: "#D85A30" },
//   { name: "Wind", shape: "parallelogram", color: "#5DCAA5", borderColor: "#5DCAA5" },
//   { name: "Thermal Cycle", shape: "double-circle", color: "#E24B4A", borderColor: "#378ADD" },
//   { name: "Dew Point", shape: "pentagon", color: "#1D9E75", borderColor: "#1D9E75" },
//   { name: "Fan RPM", shape: "square", color: "#7F77DD", borderColor: "#7F77DD" },
];

const BadgeSVG = ({ badge, isDark }) => {
  const stroke = isDark ? badge.borderColor : badge.borderColor;
  const fill = isDark ? `${badge.color}18` : `${badge.color}12`;
  const textColor = isDark ? "#fff" : "#000";
  const fontSize = badge.name.length > 9 ? "7" : "8";

  const commonText = (
    <text
      x="40" y="44"
      textAnchor="middle"
      dominantBaseline="central"
      fill={textColor}
      fontSize={fontSize}
      fontWeight="600"
      fontFamily="inherit"
      letterSpacing="0.5"
    >
      {badge.name}
    </text>
  );

  switch (badge.shape) {
    case "circle":
      return (
        <svg viewBox="0 0 80 56" width="160" height="136" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="28" r="24" fill={fill} stroke={stroke} strokeWidth="1.2"/>
          <text x="40" y="28" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="100" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    case "square":
      return (
        <svg viewBox="0 0 80 56" width="80" height="56" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="6" width="56" height="44" rx="4" fill={fill} stroke={stroke} strokeWidth="1.2"/>
          <text x="40" y="28" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="600" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    case "triangle":
      return (
        <svg viewBox="0 0 80 60" width="80" height="60" xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,4 76,56 4,56" fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round"/>
          <text x="40" y="42" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="600" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    case "diamond":
      return (
        <svg viewBox="0 0 80 64" width="80" height="64" xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,3 76,32 40,61 4,32" fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round"/>
          <text x="40" y="32" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="600" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    case "hexagon":
      return (
        <svg viewBox="0 0 80 64" width="80" height="64" xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,3 72,20 72,44 40,61 8,44 8,20" fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round"/>
          <text x="40" y="32" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="600" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    case "octagon":
      return (
        <svg viewBox="0 0 80 64" width="80" height="64" xmlns="http://www.w3.org/2000/svg">
          <polygon points="24,3 56,3 74,20 74,44 56,61 24,61 6,44 6,20" fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round"/>
          <text x="40" y="32" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="600" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    case "pentagon":
      return (
        <svg viewBox="0 0 80 64" width="80" height="64" xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,3 74,26 62,61 18,61 6,26" fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round"/>
          <text x="40" y="36" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="600" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    case "parallelogram":
      return (
        <svg viewBox="0 0 88 48" width="88" height="48" xmlns="http://www.w3.org/2000/svg">
          <polygon points="18,4 84,4 70,44 4,44" fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round"/>
          <text x="44" y="24" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="600" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    case "double-circle":
      return (
        <svg viewBox="0 0 80 56" width="180" height="156" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="28" r="26" fill={fill} stroke={badge.borderColor} strokeWidth="1.2"/>
          <circle cx="40" cy="28" r="19" fill="none" stroke={badge.color} strokeWidth="0.8" strokeDasharray="3 2"/>
          <text x="40" y="28" textAnchor="middle" dominantBaseline="central"
            fill={textColor} fontSize={fontSize} fontWeight="600" fontFamily="inherit" letterSpacing="0.5">
            {badge.name}
          </text>
        </svg>
      );

    default:
      return null;
  }
};

export default BadgeSVG;