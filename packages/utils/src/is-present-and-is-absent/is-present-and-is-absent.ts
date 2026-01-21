/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

// ---------------------------------------------------------------------------
// PUBLIC METHODS
// ---------------------------------------------------------------------------
  
/**
 * Returns `true` if the value is `null` or `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if the value is `null` or `undefined`, `false` otherwise.
 */
export function isAbsent<T>(value: T | null | undefined): value is undefined {
  return value === null || value === undefined;
}

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
  return isAbsent(value) || value === "" || 
  (value instanceof Array && value.length === 0);
}

/**
 * Returns `true` if the value is present, i.e. NOT `null` or `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if the value is NOT `null` or `undefined`, `false` otherwise.
 */
export function isPresent<T>(value: T | null | undefined): value is T {
  return !isAbsent(value);
}