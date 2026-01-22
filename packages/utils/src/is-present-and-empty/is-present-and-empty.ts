/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isPresentAndNonEmpty } from "../is-present-and-non-empty/is-present-and-non-empty";
import { isPresent } from "../is-present/is-present";

// ------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// ------------------------------------------------------------------------------------------------

/**
 * Returns `true` if the value is present and does NOT have a value,
 * i.e. `""`, `[]`.
 *
 * NOTE: Other types will return `true` e.g. A `number`, class or object irregardless.
 *
 * @param value The value to check.
 * @returns `true` if the value is `""` or `[]`, `false` otherwise.
 */
export function isPresentAndEmpty<T>(value: [] | "" | null | undefined | T): value is [] | "" {
  return isPresent(value) && !isPresentAndNonEmpty(value);
}
