/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { Pipe, PipeTransform } from "@angular/core";

import { capitaliseFirstLetter } from "@brightsparklabs/utils";

/**
 * Custom pipe for capitalising the first letter of a string.
 */
@Pipe({
  name: "capitaliseFirstLetter",
})
export class CapitaliseFirstLetterPipe implements PipeTransform {
  /**
   * Capitalises the first letter of a string.
   *
   * @param value String to be capitalised.
   * @returns The same string with the first letter capitalised.
   */
  transform(value: string): unknown {
    return capitaliseFirstLetter(value);
  }
}
