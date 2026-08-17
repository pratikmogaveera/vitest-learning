import { add, capitalize, isEven, multiply, subtract } from './utils';

describe('Pure Functions', () => {
  it('returns sum of 2 numbers', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  it('returns difference when first number is greater', () => {
    const result = subtract(5, 3);
    expect(result).toBe(2);
  });

  it('returns negative when second number is greater', () => {
    const result = subtract(3, 5);
    expect(result).toBe(-2);
  });

  it('returns product of 2 numbers', () => {
    const result = multiply(2, 3);
    expect(result).toBe(6);
  });

  it('returns true if a number is even', () => {
    const result = isEven(2);
    expect(result).toBe(true);
  });

  it('returns false if a number is odd', () => {
    const result = isEven(3);
    expect(result).toBe(false);
  });

  it('returns capitalized string', () => {
    const result = capitalize('john');
    expect(result).toBe('John');
  });
});
