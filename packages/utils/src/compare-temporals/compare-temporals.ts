/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

// -------------------------------------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------------------------------------

/** Models the different types of temporal data. */
export type TemporalType = "DATETIME" | "DATE" | "TIME";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Helper for comparing two {@link Date dates}.
 *
 * When doing the comparisons the `milliseconds` will be ignored. The date and time components can
 * also be ignored by changing the {@link mode}. The `seconds` can also be ignored by setting
 * {@link seconds} to `false`.
 *
 * @example
 * ```
 * const alpha = new Date("2025-05-01 09:15:12:321");
 * const beta = new Date("2025-05-04 09:15:50:123");
 * const gamma = new Date("2025-05-01 16:38:42:000");
 * const delta = new Date("2025-05-01 09:15:12:800");
 *
 * // DATETIME
 * compareTemporals(alpha, "===", beta, "DATETIME"): false
 * // Compares -> 2025-05-01 09:15:12 === 2025-05-04 09:15:50
 * compareTemporals(alpha, "===", gamma, "DATETIME"): false
 * // Compares -> 2025-05-01 09:15:12 === 2025-05-01 16:38:42
 * compareTemporals(alpha, "===", delta, "DATETIME"): true
 * // Compares -> 2025-05-01 09:15:12 === "2025-05-01 09:15:12
 *
 * // DATE
 * compareTemporals(alpha, "===", beta, "DATE"): false
 * // Compares -> 2025-05-01 === 2025-05-04
 * compareTemporals(alpha, "===", gamma, "DATE"): true
 * // Compares -> 2025-05-01 === 2025-05-01
 * compareTemporals(alpha, "===", delta, "DATE"): true
 * // Compares -> 2025-05-01 === 2025-05-01
 *
 * // TIME
 * compareTemporals(alpha, "===", beta, "TIME"): false
 * //  Compares -> 09:15:12 === 09:15:50
 * compareTemporals(alpha, "===", beta, "TIME", false): true
 * //  Compares -> 09:15 === 09:15
 * compareTemporals(alpha, "===", gamma, "TIME"): false
 * // Compares -> 09:15:12 === 16:38:42
 * compareTemporals(alpha, "===", delta, "TIME"): true
 * // Compares -> 09:15:12 === 09:15:12
 * ```
 *
 *
 * @param a The first date object to compare.
 * @param operator The operator to use for the comparison.
 * @param b The second date object to compare.
 * @param mode The temporal mode to use for the comparison. Default: `DATETIME`.
 * @param seconds If seconds should be included in the comparison, this only has an effect when
 * {@link mode} is either `DATETIME` or `TIME`. Default: `DATETIME`.
 * @returns A boolean result of the comparison.
 */
export function compareTemporals(
  a: Date,
  operator: "===" | "!==" | "<" | ">" | "<=" | ">=",
  b: Date,
  mode: TemporalType = "DATETIME",
  seconds: Boolean = true,
): boolean {
  let valueA: number;
  let valueB: number;

  // NOTE: This approach was chosen to ensure optimal performance for high frequency calls e.g.
  // filtering large tables. Compared to either instantiating new date objects to then call
  // `.setFullYear(), ...` or serializing the dates for comparison, this approach ends up being
  // ~100-200x faster.
  switch (mode) {
    case "TIME":
      valueA = a.getHours() * 3600 + a.getMinutes() * 60 + (seconds ? a.getSeconds() : 0);
      valueB = b.getHours() * 3600 + b.getMinutes() * 60 + (seconds ? b.getSeconds() : 0);
      break;

    case "DATE":
      valueA = a.getFullYear() * 10000 + a.getMonth() * 100 + a.getDate();
      valueB = b.getFullYear() * 10000 + b.getMonth() * 100 + b.getDate();
      break;

    case "DATETIME":
      // `Math.floor(x / 1000)` removes the milliseconds from the date. It seems to be 2x faster
      // than calling `.getMilliseconds()`.
      valueA = Math.floor((a.getTime() - (seconds ? 0 : a.getSeconds() * 1000)) / 1000);
      valueB = Math.floor((b.getTime() - (seconds ? 0 : b.getSeconds() * 1000)) / 1000);
      break;
  }

  switch (operator) {
    case "===":
      return valueA === valueB;
    case "!==":
      return valueA !== valueB;
    case "<":
      return valueA < valueB;
    case "<=":
      return valueA <= valueB;
    case ">":
      return valueA > valueB;
    case ">=":
      return valueA >= valueB;
  }
}