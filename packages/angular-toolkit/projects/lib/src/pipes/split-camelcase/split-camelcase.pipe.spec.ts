/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { SplitCamelCasePipe } from "./split-camelcase.pipe";

describe("SplitCamelCasePipe", () => {
  const pipe = new SplitCamelCasePipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("splits a camelCase string into capitalised words", () => {
    expect(pipe.transform("theCamelCaseString")).toBe("The Camel Case String");
  });

  it("capitalises the first word", () => {
    expect(pipe.transform("camelCase")).toBe("Camel Case");
  });

  it("returns an empty string when given an empty string", () => {
    expect(pipe.transform("")).toBe("");
  });
});
