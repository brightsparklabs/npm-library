/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

/**
 * Custom pipe for checking if a value is in an array.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <value> | inArray: <valueArray> }}
 *
 * Example:
 *
 *   {{ "Fred" | inArray: allowedUsers }}
 * ```
 */
@Pipe({ name: "inArray" })
export class InArrayPipe implements PipeTransform {
  /**
   * Checks if the value is in the given array.
   *
   * @param value The value to check.
   * @param valueArray The array to check against.
   * @returns `true` if the value is present in the array.
   */
  transform(value: unknown, valueArray: Array<unknown>): boolean {
    return valueArray.includes(value);
  }
}
