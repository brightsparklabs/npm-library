/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { isAbsentOrEmpty } from "./is-absent-or-empty";

/*
 * Test cases focus on covering truthy inputs.
 * As the utility aims to give explicit control over truthy values, they should all be tested for.
 * To tests truthy values, we compare against all falsy values defined in JavaScript.
 * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
test("Undefined value, should be true", () => {
  expect(isAbsentOrEmpty(undefined)).toBe(true);
});
test("Null value, should be true", () => {
  expect(isAbsentOrEmpty(null)).toBe(true);
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
