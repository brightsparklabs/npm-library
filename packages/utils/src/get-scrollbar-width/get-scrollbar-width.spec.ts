/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { getScrollbarWidth } from "./get-scrollbar-width";

// This should calculate the scrollbar width and return it
test("Success case, no cached value", () => {
  expect(getScrollbarWidth()).toBe(15);
});

// This should just return the cached valued
// test("Success case, cached value", () => {
//   expect(getScrollbarWidth()).toBe();
// });