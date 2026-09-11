/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

/**
 * Custom pipe for getting a value from a map.
 *
 * NOTE: Due to the way Angular change detection works this pipe will not be called again
 * if a new value is added to an existing map, a new map must be created for the pipe to be called.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <map> | mapGet: <key> }}
 *
 * Example:
 *
 *   {{ resultMap | mapGet: key }}
 * ```
 */
@Pipe({ name: "mapGet" })
export class MapGetPipe implements PipeTransform {
  /**
   * Retrieves the value associated with the given key from the map.
   *
   * @param map The `Map` to retrieve the value from.
   * @param key The key whose associated value should be returned.
   * @returns The value associated with the `key`, or `undefined` if the `key` is not present in the `map`.
   */
  transform<T, R>(map: Map<T, R>, key: T): R | undefined {
    return map.get(key);
  }
}
