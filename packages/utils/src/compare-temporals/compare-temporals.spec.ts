/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { compareTemporals } from "./compare-temporals";

test("DATETIME: dates with different millisecond values that are otherwise identical when compared for equality should return true", () => {
  const alpha = new Date("2025-05-01 09:15:12:321");
  const beta = new Date("2025-05-01 09:15:12:800");
  expect(compareTemporals(alpha, "===", beta)).toBe(true);
});

test("DATETIME: different dates when compared for equality should return false", () => {
  const alpha = new Date("2025-05-01 09:15:12:321");
  const beta = new Date("2025-05-04 09:15:50:123");
  expect(compareTemporals(alpha, "===", beta)).toBe(false);
});

test("DATE: ignores time completely", () => {
  const alpha = new Date("2025-05-01 9:15:12");
  const beta = new Date("2025-05-01 9:15:50");
  expect(compareTemporals(alpha, "===", beta, "DATE")).toBe(true);
});

test("TIME: respects seconds by default", () => {
  const alpha = new Date("2025-05-01 9:15:12");
  const beta = new Date("2025-05-01 9:15:50");
  expect(compareTemporals(alpha, "===", beta)).toBe(false);
});

test("TIME: ignore seconds when specificly disabled", () => {
  const alpha = new Date("2025-05-01 9:15:12");
  const beta = new Date("2025-05-01 9:15:50");
  expect(compareTemporals(alpha, "===", beta, "TIME", false)).toBe(true);
});

test("all relation operators work as expected", () => {
  const alpha = new Date("2025-05-01 9:15:12");
  const beta = new Date("2025-05-01 9:15:13");

  expect(compareTemporals(alpha, "<", beta)).toBe(true);
  expect(compareTemporals(beta, ">", alpha)).toBe(true);
  expect(compareTemporals(alpha, "!==", beta)).toBe(true);
  expect(compareTemporals(alpha, "<=", beta)).toBe(true);
  expect(compareTemporals(beta, ">=", alpha)).toBe(true);
});

test("DATETIME: dates representing the same time in different timezones compare equal", () => {
  // 9:15 UTC === 10:15 UTC+1
  const utc = new Date("2025-05-01T09:15:12Z");
  const utcPlusOne = new Date("2025-05-01T10:15:12+01:00");
  expect(compareTemporals(utc, "===", utcPlusOne)).toBe(true);
});