/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { isAbsent, isAbsentOrEmpty } from "./is-present-and-is-absent";

//  Testing isAbsent() with the 3 variations of input values
// (absent, empty, present).
describe("isAbsent()", () => {
    test("Undefined value, should be true", () => {
        expect(isAbsent(undefined)).toBe(true);
    });

    test ("Empty (\"\") value, should be false", () => {
        expect(isAbsent("")).toBe(false);
    });

    test ("Present, non-empty (\"foo\") value, should be false", () => {
        expect(isAbsent("foo")).toBe(false);
    });
});

// Test isAbsentOrEmpty() with 5 variations of input values
// (absent, empty string, empty array, present, present with empty [""]).
describe("isAbsentOrEmpty()", () => {
    test("Undefined value, should be true", () => {
        expect(isAbsentOrEmpty(undefined)).toBe(true);
    });

    test("Empty string (\"\") value, should be true", () => {
        expect(isAbsentOrEmpty("")).toBe(true);
    });

    test("Empty array (\"\") value, should be true", () => {
        expect(isAbsentOrEmpty([])).toBe(true);
    });

    test("Present, non-empty (\"\") value, should be false", () => {
        expect(isAbsentOrEmpty("foo")).toBe(false);
    });

    test("Array containing empty string ([\"\"]) value, should be false", () => {
        expect(isAbsentOrEmpty([""])).toBe(false);
    });
});


