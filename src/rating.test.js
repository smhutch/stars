import { enforceValidRating, RATING_MAX, RATING_MIN } from "./rating";

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
