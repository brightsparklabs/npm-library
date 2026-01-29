/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { expect, test } from "vitest";
import { convertCSSColourToHex } from "./convert-css-colour-to-hex";

test("Colour converts from css colour string to hex", () => {
  expect(convertCSSColourToHex("red")).toBe("#ff0000");
});

test("Colour converts from rgb to hex", () => {
  expect(convertCSSColourToHex("rgb(123,234,142)")).toBe("#7bea8e");
});

test("Colour converts from hsl to hex", () => {
  expect(convertCSSColourToHex("hsl(120, 100%, 50%)")).toBe("#00ff00");
});

test("Colour converts shorthand hex", () => {
  expect(convertCSSColourToHex("#f00")).toBe("#ff0000");
});

test("Invalid input should return #000000", () => {
  expect(convertCSSColourToHex("colour")).toBe("#000000");
});

test("Colour converts capital hex", () => {
  expect(convertCSSColourToHex("#FF0000")).toBe("#ff0000");
});

test("Colour converts from css colour string in capitals to hex", () => {
  expect(convertCSSColourToHex("RED")).toBe("#ff0000");
});

test("Canvas element should be deleted after running the util", () => {
  const countBefore = document.querySelectorAll("canvas").length;
  convertCSSColourToHex("red");
  const countAfter = document.querySelectorAll("canvas").length;
  expect(countBefore).toBe(countAfter);
});
