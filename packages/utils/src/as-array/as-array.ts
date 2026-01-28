/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isAbsent } from "../is-absent/is-absent";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Converts the value to an array.
 *
 * If the value is an object, it returns a single item array of containing that object.
 * If the value is an array, it returns that array verbatim.
 * If the value is null/undefined, it returns an empty array.
 *
 * @param value The object to wrap in an array.
 * @returns An array.
 */
  export function asArray<T>(value: T | Array<T>): Array<T> {
    if (isAbsent(value)) {
      return [];
    }
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }