/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { isAbsent } from "./is-present-and-is-absent";

test("isAbsent with undefined value, should be true", () => {
    expect(isAbsent(undefined)).toBe(true);
});

test ("isAbsent with empty (\"\") value, should be false", () => {
    expect(isAbsent("")).toBe(false);
});

test ("isAbsent with present, non-empty (\"\") value, should be false", () => {
    expect(isAbsent("foo")).toBe(false);
});


