/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { asArray } from "./as-array";

/*
 * asArray test cases.
 */
test("Undefined value, should return empty array ([])", () => {
  expect(asArray(undefined)).toStrictEqual([]);
});
test("Empty array, should return itself ([])", () => {
  const value:Array<string> = [];
  expect(asArray(value)).toBe(value);
});
test('Single value array, should return itself (["a"])', () => {
  const value:Array<string> = ["a"];
  expect(asArray(value)).toBe(value);
});
test('Single empty value array, should return itself ([""])', () => {
  const value:Array<string> = [""];
  expect(asArray(value)).toBe(value);
});
test('Multiple value array, should return itself (["a", "b", "c"])', () => {
  const value:Array<string> = ["a", "b", "c"];
  expect(asArray(value)).toBe(value);
});
