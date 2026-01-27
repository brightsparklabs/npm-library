/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { convertCSSColourToHex } from "./convert-css-colour-to-hex";
import { expect, test } from "playwright/test";

// Resolving type errors where the playwright window did not expect the function
declare global {
  interface Window {
    convertCSSColourToHex: (colour: string) => string
  }
}

/*
 * Playwright seems to require functions to be defined in the 'page' context
 * Instead of writing the entire function in every single test, inject it like so
 */
test.beforeEach(async ({ page }) => {
  await page.addInitScript({
    content: `
      window.convertCSSColourToHex = ${convertCSSColourToHex.toString()}
    `
  })
});

test("colour converts from css colour string to hex", async ({ page }) => {
  await page.goto('about:blank');

  const result = await page.evaluate(async () => {
    return window.convertCSSColourToHex("red");
  });

  expect(result).toBe("#ff0000");
});

test("colour converts from rgb to hex", async ({ page }) => {
  await page.goto('about:blank');

  const result = await page.evaluate(async () => {
    return window.convertCSSColourToHex("rgb(123,234,142)");
  });

  expect(result).toBe("#7bea8e");
});

test("colour converts from hsl to hex", async ({ page }) => {
  await page.goto('about:blank');

  const result = await page.evaluate(async () => {
    return window.convertCSSColourToHex("hsl(120, 100%, 50%)");
  });

  expect(result).toBe("#00ff00");
});

test("colour converts shorthand hex", async ({ page }) => {
  await page.goto('about:blank');

  const result = await page.evaluate(async () => {
    return window.convertCSSColourToHex("#f00");
  });

  expect(result).toBe("#ff0000");
});

test("invalid input should return #000000", async ({ page }) => {
  await page.goto('about:blank');

  const result = await page.evaluate(async () => {
    return window.convertCSSColourToHex("colour");
  });

  expect(result).toBe("#000000");
});