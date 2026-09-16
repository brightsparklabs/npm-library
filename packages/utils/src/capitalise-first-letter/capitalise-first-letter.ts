/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isAbsent } from "../is-absent/is-absent";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Capitalises the first letter of a string.
 *
 * If the string is `null` or `undefined` and empty string is returned instead.
 *
 * @param inputString The string to capitalise.
 * @returns The formatted string.
 */
export function capitaliseFirstLetter(inputString: string): string {
  if (isAbsent(inputString)) {
    return "";
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
