import { scoreCulc } from "./scoreCulc";
import { shuffle } from "./shuffle";

test('for scoreCulc: "5" of array.length=13 equel 38', () => {
  expect(scoreCulc("5", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])).toBe(38);
});

test("for scoreCulc: empty anwsers array", () => {
  expect(scoreCulc("5", [])).toBe(0);
});

describe("shuffle", () => {
  test(" for not empty array should contain same elements", () => {
    const inputArr = ["one", "two", "three"];
    expect(shuffle(inputArr)).toContain("one", "two", "three");
  });
  test("for empty array ", () => {
    const inputArr = [];
    expect(shuffle(inputArr)).toEqual([]);
  });
});
