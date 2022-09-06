import { arraysEquality } from "./ararysEquality.js";

describe("for arraysEquality", () => {
  test("for equal array", () => {
    expect(arraysEquality([1, 2, 3], [1, 2, 3])).toBe(true);
  });
});
