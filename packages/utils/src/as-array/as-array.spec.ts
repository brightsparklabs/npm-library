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
test('Single empty value array, should return itself ([""])', () => {
  const value:Array<string> = [""];
  expect(asArray(value)).toBe(value);
});
test('Single value array, should return itself (["a"])', () => {
  const value:Array<string> = ["a"];
  expect(asArray(value)).toBe(value);
});
test('Multiple value array, should return itself (["a", "b", "c"])', () => {
  const value:Array<string> = ["a", "b", "c"];
  expect(asArray(value)).toBe(value);
});
test('Single empty value tuple, should return itself ([])', () => {
  const value: [] = [];
  expect(asArray(value)).toBe(value);
});
test('Single value tuple, should return itself (["a"])', () => {
  const value: [string] = ["a"];
  expect(asArray(value)).toBe(value);
});
test('Multiple value tuple, should return itself (["a", true, 1])', () => {
  const value: [string, boolean, number] = ["a", true, 1]
  expect(asArray(value)).toBe(value);
});
test('Single empty value array format object, should return itself ([])', () => {
  const value: object = [];
  expect(asArray(value)).toBe(value);
});
test('Single value array format object, should return itself (["b"])', () => {
  const value: object = ["b"];
  expect(asArray(value)).toBe(value);
});
test('Multiple value array format object, should return itself (["b", "a"])', () => {
  const value: object = ["b", "a"];
  expect(asArray(value)).toBe(value);
});
/*
 * Testing different non-array types and lengths to ensure they are enclosed as a single item.
 * Libraries such as lodash handle this differently:
 * https://lodash.com/docs/4.17.23#toArray
 * 
 * Dictionary types are treated as single objects by asArray, 
 * so should also be enclosed in an array, not split by key values.
 */
test('Single empty value dict format object, should return enclosed in array ([{}])', () => {
  const value: object = {};
  expect(asArray(value)).toStrictEqual([value]);
});
test('Single value dict format object, should return enclosed in array ([{"key":"a"}])', () => {
  const value: object = {"key": "a"};
  expect(asArray(value)).toStrictEqual([value]);
});
test('Multiple value dict format object, should return enclosed in array ([{"a":1, "b":2}])', () => {
  const value:object = {"a": 1, "b":2}
  expect(asArray(value)).toStrictEqual([value]);
});
test('Empty string value, should return enclosed in array ([""])', () => {
  const value = "";
  expect(asArray(value)).toBe([value]);
});
test('Single char string value, should return enclosed in array (["a"])', () => {
  const value = "a";
  expect(asArray(value)).toBe([value]);
});
test('Multiple char string value, should return enclosed in array (["abc"])', () => {
  const value = "abc";
  expect(asArray(value)).toBe([value]);
});



//Test cases for records/ dict which cause errors as asArray does not accept the record type.
//These tests can still be run and should pass
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
