/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isAbsent } from "./is-absent";

/*
 * Test cases focus on covering truthy inputs.
 * As the utility aims to give explicit control over truthy values, they should all be tested for.
 * To tests truthy values, we compare against all falsy values defined in JavaScript.
 * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
describe("isAbsent()", () => {
  test("Undefined value, should be true", () => {
    expect(isAbsent(undefined)).toBe(true);
  });

  test("Null value, should be true", () => {
    expect(isAbsent(null)).toBe(true);
  });

  test('Empty ("") value, should be false', () => {
    expect(isAbsent("")).toBe(false);
  });

  test('Present, non-empty ("foo") value, should be false', () => {
    expect(isAbsent("foo")).toBe(false);
  });

  test("Falsy (false) value, should be false", () => {
    expect(isAbsent(false)).toBe(false);
  });

  test("Falsy (0) value, should be false", () => {
    expect(isAbsent(0)).toBe(false);
  });

  test("Falsy (-0) value, should be false", () => {
    expect(isAbsent(-0)).toBe(false);
  });

  test("Falsy (0n) value, should be false", () => {
    expect(isAbsent(0n)).toBe(false);
  });

  test("Falsy (NaN) value, should be false", () => {
    expect(isAbsent(NaN)).toBe(false);
  });
});
