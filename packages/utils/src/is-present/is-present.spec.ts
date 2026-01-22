/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isPresent } from "./is-present";

/*
 * Test cases are for typical inputs and unexpected truthy inputs.
 * To tests truthy values, we compare against all falsy values defined in JavaScript.
 * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
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

  test("Falsy (false) value, should be true", () => {
    expect(isPresent(false)).toBe(true);
  });

  test("Falsy (0) value, should be false", () => {
    expect(isPresent(0)).toBe(true);
  });

  test("Falsy (-0) value, should be false", () => {
    expect(isPresent(-0)).toBe(true);
  });

  test("Falsy (0n) value, should be false", () => {
    expect(isPresent(0n)).toBe(true);
  });

  test("Falsy (NaN) value, should be false", () => {
    expect(isPresent(NaN)).toBe(true);
  });
});
