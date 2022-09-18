const arraysEquality = require("./arraysEquality");

describe("for arraysEquality", () => {
  test("for equal array", () => {
    expect(arraysEquality([1, 2, 3], [1, 2, 3])).toBe(true);
  });
  test("for unequal array", () => {
    expect(arraysEquality([1, 2, 3], [1, 4])).toBe(false);
  });
});
