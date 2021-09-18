import { getStarFillsForRating } from "./stars";

describe(getStarFillsForRating, () => {
  const roundCases = [
    [0, ["empty", "empty", "empty", "empty", "empty"]],
    [0.1, ["empty", "empty", "empty", "empty", "empty"]],
    [0.5, ["half", "empty", "empty", "empty", "empty"]],
    [0.9, ["full", "empty", "empty", "empty", "empty"]],
    [1, ["full", "empty", "empty", "empty", "empty"]],
    [2, ["full", "full", "empty", "empty", "empty"]],
    [3, ["full", "full", "full", "empty", "empty"]],
    [4, ["full", "full", "full", "full", "empty"]],
    [4.1, ["full", "full", "full", "full", "empty"]],
    [4.4, ["full", "full", "full", "full", "half"]],
    [4.5, ["full", "full", "full", "full", "half"]],
    [4.6, ["full", "full", "full", "full", "half"]],
    [4.9, ["full", "full", "full", "full", "full"]],
    [5, ["full", "full", "full", "full", "full"]],
  ];

  it.each(roundCases)("%s returns %s", (rating, array) => {
    expect(getStarFillsForRating(rating)).toStrictEqual(array);
  });
});
