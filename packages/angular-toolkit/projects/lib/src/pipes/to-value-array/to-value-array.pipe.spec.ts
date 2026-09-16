/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { ToValueArrayPipe } from "./to-value-array.pipe";

describe("ToValueArrayPipe", () => {
  const pipe = new ToValueArrayPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("converts an object to an array of its values", () => {
    expect(pipe.transform({ foo: "bar", fizz: "buzz" })).toEqual(["bar", "buzz"]);
  });

  it("returns an empty array for an empty object", () => {
    expect(pipe.transform({})).toEqual([]);
  });

  it("supports non-string values", () => {
    expect(pipe.transform({ a: 1, b: 2 })).toEqual([1, 2]);
  });
});
