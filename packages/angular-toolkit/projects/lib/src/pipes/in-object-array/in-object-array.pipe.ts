/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

import { isEqual } from "lodash-es";

/**
 * Custom pipe for checking if a value is in an array of objects
 * using deep comparison.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <object> | inObjectArray: <objectArray> }}
 *
 * Example:
 *
 *   {{ { name: "Fred", id: 13 } | inObjectArray: allowedUsers }}
 * ```
 */
@Pipe({ name: "inObjectArray" })
export class InObjectArrayPipe implements PipeTransform {
  /**
   * Checks if the value is in the given array.
   *
   * @param object The object to check.
   * @param objectArray The array to check against.
   * @returns `true` if the value is present in the array.
   */
  transform(object: unknown, objectArray: Array<unknown>): boolean {
    return objectArray.findIndex((v) => isEqual(v, object)) !== -1;
  }
}
