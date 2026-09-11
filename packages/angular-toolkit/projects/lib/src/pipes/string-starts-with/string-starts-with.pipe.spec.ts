/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { StartsWithPipe } from "./string-starts-with.pipe";

describe("StartsWithPipe", () => {
  const pipe = new StartsWithPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("returns `true` when the string starts with the substring", () => {
    expect(pipe.transform("fooBar", "foo")).toBe(true);
  });

  it("returns `false` when the string does not start with the substring", () => {
    expect(pipe.transform("fooBar", "Bar")).toBe(false);
  });

  it("returns `true` when checking against an empty substring", () => {
    expect(pipe.transform("fooBar", "")).toBe(true);
  });
});
