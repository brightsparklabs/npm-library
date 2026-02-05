/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { getScrollbarWidth, setCachedScrollbarWidth } from "./get-scrollbar-width";

test("No cached value exists, calculate and cache the value", () => {
  /** Set the cached value to undefined for testing. */
  setCachedScrollbarWidth(undefined);
  expect(getScrollbarWidth()).toBe(15);
});

test("Cached value already exists, return it", () => {
  expect(getScrollbarWidth()).toBe(15);
});

test("Cached value exists, ensure it changes when updated", () => {
  setCachedScrollbarWidth(14);
  expect(getScrollbarWidth(true)).toBe(15);
});

test("No cached value exists, passing true update flag. Returns new value", () => {
  /** Set the cached value to undefined for testing. */
  setCachedScrollbarWidth(undefined);
  expect(getScrollbarWidth(true)).toBe(15);
})

test("Created DOM elements deleted after running util", () => {
  const countBefore = document.querySelectorAll("div").length;
  getScrollbarWidth();
  const countAfter = document.querySelectorAll("div").length;
  expect(countBefore).toBe(countAfter);
});