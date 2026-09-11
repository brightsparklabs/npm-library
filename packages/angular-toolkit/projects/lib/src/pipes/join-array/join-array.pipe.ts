/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

/**
 * Custom pipe for joining the values in an array with a specified separator.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <array> | joinArray: <separator> }}
 *
 * Example:
 *
 *   {{ usernames | joinArray: ", " }}
 * ```
 */
@Pipe({ name: "joinArray" })
export class JoinArrayPipe implements PipeTransform {
  /**
   * Checks if the value is an array.
   *
   * @param array The array to join.
   * @param separator The delimiter used to join the array.
   * @returns `true` if the value is an array.
   */
  transform<T>(array: Array<T>, separator: string): string {
    return array.join(separator);
  }
}
