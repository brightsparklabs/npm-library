/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { HasPipe } from "./has.pipe";

describe("HasPipe", () => {
  const pipe = new HasPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("returns `true` when the set contains the value", () => {
    expect(pipe.transform(new Set(["foo", "bar"]), "foo")).toBe(true);
  });

  it("returns `false` when the set does not contain the value", () => {
    expect(pipe.transform(new Set(["foo", "bar"]), "baz")).toBe(false);
  });

  it("returns `false` when the set is `undefined`", () => {
    expect(pipe.transform(undefined as unknown as Set<unknown>, "foo")).toBe(false);
  });

  it("returns `false` for an empty set", () => {
    expect(pipe.transform(new Set(), "foo")).toBe(false);
  });
});
