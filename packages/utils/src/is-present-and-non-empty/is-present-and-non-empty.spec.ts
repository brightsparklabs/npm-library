/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isPresentAndNonEmpty } from "./is-present-and-non-empty";

/*
 * Test cases are for typical inputs and unexpected truthy inputs.
 * To tests truthy values, we compare against all falsy values defined in JavaScript.
 * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
describe("isPresentAndNonEmpty()", () => {
  test("Undefined value, should be false", () => {
    expect(isPresentAndNonEmpty(undefined)).toBe(false);
  });

  test("Null value, should be false", () => {
    expect(isPresentAndNonEmpty(null)).toBe(false);
  });

  test('Empty string ("") value, should be false', () => {
    expect(isPresentAndNonEmpty("")).toBe(false);
  });

  test("Empty array ([]) value, should be false", () => {
    expect(isPresentAndNonEmpty([])).toBe(false);
  });

  test('Present, non-empty ("foo") value, should be true', () => {
    expect(isPresentAndNonEmpty("foo")).toBe(true);
  });

  test('Array containing empty string ([""]) value, should be true', () => {
    expect(isPresentAndNonEmpty([""])).toBe(true);
  });

  test("Falsy (false) value, should be true", () => {
    expect(isPresentAndNonEmpty(false)).toBe(true);
  });

  test("Falsy (0) value, should be true", () => {
    expect(isPresentAndNonEmpty(0)).toBe(true);
  });

  test("Falsy (-0) value, should be true", () => {
    expect(isPresentAndNonEmpty(-0)).toBe(true);
  });

  test("Falsy (0n) value, should be true", () => {
    expect(isPresentAndNonEmpty(0n)).toBe(true);
  });

  test("Falsy (NaN) value, should be true", () => {
    expect(isPresentAndNonEmpty(NaN)).toBe(true);
  });
});
