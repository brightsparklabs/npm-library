/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { getScrollbarWidth } from "./get-scrollbar-width";

/**
 * The number 15 is used as the expected values in the following tests.
 * This because 15 is the default scrollbar width in pixels in the Chromium browser.
 */

test("No cached value exists, calculate and cache the value", () => {
  expect(getScrollbarWidth()).toBe(15);
});

test("No cached value exists, passing true update flag. Returns new value", () => {
  setCachedScrollbarWidth(undefined);
  expect(getScrollbarWidth(true)).toBe(15);
})

test("Cached value already exists, return it", () => {
  getScrollbarWidth()
  expect(getScrollbarWidth()).toBe(15);
});

test("Cached value exists, ensure it changes when updated", () => {
  getScrollbarWidth();
  /** Change width of the scrollbar to 14 pixels. Then ensure that this new width is returned. */
  setCachedScrollbarWidth(14);
  expect(getScrollbarWidth(true)).toBe(14);
});

test("Created DOM elements deleted after running util", () => {
  const countBefore = document.querySelectorAll("div").length;
  getScrollbarWidth();
  const countAfter = document.querySelectorAll("div").length;
  expect(countBefore).toBe(countAfter);
});

/**
 * A function used for testing to achieve different values for scrollbar width.
 * It overrides the default scrollbar with a scrollbar of width equal to {@link width} pixels.
 * Useful to check whether {@link getScrollbarWidth} behaves correctly when updating the cached 
 * value.
 * 
 * @param width A number, the value to override the scrollbar pixel width to.
 */
function setCachedScrollbarWidth(
  width: number | undefined
): void {

  /** Create a temporary element to alter the scrollbar width. */
  const styleElem = document.createElement("style");
  document.head.appendChild(styleElem);
  styleElem.innerHTML = `
      ::-webkit-scrollbar {
          width: ${width}px !important;
      }
  `;
}


