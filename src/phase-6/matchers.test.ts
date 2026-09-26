import { divide } from '../phase-2/matchers';

describe('divide — parametrized cases', () => {
  test.each([
    { x: 4, y: 2, expected: 2 },
    { x: 5, y: 2, expected: 2.5 },
    { x: 0, y: 100, expected: 0 },
    { x: 4, y: -2, expected: -2 },
  ])('divide $x by $y and returns $expected', ({ x, y, expected }) => {
    expect(divide(x, y)).toBe(expected);
  });
});
