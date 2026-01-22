/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

// ------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// ------------------------------------------------------------------------------------------------

/**
 * Returns `true` if the value is `null` or `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if the value is `null` or `undefined`, `false` otherwise.
 */
export function isAbsent<T>(value: T | null | undefined): value is undefined {
  return value === null || value === undefined;
}
