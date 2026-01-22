/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isAbsentOrEmpty } from "./is-absent-or-empty";

/*
 * Test cases are for typical inputs and unexpected truthy inputs.
 * To tests truthy values, we compare against all falsy values defined in JavaScript.
 * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
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

  test("Falsy (false) value, should be false", () => {
    expect(isAbsentOrEmpty(false)).toBe(false);
  });

  test("Falsy (0) value, should be false", () => {
    expect(isAbsentOrEmpty(0)).toBe(false);
  });

  test("Falsy (-0) value, should be false", () => {
    expect(isAbsentOrEmpty(-0)).toBe(false);
  });

  test("Falsy (0n) value, should be false", () => {
    expect(isAbsentOrEmpty(0n)).toBe(false);
  });

  test("Falsy (NaN) value, should be false", () => {
    expect(isAbsentOrEmpty(NaN)).toBe(false);
  });
});
