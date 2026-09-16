/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

import { isPresentAndNonEmpty } from "@brightsparklabs/utils";

/**
 * Custom pipe for checking that a given value is not `null`, `undefined`, an empty string, or an
 * empty array.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <value> | hasValue }}
 *
 * Example:
 *
 *   {{ heading | hasValue }}
 * ```
 * @deprecated In `OnPush` templates use the `@brightsparklabs/utils` `isPresentAndNonEmpty`
 * directly.
 */
@Pipe({ name: "hasValue" })
export class HasValuePipe implements PipeTransform {
  /**
   * Returns `true` if the value isn't empty, i.e. NOT `null`, `undefined`, an empty string, or an
   * empty array.
   *
   * @param value The value to check.
   * @returns `true` if the value is NOT `null`, `undefined`,an empty string, or an empty array.
   */
  transform<T>(value: T | undefined | null): value is T {
    return isPresentAndNonEmpty(value);
  }
}
