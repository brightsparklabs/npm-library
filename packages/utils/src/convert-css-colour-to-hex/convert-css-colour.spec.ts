/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { convertCSSColourToHex } from "./convert-css-colour-to-hex";
import { expect, test } from "vitest";

test("colour converts from css colour string to hex", () => {
  expect(convertCSSColourToHex("red")).toBe("#ff0000");
});

test("colour converts from rgb to hex", () => {
  expect(convertCSSColourToHex("rgb(123,234,142)")).toBe("#7bea8e");
});

test("colour converts from hsl to hex", () => {
  expect(convertCSSColourToHex("hsl(120, 100%, 50%)")).toBe("#00ff00");
});

test("colour converts shorthand hex", () => {
  expect(convertCSSColourToHex("#f00")).toBe("#ff0000");
});

test("invalid input should return #000000", () => {
  expect(convertCSSColourToHex("colour")).toBe("#000000");
});

test("colour converts capital hex", () => {
  expect(convertCSSColourToHex("#FF0000")).toBe("#ff0000");
});

test("colour converts from css colour string in capitals to hex", () => {
  expect(convertCSSColourToHex("RED")).toBe("#ff0000");
});