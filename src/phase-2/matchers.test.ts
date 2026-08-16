import { checkArray, checkEquality, checkFalsy, checkMatchingObject, checkTruthy, divide, getUser } from './matchers';

describe('Array and Object', () => {
  // Ignores undefined
  it('checks if response contains value for key', () => {
    const response = checkEquality();
    expect(response).toEqual({ key: 'value' });
  });

  // Checks for undefined too
  it('checks if response contains value for key and undefined', () => {
    const response = checkEquality();
    expect(response).toStrictEqual({ key: 'value', strict: undefined });
  });

  it('checks if item is truthy', () => {
    const response = checkTruthy();
    expect(response).toBeTruthy();
  });

  it('checks if item is falsy', () => {
    const response = checkFalsy();
    expect(response).toBeFalsy();
  });

  it('checks if user with id: 1 exists', () => {
    const response = getUser(1);
    expect(response).toBeDefined();
  });

  it("checks if user with id: 2 doesn't exists", () => {
    const response = getUser(2);
    expect(response).toBeUndefined();
  });

  it('checks if array contains 0', () => {
    const response = checkArray();
    expect(response).toContain(0);
  });

  it('checks if array has length of 10', () => {
    const response = checkArray();
    expect(response).toHaveLength(10);
  });

  it('checks if object has required keys/values', () => {
    const response = checkMatchingObject();
    expect(response).toMatchObject({
      required1: true,
      required2: true,
    });
  });

  it('checks if denominator 0 in division throws', () => {
    expect(() => divide(1, 0)).toThrow('Cannot divide by 0');
  });
});
