/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { MapGetPipe } from "./map-get.pipe";

describe("MapGetPipe", () => {
  const pipe = new MapGetPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("returns the value associated with the key", () => {
    const map = new Map([["foo", "bar"]]);
    expect(pipe.transform(map, "foo")).toBe("bar");
  });

  it("returns `undefined` when the key is not present", () => {
    const map = new Map([["foo", "bar"]]);
    expect(pipe.transform(map, "missing")).toBeUndefined();
  });

  it("returns `undefined` for an empty map", () => {
    expect(pipe.transform(new Map(), "foo")).toBeUndefined();
  });
});
