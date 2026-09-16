/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { FormatUnderscorePipe } from "./format-underscore.pipe";

describe("FormatUnderscorePipe", () => {
  const pipe = new FormatUnderscorePipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("converts an UNDERSCORE_STRING to Title Case words", () => {
    expect(pipe.transform("UNDERSCORE_STRING")).toBe("Underscore String");
  });

  it("converts a single word to Title Case", () => {
    expect(pipe.transform("SINGLE")).toBe("Single");
  });

  it("returns an empty string when given an empty string", () => {
    expect(pipe.transform("")).toBe("");
  });
});
