// Physics constants for LEO (ITU-R M.2092 compliant)
export const ALTITUDE_KM = 600;
export const EARTH_RADIUS_KM = 6371;
export const ORBITAL_RADIUS_KM = EARTH_RADIUS_KM + ALTITUDE_KM;
export const SATELLITE_VELOCITY_KMS = 7.5; // ~7.5 km/s for LEO
export const CARRIER_FREQ_MHZ = 162.0; // VHF VDES
export const SPEED_OF_LIGHT_KMS = 299792.458;

// Maximum Earth central angle to horizon (radians)
const THETA_MAX_RAD = Math.acos(EARTH_RADIUS_KM / ORBITAL_RADIUS_KM);

/**
 * Central angle (rad) for a given pass progress (0 = horizon start, 0.5 = zenith, 1 = horizon end)
 */
const centralAngle = (progress: number): number => (progress - 0.5) * 2 * THETA_MAX_RAD;

/**
 * Calculates slant range based on pass progress using law of cosines
 */
export const calculateSlantRange = (progress: number): number => {
  const theta = centralAngle(progress);
  return Math.sqrt(
    Math.pow(EARTH_RADIUS_KM, 2) +
      Math.pow(ORBITAL_RADIUS_KM, 2) -
      2 * EARTH_RADIUS_KM * ORBITAL_RADIUS_KM * Math.cos(theta)
  );
};

/**
 * Calculates Doppler shift in Hz using radial velocity component
 * Δf = - (v_rad / c) * f
 */
export const calculateDopplerShift = (progress: number): number => {
  const theta = centralAngle(progress);
  const d = calculateSlantRange(progress);
  const sinTheta = Math.sin(theta);
  // Radial velocity: positive when receding (distance increasing)
  const vRad = (SATELLITE_VELOCITY_KMS * EARTH_RADIUS_KM * sinTheta) / d;
  return -(vRad / SPEED_OF_LIGHT_KMS) * CARRIER_FREQ_MHZ * 1e6;
};

/**
 * Calculates elevation angle in degrees from observer's perspective
 */
export const calculateElevationAngle = (progress: number): number => {
  const theta = centralAngle(progress);
  const Rs = ORBITAL_RADIUS_KM;
  const Re = EARTH_RADIUS_KM;
  const dx = Rs * Math.cos(theta) - Re; // vertical component (up)
  const dy = Rs * Math.sin(theta); // horizontal component
  const horiz = Math.abs(dy);
  if (horiz < 1e-9) return 90;
  return Math.atan2(dx, horiz) * (180 / Math.PI);
};
