/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isAbsent } from "./is-absent";

describe("isAbsent()", () => {
  test("Undefined value, should be true", () => {
    expect(isAbsent(undefined)).toBe(true);
  });

  test('Empty ("") value, should be false', () => {
    expect(isAbsent("")).toBe(false);
  });

  test('Present, non-empty ("foo") value, should be false', () => {
    expect(isAbsent("foo")).toBe(false);
  });
});
