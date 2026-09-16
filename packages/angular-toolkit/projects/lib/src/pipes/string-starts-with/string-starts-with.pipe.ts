/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

/**
 * Custom pipe for checking that a given string starts with a substring.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <string> | startsWith: <substring> }}
 *
 * Example:
 *
 *   {{ "fooBar" | startsWith: "foo" }}
 * ```
 */
@Pipe({ name: "startsWith" })
export class StartsWithPipe implements PipeTransform {
  /**
   * Returns `true` if the string starts with the substring.
   *
   * @param value The string to check.
   * @param substring The string to check against.
   * @returns `true` if the string starts with the substring.
   */
  transform(value: string, substring: string): boolean {
    return value?.startsWith(substring);
  }
}
