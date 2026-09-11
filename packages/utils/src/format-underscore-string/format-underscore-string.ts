/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { startCase } from "lodash-es";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Converts an UNDERSCORE_STRING to split case E.g. UNDERSCORE_STRING -> Underscore String.
 * NOTE: The result will be Title Case.
 *
 * @param underscoreString The UNDERSCORE_STRING.
 * @returns The formatted string.
 */
export function formatUnderscoreString(underscoreString: string): string {
  return startCase(underscoreString?.toLowerCase());
}
