/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { CapitaliseFirstLetterPipe } from "./capitalise-first-letter.pipe";

describe("CapitaliseFirstLetterPipe", () => {
  const pipe = new CapitaliseFirstLetterPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("capitalises the first letter of a lowercase word", () => {
    expect(pipe.transform("hello")).toBe("Hello");
  });

  it("leaves an already capitalised word unchanged", () => {
    expect(pipe.transform("Hello")).toBe("Hello");
  });

  it("returns an empty string when given an empty string", () => {
    expect(pipe.transform("")).toBe("");
  });
});
