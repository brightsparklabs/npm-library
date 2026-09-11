/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

import { splitCamelCaseToWords } from "@brightsparklabs/utils";

/**
 * Custom pipe for formatting CamelCase strings into words.
 *
 * @example
 * ```
 * Usage:
 *
 *   {{ <value> | splitCamelCase }}
 *
 * Example:
 *
 *   {{ heading | splitCamelCase }}
 *
 * This transforms `"camelCase"` into `"Camel Case"`
 * ```
 */
@Pipe({ name: "splitCamelCase" })
export class SplitCamelCasePipe implements PipeTransform {
  /**
   * Converts a CamelCase string to split case. E.g theCamelCaseString -> The Camel Case String.
   * NOTE: The first letter will get capitalised.
   *
   * @param value The CamelCase string.
   * @returns The formatted string.
   */
  transform(value: string): string {
    return splitCamelCaseToWords(value);
  }
}
