/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { compareTemporals } from "./compare-temporals";

describe("Validate comparing the datetime", () => {
  test("Otherwise identical dates with different millisecond values should be equal", () => {
    const alpha = new Date("2025-05-01 09:15:12:321");
    const beta = new Date("2025-05-01 09:15:12:800");
    expect(compareTemporals(alpha, "===", beta)).toBe(true);
  });

  test("Different dates when compared for equality should return false", () => {
    const alpha = new Date("2025-05-01 09:15:12:321");
    const beta = new Date("2025-05-04 09:15:50:123");
    expect(compareTemporals(alpha, "===", beta)).toBe(false);
  });

  test("Dates representing the same time in different timezones compare equal", () => {
    // 9:15 UTC === 10:15 UTC+1.
    const utc = new Date("2025-05-01T09:15:12Z");
    const utcPlusOne = new Date("2025-05-01T10:15:12+01:00");
    expect(compareTemporals(utc, "===", utcPlusOne)).toBe(true);
  });

  test("All relation operators work as expected for DATETIME", () => {
    const alpha = new Date("2025-05-01 9:15:12");
    const beta = new Date("2025-05-01 9:15:13");

    expect(compareTemporals(alpha, "===", alpha, "DATETIME")).toBe(true);
    expect(compareTemporals(alpha, "<", beta, "DATETIME")).toBe(true);
    expect(compareTemporals(beta, ">", alpha, "DATETIME")).toBe(true);
    expect(compareTemporals(alpha, "!==", beta, "DATETIME")).toBe(true);
    expect(compareTemporals(alpha, "<=", beta, "DATETIME")).toBe(true);
    expect(compareTemporals(beta, ">=", alpha, "DATETIME")).toBe(true);
  });

  test("DATETIME ignores seconds when specifically disabled", () => {
    const alpha = new Date("2025-05-01T09:15:12");
    const beta = new Date("2025-05-01T09:15:59");
    expect(compareTemporals(alpha, "===", beta, "DATETIME", false)).toBe(true);
  });

  test("Millisecond differences in the same second are equal", () => {
    const alpha = new Date("2025-05-01T09:15:12.000");
    const beta = new Date("2025-05-01T09:15:12.999");
    expect(compareTemporals(alpha, "===", beta, "DATETIME")).toBe(true);
  });
});

describe("Validate comparing the date", () => {
  test("Ignores time completely", () => {
    const alpha = new Date("2025-05-01 9:15:12");
    const beta = new Date("2025-05-01 9:15:50");
    expect(compareTemporals(alpha, "===", beta, "DATE")).toBe(true);
  });

  test("All relation operators work as expected for DATE", () => {
    const alpha = new Date("2025-05-01 9:15:12");
    const beta = new Date("2025-05-2 9:15:13");

    expect(compareTemporals(alpha, "===", alpha, "DATE")).toBe(true);
    expect(compareTemporals(alpha, "<", beta, "DATE")).toBe(true);
    expect(compareTemporals(beta, ">", alpha, "DATE")).toBe(true);
    expect(compareTemporals(alpha, "!==", beta, "DATE")).toBe(true);
    expect(compareTemporals(alpha, "<=", beta, "DATE")).toBe(true);
    expect(compareTemporals(beta, ">=", alpha, "DATE")).toBe(true);
    expect(compareTemporals(alpha, "<=", alpha, "DATE")).toBe(true);
    expect(compareTemporals(beta, ">=", beta, "DATE")).toBe(true);
  });

  test("Ignores milliseconds completely", () => {
    const alpha = new Date("2025-05-01T09:15:12.000");
    const beta = new Date("2025-05-01T09:15:12.999");
    expect(compareTemporals(alpha, "===", beta, "DATE")).toBe(true);
  });
});

describe("Validate comparing the time", () => {
  test("Respects seconds by default", () => {
    const alpha = new Date("2025-05-01 9:15:12");
    const beta = new Date("2025-05-01 9:15:50");
    expect(compareTemporals(alpha, "===", beta)).toBe(false);
  });

  test("Ignore seconds when specificly disabled", () => {
    const alpha = new Date("2025-05-01 9:15:12");
    const beta = new Date("2025-05-01 9:15:50");
    expect(compareTemporals(alpha, "===", beta, "TIME", false)).toBe(true);
  });

  test("All relation operators work as expected for TIME", () => {
    const alpha = new Date("2025-05-02 8:00:00");
    const beta = new Date("2025-05-1 9:00:00");

    expect(compareTemporals(alpha, "===", alpha, "TIME")).toBe(true);
    expect(compareTemporals(alpha, "<", beta, "TIME")).toBe(true);
    expect(compareTemporals(beta, ">", alpha, "TIME")).toBe(true);
    expect(compareTemporals(alpha, "!==", beta, "TIME")).toBe(true);
    expect(compareTemporals(alpha, "<=", beta, "TIME")).toBe(true);
    expect(compareTemporals(beta, ">=", alpha, "TIME")).toBe(true);
    expect(compareTemporals(alpha, "<=", alpha, "TIME")).toBe(true);
    expect(compareTemporals(beta, ">=", beta, "TIME")).toBe(true);
  });

  test("Millisecond differences in the same second are equal", () => {
    const alpha = new Date("2025-05-01T09:15:12.000");
    const beta = new Date("2025-05-02T09:15:12.999");
    expect(compareTemporals(alpha, "===", beta, "TIME")).toBe(true);
  });
});

describe("Edge cases and specific behaviours", () => {
  test("Comparisons do not mutate the input Date objects", () => {
    const alpha = new Date("2025-05-01 9:15:12");
    const beta = new Date("2025-05-01 9:15:13");

    const alphaBefore = alpha.toISOString();
    const betaBefore = beta.toISOString();

    compareTemporals(alpha, "===", beta);

    expect(alpha.toISOString()).toBe(alphaBefore);
    expect(beta.toISOString()).toBe(betaBefore);
  });

  test("Handles invalid Date objects", () => {
    const valid = new Date();
    const invalid = new Date("invalid");
    expect(compareTemporals(valid, "<", invalid)).toBe(false);
  });
});
