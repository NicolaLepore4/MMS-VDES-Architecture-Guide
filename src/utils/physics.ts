// Physics constants for LEO (approximate)
export const ALTITUDE_KM = 600;
export const EARTH_RADIUS_KM = 6371;
export const ORBITAL_RADIUS_KM = EARTH_RADIUS_KM + ALTITUDE_KM;
export const SATELLITE_VELOCITY_KMS = 7.5; // ~7.5 km/s for LEO
export const CARRIER_FREQ_MHZ = 162.0; // VHF VDES
export const SPEED_OF_LIGHT_KMS = 299792.458;

/**
 * Calculates slant range based on pass progress (0 to 1)
 */
export const calculateSlantRange = (progress: number): number => {
  const angleRad = (progress - 0.5) * Math.PI * 0.8;
  return Math.sqrt(
    Math.pow(EARTH_RADIUS_KM, 2) + 
    Math.pow(ORBITAL_RADIUS_KM, 2) - 
    2 * EARTH_RADIUS_KM * ORBITAL_RADIUS_KM * Math.cos(angleRad * 0.1)
  );
};

/**
 * Calculates Doppler shift in Hz
 */
export const calculateDopplerShift = (progress: number): number => {
  const angleRad = (progress - 0.5) * Math.PI * 0.8;
  const radialVelocity = SATELLITE_VELOCITY_KMS * Math.sin(-angleRad);
  return (radialVelocity / SPEED_OF_LIGHT_KMS) * CARRIER_FREQ_MHZ * 1000000;
};

/**
 * Calculates elevation angle in degrees
 */
export const calculateElevationAngle = (progress: number): number => {
  // Simplified calculation for visualization
  const angleRad = (progress - 0.5) * Math.PI * 0.8;
  return Math.abs(Math.cos(angleRad) * 90);
};
