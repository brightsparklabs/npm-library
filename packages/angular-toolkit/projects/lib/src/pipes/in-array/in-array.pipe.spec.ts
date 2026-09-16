/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { InArrayPipe } from "./in-array.pipe";

describe("InArrayPipe", () => {
  const pipe = new InArrayPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("returns `true` when the value is present in the array", () => {
    expect(pipe.transform("Fred", ["Fred", "Jane"])).toBe(true);
  });

  it("returns `false` when the value is not present in the array", () => {
    expect(pipe.transform("Bob", ["Fred", "Jane"])).toBe(false);
  });

  it("returns `false` for an empty array", () => {
    expect(pipe.transform("Fred", [])).toBe(false);
  });

  it("uses strict equality and does not deep compare objects", () => {
    expect(pipe.transform({ id: 1 }, [{ id: 1 }])).toBe(false);
  });
});
