/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { asArray } from "./as-array";

/*
 * Test cases for asArray.
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
test('Single value object, should return enclosed in array ([{"key":"a"}])', () => {
  const value: object = {"key": "a"};
  expect(asArray(value)).toStrictEqual([value]);
});
test('Single empty value object, should return enclosed in array ([{}])', () => {
  const value: object = {};
  expect(asArray(value)).toStrictEqual([value]);
});
test('Multiple value object, should return enclosed in array ([{"a":1, "b":2}])', () => {
  const value:object = {"a": 1, "b":2}
  expect(asArray(value)).toStrictEqual([value]);
});

//Test cases for records/ dict which cause errors as asArray does not accept the record type.
//These tests can still be used and should pass
/*
test('Single value record/ dict, should return enclosed in array ([{"a":1}])', () => {
  const value: Record<string, number> = {"a": 1};
  expect(asArray(value)).toStrictEqual([value]);
});
test('Multiple value record/ dict, should return enclosed in array ([{"a":1, "b":2}])', () => {
  const value: Record<string, number> = {"a": 1, "b":2}
  expect(asArray(value)).toStrictEqual([value]);
});
*/
