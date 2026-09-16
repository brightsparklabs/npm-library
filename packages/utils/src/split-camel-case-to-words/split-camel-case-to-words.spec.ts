/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { describe, expect, test } from "vitest";
import { splitCamelCaseToWords } from "./split-camel-case-to-words";

describe("splitCamelCaseToWords", () => {
  test("splits a camelCase string into capitalised words", () => {
    expect(splitCamelCaseToWords("theCamelCaseString")).toBe("The Camel Case String");
  });

  test("capitalises the first word", () => {
    expect(splitCamelCaseToWords("helloWorld")).toBe("Hello World");
  });

  test("capitalises a single character", () => {
    expect(splitCamelCaseToWords("a")).toBe("A");
  });

  test("returns an empty string when given an empty string", () => {
    expect(splitCamelCaseToWords("")).toBe("");
  });

  test("normalises consecutive capitals into a single capitalised word", () => {
    expect(splitCamelCaseToWords("parseHTMLString")).toBe("Parse Html String");
  });

  test("leaves an already split string unchanged", () => {
    expect(splitCamelCaseToWords("already Split")).toBe("Already Split");
  });
});
