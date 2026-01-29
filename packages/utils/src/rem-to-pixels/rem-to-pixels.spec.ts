/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { remToPixels } from "./rem-to-pixels";

describe("Different rem values", () => {
  test("Zero rem, expecting 0", () => {
    expect(remToPixels(0)).toBe(0);
  });

  test("Negative rem, expecting -16", () => {
    expect(remToPixels(-1)).toBe(-16);
  });

  test("Decimal rem, expecting 3.2", () => {
    expect(remToPixels(0.2)).toBe(3.2);
  });

  /* Javascript max number limit is 2^53 - 1.
   * Comparisons can get incorrect after this value.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER.
   */
  test("Very large rem, expecting MAX_SAFE_INTEGER", () => {
    const rem = Number.MAX_SAFE_INTEGER / 16;
    expect(remToPixels(rem)).toBe(Number.MAX_SAFE_INTEGER);
    expect(remToPixels(rem)).not.toBe(Number.MAX_SAFE_INTEGER + 1);
  });
});
