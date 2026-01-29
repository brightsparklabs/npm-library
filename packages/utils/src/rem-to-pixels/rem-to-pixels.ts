/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Converts a rem unit value into the equivalent number of pixels.
 *
 * @param rem The rem value to convert.
 * @returns The equivalent number of pixels for the rem unit.
 */
export function remToPixels(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
