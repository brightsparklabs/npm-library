/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { formatDuration } from "./format-duration";

test("Full length output including all labels (1d 1h 1m 1s)", () => {
  expect(formatDuration(90061)).toBe("1d 1h 1m 1s");
});

//intervalToDuration trims leading 0 so minutes should not be displayed
test("Minutes value of 0", () => {
  expect(formatDuration(7202)).toBe("2h 2s");
});

test("Length including months (31+ days)", () => {
  expect(formatDuration(3456000)).toBe("1mo 9d");
});

test("Decimal seconds input (milliseconds)", () => {
  expect(formatDuration(2.7)).toBe("2s");
});
