/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { asArray } from "./as-array";

test("Undefined value, should return an empty array ([])", () => {
  expect(asArray(undefined)).toStrictEqual([]);
});

describe("Array type test cases, input and return values should be the same", () => {
  test("Empty array", () => {
    const value: Array<string> = [];
    expect(asArray(value)).toBe(value);
  });

  test("Single empty value array", () => {
    const value: Array<string> = [""];
    expect(asArray(value)).toBe(value);
  });

  test("Single value array", () => {
    const value: Array<string> = ["a"];
    expect(asArray(value)).toBe(value);
  });

  test("Multiple value array", () => {
    const value: Array<string> = ["a", "b", "c"];
    expect(asArray(value)).toBe(value);
  });

  test("Single empty value tuple", () => {
    const value: [] = [];
    expect(asArray(value)).toBe(value);
  });

  test("Single value tuple", () => {
    const value: [string] = ["a"];
    expect(asArray(value)).toBe(value);
  });

  test("Multiple value tuple", () => {
    const value: [string, boolean, number] = ["a", true, 1];
    expect(asArray(value)).toBe(value);
  });

  test("Single empty value array format object", () => {
    const value: object = [];
    expect(asArray(value)).toBe(value);
  });

  test("Single value array format object", () => {
    const value: object = ["b"];
    expect(asArray(value)).toBe(value);
  });

  test("Multiple value array format object", () => {
    const value: object = ["b", "a"];
    expect(asArray(value)).toBe(value);
  });
});

/*
 * Testing different non-array types and lengths to ensure they are enclosed as a single item.
 * Libraries such as lodash handle this differently:
 * https://lodash.com/docs/4.17.23#toArray
 *
 * Dictionary types are treated as single objects by asArray,
 * so should also be enclosed in an array, not split by key values.
 */
describe("Non-Array type test cases, should be enclosed in an array", () => {
  test("Single empty value dict format object", () => {
    const value: object = {};
    expect(asArray(value)).toStrictEqual([value]);
  });

  test("Single value dict format object", () => {
    const value: object = { key: "a" };
    expect(asArray(value)).toStrictEqual([value]);
  });

  test("Multiple value dict format object", () => {
    const value: object = { a: 1, b: 2 };
    expect(asArray(value)).toStrictEqual([value]);
  });

  test("Empty string value", () => {
    const value = "";
    expect(asArray(value)).toStrictEqual([value]);
  });

  test("Single character string value", () => {
    const value = "a";
    expect(asArray(value)).toStrictEqual([value]);
  });

  test("Multiple character string value", () => {
    const value = "abc";
    expect(asArray(value)).toStrictEqual([value]);
  });

  test("Single digit number value", () => {
    const value = 0;
    expect(asArray(value)).toStrictEqual([value]);
  });

  test("Multiple digit number value", () => {
    const value = 123;
    expect(asArray(value)).toStrictEqual([value]);
  });

  test("Boolean value", () => {
    const value = true;
    expect(asArray(value)).toStrictEqual([value]);
  });
});

/*
 * Testing edge cases where 'Array.isArray' or 'instanceof Array' might false positive.
 * In this case, the Object.create makes an Array which is formatted more like a dict:
 * Array {
 *   "0": "a",
 *   "1": "b",
 *   "length": 2,
 * },
 * Using Array.isArray will return false, instanceof Array will return true.
 * Array.isArray is used by asArray and is more in line with other dict handling.
 */
test("Pseudo/incomplete array objects, should be enclosed in an array", () => {
  const value = Object.create(Array.prototype, {});
  value.push("a");
  value.push("b");
  expect(asArray(value)).toStrictEqual([value]);
});
