/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { HasValuePipe } from "./has-value.pipe";

describe("HasValuePipe", () => {
  const pipe = new HasValuePipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("returns `true` for a non-empty string", () => {
    expect(pipe.transform("hello")).toBe(true);
  });

  it("returns `false` for an empty string", () => {
    expect(pipe.transform("")).toBe(false);
  });

  it("returns `false` for `null`", () => {
    expect(pipe.transform(null)).toBe(false);
  });

  it("returns `false` for `undefined`", () => {
    expect(pipe.transform(undefined)).toBe(false);
  });

  it("returns `true` for a non-null object", () => {
    expect(pipe.transform({ foo: "bar" })).toBe(true);
  });

  it("returns `true` for zero", () => {
    expect(pipe.transform(0)).toBe(true);
  });
});
