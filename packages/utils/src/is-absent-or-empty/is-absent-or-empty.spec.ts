/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isAbsentOrEmpty } from "./is-absent-or-empty";

describe("isAbsentOrEmpty()", () => {
  test("Undefined value, should be true", () => {
    expect(isAbsentOrEmpty(undefined)).toBe(true);
  });

  test('Empty string ("") value, should be true', () => {
    expect(isAbsentOrEmpty("")).toBe(true);
  });

  test('Empty array ("") value, should be true', () => {
    expect(isAbsentOrEmpty([])).toBe(true);
  });

  test('Present, non-empty ("") value, should be false', () => {
    expect(isAbsentOrEmpty("foo")).toBe(false);
  });

  test('Array containing empty string ([""]) value, should be false', () => {
    expect(isAbsentOrEmpty([""])).toBe(false);
  });
});
