/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { ArrayMapPipe } from "./array-map.pipe";

describe("ArrayMapPipe", () => {
  const pipe = new ArrayMapPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("maps an array by a top-level property", () => {
    const values = [{ name: "John Smith" }, { name: "Jane Smith" }];
    expect(pipe.transform(values, "name")).toEqual(["John Smith", "Jane Smith"]);
  });

  it("maps an array by a nested `.` delimited property", () => {
    const values = [{ data: { name: "John Smith" } }, { data: { name: "Jane Smith" } }];
    expect(pipe.transform(values, "data.name")).toEqual(["John Smith", "Jane Smith"]);
  });

  it("returns `undefined` for entries missing the property", () => {
    const values = [{ name: "John Smith" }, { other: "value" }];
    expect(pipe.transform(values, "name")).toEqual(["John Smith", undefined]);
  });

  it("returns an empty array when values is `undefined`", () => {
    expect(pipe.transform(undefined, "name")).toEqual([]);
  });

  it("returns an empty array when values is empty", () => {
    expect(pipe.transform([], "name")).toEqual([]);
  });
});
