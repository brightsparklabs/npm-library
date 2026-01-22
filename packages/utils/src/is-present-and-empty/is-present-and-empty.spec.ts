/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isPresentAndEmpty } from "./is-present-and-empty";

/*
 * Test cases are for typical inputs and unexpected truthy inputs.
 * To tests truthy values, we compare against all falsy values defined in JavaScript.
 * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
describe("isPresentAndEmpty()", () => {
  test("Undefined value, should be false", () => {
    expect(isPresentAndEmpty(undefined)).toBe(false);
  });

  test('Empty string ("") value, should be true', () => {
    expect(isPresentAndEmpty("")).toBe(true);
  });

  test('Empty array ([]) value, should be true', () => {
    expect(isPresentAndEmpty([])).toBe(true);
  });

  test('Present, non-empty ("foo") value, should be false', () => {
    expect(isPresentAndEmpty("foo")).toBe(false);
  });

  test('Array containing empty string ([""]) value, should be false', () => {
    expect(isPresentAndEmpty([""])).toBe(false);
  });

  test("Falsy (false) value, should be false", () => {
    expect(isPresentAndEmpty(false)).toBe(false);
  });

  test("Falsy (0) value, should be false", () => {
    expect(isPresentAndEmpty(0)).toBe(false);
  });

  test("Falsy (-0) value, should be false", () => {
    expect(isPresentAndEmpty(-0)).toBe(false);
  });

  test("Falsy (0n) value, should be false", () => {
    expect(isPresentAndEmpty(0n)).toBe(false);
  });

  test("Falsy (NaN) value, should be false", () => {
    expect(isPresentAndEmpty(NaN)).toBe(false);
  });
});
