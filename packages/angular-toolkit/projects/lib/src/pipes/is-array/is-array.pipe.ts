/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

import { isArray } from "lodash-es";

/**
 * Custom pipe for checking if a value is in an array.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <value> | isArray }}
 *
 * Example:
 *
 *   {{ "Fred" | isArray }}
 * ```
 */
@Pipe({ name: "isArray" })
export class IsArrayPipe implements PipeTransform {
  /**
   * Checks if the value is an array.
   *
   * @param value The value to check.
   * @returns `true` if the value is an array.
   */
  transform<T>(value: T | Array<T>): value is Array<T> {
    return isArray(value);
  }
}
