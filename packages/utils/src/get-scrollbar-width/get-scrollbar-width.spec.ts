/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { afterEach, expect, test } from "vitest";
import { getScrollbarWidth, scrollbarWidth } from "./get-scrollbar-width";

/**
 * The number 15 is used as the expected values in the following tests.
 * This because 15 is the default scrollbar width in pixels in the Chromium browser.
 */

/** Remove temporary scrollbars created in some tests to override the default scrollbar. */
afterEach(() => {
  let tempScrollbarElement = document.head.querySelector('style');
  if (tempScrollbarElement) {
    document.head.removeChild(tempScrollbarElement);
  };
});
  
test("No cached value exists, calculate and cache the value", () => {
  resetCachedScrollbarWidth();
  expect(getScrollbarWidth()).toBe(15);
});

test("Cached value exists, ensure it changes when updated", () => {
  /** Change width of the scrollbar to 14 pixels. Then ensure that this new width is returned. */
  setScrollbarWidth(14);
  expect(getScrollbarWidth(true)).toBe(14);
});

test("No cached value exists, passing true update flag. Returns new value", () => {
  resetCachedScrollbarWidth();
  expect(getScrollbarWidth(true)).toBe(15);
});

test("Cached value already exists, return it", () => {
  expect(getScrollbarWidth()).toBe(15);
});

test("Created DOM elements deleted after running util, cached value exists", () => {
  const countBefore = document.querySelectorAll("div").length;
  getScrollbarWidth();
  const countAfter = document.querySelectorAll("div").length;
  expect(countBefore).toBe(countAfter);
});

test("Created DOM elements deleted after running util, cached value doesn't exist", () => {
  resetCachedScrollbarWidth();
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
function setScrollbarWidth(
  width: number
): void {

  /** Create a temporary element to override the scrollbar width. */
  const styleElem = document.createElement("style");
  document.head.appendChild(styleElem);
  styleElem.innerHTML = `
      ::-webkit-scrollbar {
          width: ${width}px !important;
      }
  `;
};

/**
 * Resets the cached value of {@link scrollbarWidth.cachedScrollbarWidth} back to undefined.
 * Necessary for testing the behaviour of {@link getScrollbarWidth} with an undefined cache value.
 */
export function resetCachedScrollbarWidth(): void {
    scrollbarWidth.cachedScrollbarWidth = undefined;
};