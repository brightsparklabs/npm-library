/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { compareTemporals } from "./compare-temporals";

test("dates with different millisecond values that are otherwise identical when compared for equality should return true", () => {
  const alpha = new Date("2025-05-01 09:15:12:321");
  const beta = new Date("2025-05-01 09:15:12:800");
  expect(compareTemporals(alpha, "===", beta)).toBe(true);
});

test("different dates when compared for equality should return false", () => {
  const alpha = new Date("2025-05-01 09:15:12:321");
  const beta = new Date("2025-05-04 09:15:50:123");
  expect(compareTemporals(alpha, "===", beta)).toBe(false);
});