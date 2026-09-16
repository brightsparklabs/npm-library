/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */
import { Pipe, PipeTransform } from "@angular/core";

/**
 * Custom pipe for checking that a given value is not `null`, `undefined` or an empty string.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <set> | has: <value> }}
 *
 * Example:
 *
 *   {{ validValues | has: someValue }}
 * ```
 */
@Pipe({ name: "has" })
export class HasPipe implements PipeTransform {
  /**
   * Checks whether the given `Set` contains the specified value.
   *
   * @param set The `Set` to check for membership. If `null` or `undefined`, `false` is returned.
   * @param value The value to look for within the `set`.
   * @returns `true` if the `set` is present and contains the `value`, otherwise `false`.
   */
  transform(set: Set<unknown>, value: unknown): boolean {
    return set?.has(value) ?? false;
  }
}
