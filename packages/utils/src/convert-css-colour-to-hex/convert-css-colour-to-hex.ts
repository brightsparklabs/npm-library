/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isAbsent } from "../is-absent/is-absent";

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Converts the given CSS compatible colour to its HEX equivalent. Default to #000000 for invalid
 * colours.
 *
 * - `"red"` -> `"#ff0000"`
 * - `"rgb(123,234,142)"` -> `"#7bea8e"`.
 *
 * @param cssColour A CSS colour string.
 * @returns The colour as a hex code.
 */
export function convertCSSColourToHex(cssColour: string): string {
  const ctx = document.createElement("canvas").getContext("2d");
  if (isAbsent(ctx)) {
    return "#000000"; // If context creation fails, then return default.
  }
  ctx.fillStyle = cssColour;
  return ctx.fillStyle;
}