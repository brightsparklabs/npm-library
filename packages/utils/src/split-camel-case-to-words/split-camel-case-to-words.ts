/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { capitalCase } from "change-case";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Converts a CamelCase string to split case. E.g. `theCamelCaseString` -> `The Camel Case String`.
 * NOTE: The first letter will get capitalised.
 *
 * @param camelCaseString The CamelCase string.
 * @returns The formatted string.
 */
export function splitCamelCaseToWords(camelCaseString: string): string {
  return capitalCase(camelCaseString);
}
