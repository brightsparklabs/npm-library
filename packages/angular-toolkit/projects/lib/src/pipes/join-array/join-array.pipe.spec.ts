/**
 * Created by brightSPARK Labs
 * www.brightsparklabs.com.
 */

import { JoinArrayPipe } from "./join-array.pipe";

describe("JoinArrayPipe", () => {
  const pipe = new JoinArrayPipe();

  it("should create", () => {
    expect(pipe).toBeTruthy();
  });

  it("joins the array with the given separator", () => {
    expect(pipe.transform(["a", "b", "c"], ", ")).toBe("a, b, c");
  });

  it("returns an empty string for an empty array", () => {
    expect(pipe.transform([], ", ")).toBe("");
  });

  it("returns the single element for a one-element array", () => {
    expect(pipe.transform(["a"], ", ")).toBe("a");
  });

  it("supports non-string separators being coerced", () => {
    expect(pipe.transform([1, 2, 3], "-")).toBe("1-2-3");
  });
});
