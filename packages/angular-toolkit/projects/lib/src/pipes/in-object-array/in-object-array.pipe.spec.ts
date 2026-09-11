/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { InObjectArrayPipe } from "./in-object-array.pipe";

describe("InObjectArrayPipe", () => {
  const pipe = new InObjectArrayPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("returns `true` when a deeply equal object is present", () => {
    const array = [{ name: "Fred", id: 13 }];
    expect(pipe.transform({ name: "Fred", id: 13 }, array)).toBe(true);
  });

  it("returns `false` when no deeply equal object is present", () => {
    const array = [{ name: "Fred", id: 13 }];
    expect(pipe.transform({ name: "Fred", id: 99 }, array)).toBe(false);
  });

  it("returns `false` for an empty array", () => {
    expect(pipe.transform({ name: "Fred" }, [])).toBe(false);
  });
});
