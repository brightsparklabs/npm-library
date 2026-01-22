/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isAbsent } from "../is-absent/is-absent";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if the value is present, i.e. NOT `null` or `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if the value is NOT `null` or `undefined`, `false` otherwise.
 */
export function isPresent<T>(value: T | null | undefined): value is T {
  return !isAbsent(value);
}
