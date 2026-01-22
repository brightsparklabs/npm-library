/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isPresentAndEmpty } from "./is-present-and-empty";

describe("isPresentAndEmpty()", () => {
  test("Undefined value, should be false", () => {
    expect(isPresentAndEmpty(undefined)).toBe(false);
  });

  test('Empty string ("") value, should be true', () => {
    expect(isPresentAndEmpty("")).toBe(true);
  });

  test('Empty array ("") value, should be true', () => {
    expect(isPresentAndEmpty([])).toBe(true);
  });

  test('Present, non-empty ("") value, should be false', () => {
    expect(isPresentAndEmpty("foo")).toBe(false);
  });

  test('Array containing empty string ([""]) value, should be false', () => {
    expect(isPresentAndEmpty([""])).toBe(false);
  });
});
