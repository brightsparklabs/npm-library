/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */
import { Pipe, PipeTransform } from "@angular/core";

import { formatUnderscoreString } from "@brightsparklabs/utils";

/**
 * Custom pipe for formatting UNDERSCORE_STRINGS into words.
 *
 * ```
 * Usage:
 *   {{ <value> | formatUnderscore }}
 *
 * Example:
 *   {{ heading | formatUnderscore }}
 * ```
 *
 * This transforms `"UNDERSCORE_STRING"` into `"Underscore String"`.
 *
 */
@Pipe({ name: "formatUnderscore" })
export class FormatUnderscorePipe implements PipeTransform {
  /**
   * Converts an UNDERSCORE_STRING to split case E.g. UNDERSCORE_STRING -> Underscore String.
   * NOTE: The result will be Title Case.
   *
   * @param value The UNDERSCORE_STRING.
   * @returns The formatted string.
   */
  transform(value: string): string {
    return formatUnderscoreString(value);
  }
}
