/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

/**
 * Custom pipe for converting a given array-like value to an array.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <value> | toArray }}
 *
 * Example:
 *
 *   {{ Set(["Foo", "Bar"]) | toArray }}
 * ```
 */
@Pipe({ name: "toArray" })
export class ToArrayPipe implements PipeTransform {
  /**
   * Converts the value to an array.
   *
   * @param value The value to convert.
   * @returns The value as an array.
   */
  transform<T>(value: Set<T> | Array<T> | ArrayLike<T>): Array<T> {
    return Array.from(value);
  }
}
