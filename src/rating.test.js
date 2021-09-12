import {
  enforceValidRating,
  getAverageRating,
  RATING_MAX,
  RATING_MIN,
} from "./rating";

describe(enforceValidRating, () => {
  it("handles ratings below RATING_MIN", () => {
    expect(enforceValidRating(-1)).toBe(RATING_MIN);
    expect(enforceValidRating(-100)).toBe(RATING_MIN);
  });

  it("handles ratings above RATING_MAX", () => {
    expect(enforceValidRating(5)).toBe(RATING_MAX);
    expect(enforceValidRating(6)).toBe(RATING_MAX);
    expect(enforceValidRating(100)).toBe(RATING_MAX);
  });

  it("handles ratings that don't conform to RATING_STEP", () => {
    expect(enforceValidRating(0.1)).toBe(0);
    expect(enforceValidRating(1.49)).toBe(1);
    expect(enforceValidRating(1.5)).toBe(2);
    expect(enforceValidRating(1.51)).toBe(2);
    expect(enforceValidRating(4.5)).toBe(5);
    expect(enforceValidRating(4.9)).toBe(5);
  });
});

describe(getAverageRating, () => {
  it("returns expected value", () => {
    expect(getAverageRating([1, 2])).toBe(1.5);
    expect(getAverageRating([1, 5])).toBe(3);
    expect(getAverageRating([2, 5])).toBe(3.5);
    expect(getAverageRating([3, 5])).toBe(4);
    expect(getAverageRating([5, 5])).toBe(5);

    // This value doesn't need to confirm to the valid ratings above
    expect(getAverageRating([1, 1, 2, 4, 5])).toBe(2.6);
    expect(getAverageRating([1, 1, 3, 3, 3, 5, 5, 5])).toBe(3.25);
  });
});
