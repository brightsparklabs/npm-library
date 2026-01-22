/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isPresentAndNonEmpty } from "./is-present-and-non-empty";

describe("isPresentAndNonEmpty()", () => {
  test("Undefined value, should be false", () => {
    expect(isPresentAndNonEmpty(undefined)).toBe(false);
  });

  test('Empty string ("") value, should be false', () => {
    expect(isPresentAndNonEmpty("")).toBe(false);
  });

  test('Empty array ("") value, should be false', () => {
    expect(isPresentAndNonEmpty([])).toBe(false);
  });

  test('Present, non-empty ("") value, should be true', () => {
    expect(isPresentAndNonEmpty("foo")).toBe(true);
  });

  test('Array containing empty string ([""]) value, should be true', () => {
    expect(isPresentAndNonEmpty([""])).toBe(true);
  });
});
