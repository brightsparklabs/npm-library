/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

import { isPresent } from "@brightsparklabs/utils";

/**
 * Custom pipe for checking that a given value is not `null`, `undefined` or an empty string.
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
 */
@Pipe({ name: "hasValue" })
export class HasValuePipe implements PipeTransform {
  /**
   * Returns `true` if the value isn't empty, i.e. NOT `null`, `undefined`, or an empty string.
   *
   * @param value The value to check.
   * @returns `true` if the value is NOT `null`, `undefined`, or an empty string.
   */
  transform<T>(value: T | undefined | null): value is T {
    return isPresent(value) && value !== "";
  }
}
