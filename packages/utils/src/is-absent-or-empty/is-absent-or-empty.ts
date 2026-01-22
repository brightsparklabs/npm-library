/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isAbsent } from "../is-absent/is-absent";

// ------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// ------------------------------------------------------------------------------------------------

/**
 * Returns `true` if the value an empty string (`""`), empty array (`[]`),
 * `null` or `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if the value an empty string (`""`), empty array (`[]`),
 * `null` or `undefined`, `false` otherwise.
 */
export function isAbsentOrEmpty<T>(
  value: T | null | undefined | "" | [],
): value is null | undefined | "" | [] {
  return isAbsent(value) || value === "" || (value instanceof Array && value.length === 0);
}
