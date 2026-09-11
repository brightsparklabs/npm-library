/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { IsArrayPipe } from "./is-array.pipe";

describe("IsArrayPipe", () => {
  const pipe = new IsArrayPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("returns `true` for an array", () => {
    expect(pipe.transform(["Fred", "Jane"])).toBe(true);
  });

  it("returns `true` for an empty array", () => {
    expect(pipe.transform([])).toBe(true);
  });

  it("returns `false` for a string", () => {
    expect(pipe.transform("Fred")).toBe(false);
  });

  it("returns `false` for an object", () => {
    expect(pipe.transform({ length: 1 })).toBe(false);
  });
});
