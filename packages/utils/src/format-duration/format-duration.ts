/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { formatDuration as datefnsFormatDuration, intervalToDuration } from "date-fns";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Handles formatting a duration of seconds.
 *
 * @example
 * ```
 * formatDuration(30) = "30s"
 * formatDuration(102) = "1m 42s"
 * formatDuration(3601) = "1h 1s"
 * formatDuration() = ""
 * ```
 *
 * NOTE: Consuming applications targeting ES2025 should use
 * `Intl.DurationFormat` with `style:narrow` achieve this formatting.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat
 *
 * @param seconds The number of seconds for the duration, to format.
 * @returns The formatted duration.
 */
export function formatDuration(seconds = 0): string {
  /*
   * Uses actual calendar month lengths for formatting.
   * Since we use 0 as start value, it asssume January.
   * May lead to slightly incorrect/ inconsistent result for input values > 2678400,
   * which is when days start getting converted to months.
   */
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  // Date-fns doesn't have wonderful handling for formatting the result. See open issue:
  // https://github.com/date-fns/date-fns/issues/2134
  return datefnsFormatDuration(duration, {
    delimiter: " ",
  })
    .replace(" years", "y")
    .replace(" year", "y")
    .replace(" months", "mo")
    .replace(" month", "mo")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" seconds", "s")
    .replace(" second", "s");
}
