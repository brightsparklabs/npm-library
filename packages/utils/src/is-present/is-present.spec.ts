/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isPresent } from "./is-present";

describe("isPresent()", () => {
  test("Undefined value, should be false", () => {
    expect(isPresent(undefined)).toBe(false);
  });

  test('Empty ("") value, should be true', () => {
    expect(isPresent("")).toBe(true);
  });

  test('Present, non-empty ("foo") value, should be true', () => {
    expect(isPresent("foo")).toBe(true);
  });
});
