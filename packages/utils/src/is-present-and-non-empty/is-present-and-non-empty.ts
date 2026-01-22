/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isAbsentOrEmpty } from "../is-absent-or-empty/is-absent-or-empty";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Returns `true` if the value is present, i.e. NOT `null` or `undefined`,
 * and has a value, i.e. NOT `""`.
 *
 * @param value The value to check.
 * @returns `true` if the value is NOT an empty string (`""`),
 * `null` or `undefined`, `false` otherwise.
 */
export function isPresentAndNonEmpty<T>(value: T | null | undefined | ""): value is T {
  return !isAbsentOrEmpty(value);
}
