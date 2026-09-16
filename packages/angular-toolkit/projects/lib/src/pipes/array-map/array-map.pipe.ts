/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

import { get } from "lodash-es";

/**
 * Pipe for mapping an array by a common property.
 *
 * @example
 * ```
 * // INPUT:
 * [{ data: { name: "John Smith" }}, { data: { name: "Jane Smith" }}] | arrayMap: "data.name"
 *
 * // OUTPUT:
 * ["John Smith" "Jane Smith"]
 * ```
 */
@Pipe({ name: "arrayMap" })
export class ArrayMapPipe implements PipeTransform {
  // -----------------------------------------------------------------------------------------------
  // PUBLIC METHODS
  // -----------------------------------------------------------------------------------------------

  /**
   * Maps an array of values by a common property.
   *
   * @param values The values to map.
   * @param path The `.` delimited path to the property to map to.
   * @returns The mapped array.
   */
  transform(values: Array<Record<string, unknown>> | undefined, path: string) {
    return (values ?? []).map((value) => get(value, path));
  }
}
