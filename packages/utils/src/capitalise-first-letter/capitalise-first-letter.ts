/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Capitalises the first letter of a string.
 *
 * @param inputString The string to capitalise.
 * @returns The formatted string.
 */
export function capitaliseFirstLetter(inputString: string): string {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
