/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { formatDuration } from "./format-duration";

test("Full length output including all labels (1d 1h 1m 1s)", () => {
  expect(formatDuration(90061)).toBe("1d 1h 1m 1s");
});

//intervalToDuration trims leading 0
test("Minutes value of 0", () => {
  expect(formatDuration(7202)).toBe("2h 2s");
});

test("Length including months (31+ days)", () => {
  expect(formatDuration(3456000)).toBe("1mo 9d");
});

test("Decimal seconds input (milliseconds)", () => {
  expect(formatDuration(2.7)).toBe("2s");
});

test("Negative seconds input", () => {
  expect(formatDuration(-8040)).toBe("-2h -14m");
});

test("Output value max limits(11mo 30d 23h 59m 59s)", () => {
  expect(formatDuration(31535999)).toBe("11mo 30d 23h 59m 59s");
});

/*
 * intervalToDuration() seems to use actual calendar months.
 * Likely starts from january as we set start value to 0.
 *
 * 5184000 seconds is 60 days.
 * jan(31) + feb(28) = 59 days which would ouput 2mo 1d.
 * a fixed month length, such as 30, would output 2mo.
 */
test("Month length (expecting dynamic calendar length)", () => {
  expect(formatDuration(5184000)).toBe("2mo 1d");
});
