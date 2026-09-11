/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { capitaliseFirstLetter } from "./capitalise-first-letter";

describe("capitaliseFirstLetter", () => {
  test("capitalises the first letter of a lowercase word", () => {
    expect(capitaliseFirstLetter("hello")).toBe("Hello");
  });

  test("leaves an already capitalised word unchanged", () => {
    expect(capitaliseFirstLetter("Hello")).toBe("Hello");
  });

  test("only capitalises the first letter, leaving the rest untouched", () => {
    expect(capitaliseFirstLetter("hELLO")).toBe("HELLO");
  });

  test("capitalises the first letter of a single character", () => {
    expect(capitaliseFirstLetter("a")).toBe("A");
  });

  test("returns an empty string when given an empty string", () => {
    expect(capitaliseFirstLetter("")).toBe("");
  });

  test("leaves a string starting with a non-letter unchanged", () => {
    expect(capitaliseFirstLetter("123abc")).toBe("123abc");
  });

  test("does not alter leading whitespace", () => {
    expect(capitaliseFirstLetter(" hello")).toBe(" hello");
  });

  test("preserves the remainder of a multi-word string", () => {
    expect(capitaliseFirstLetter("hello world")).toBe("Hello world");
  });
});
