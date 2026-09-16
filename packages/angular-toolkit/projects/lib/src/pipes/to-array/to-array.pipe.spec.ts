/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { ToArrayPipe } from "./to-array.pipe";

describe("ToArrayPipe", () => {
  const pipe = new ToArrayPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("converts a Set to an array", () => {
    expect(pipe.transform(new Set(["Foo", "Bar"]))).toEqual(["Foo", "Bar"]);
  });

  it("returns a new array from an existing array", () => {
    const input = ["Foo", "Bar"];
    const result = pipe.transform(input);
    expect(result).toEqual(["Foo", "Bar"]);
    expect(result).not.toBe(input);
  });

  it("converts an array-like value to an array", () => {
    expect(pipe.transform({ length: 2, 0: "Foo", 1: "Bar" })).toEqual(["Foo", "Bar"]);
  });

  it("returns an empty array for an empty Set", () => {
    expect(pipe.transform(new Set())).toEqual([]);
  });
});
