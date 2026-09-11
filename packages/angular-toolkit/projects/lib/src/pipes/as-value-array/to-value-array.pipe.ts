/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

/**
 * Custom pipe for converting a given object to an array of its values.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <value> | toValueArray }}
 *
 * Example:
 *
 *   {{ {"foo": "bar", "fizz": "buzz"} | toArray }} => ["bar, "buzz"]
 * ```
 */
@Pipe({ name: "toValueArray" })
export class ToValueArrayPipe implements PipeTransform {
  /**
   * Converts the value to an array.
   *
   * @param value The value to convert.
   * @returns The value as an array.
   */
  transform<T>(value: Record<string, T>): Array<T> {
    return Object.values(value);
  }
}
