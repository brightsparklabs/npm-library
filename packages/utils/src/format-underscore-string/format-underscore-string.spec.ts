/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { formatUnderscoreString } from "./format-underscore-string";

describe("formatUnderscoreString", () => {
  test("converts an UNDERSCORE_STRING to Title Case words", () => {
    expect(formatUnderscoreString("UNDERSCORE_STRING")).toBe("Underscore String");
  });

  test("converts a multi-word underscore string to Title Case", () => {
    expect(formatUnderscoreString("HELLO_WORLD")).toBe("Hello World");
  });

  test("converts a single word to Title Case", () => {
    expect(formatUnderscoreString("SINGLE")).toBe("Single");
  });

  test("handles an already lowercase underscore string", () => {
    expect(formatUnderscoreString("foo_bar")).toBe("Foo Bar");
  });

  test("collapses consecutive underscores into a single space", () => {
    expect(formatUnderscoreString("FOO__BAR")).toBe("Foo Bar");
  });

  test("returns an empty string when given an empty string", () => {
    expect(formatUnderscoreString("")).toBe("");
  });
});
