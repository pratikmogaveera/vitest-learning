import { calculateSip } from './sip-calculator';

describe('testing SIP calculator', () => {
  it('checks invalid monthly sip amount.', () => {
    expect(() => calculateSip(100, 1, 10)).toThrow('Minimum monthly SIP amount is ₹500');
  });

  it('checks invalid tenure.', () => {
    expect(() => calculateSip(500, 0, 10)).toThrow('Tenure (months) cannot be less than 1');
  });

  it('checks invalid annual rate of return.', () => {
    expect(() => calculateSip(500, 1, -1)).toThrow('Annual return rate cannot be negative');
  });

  it('checks maturity amount for 0 annual rate of interest.', () => {
    expect(calculateSip(500, 1, 0)).toBe(500);
  });

  test.each([
    { sip: 500, tenure: 1, returns: 10, expected: 503.99 },
    { sip: 500, tenure: 12, returns: 10, expected: 6320.27 },
    { sip: 1000, tenure: 24, returns: 12, expected: 27064.98 },
    { sip: 5000, tenure: 60, returns: 15, expected: 436710.38 },
    { sip: 15000, tenure: 36, returns: 8, expected: 609376.22 },
  ])(
    'checks maturity amount for valid input, sip:$sip tenure:$tenure returns:$returns',
    ({ sip, tenure, returns, expected }) => {
      expect(calculateSip(sip, tenure, returns)).toBe(expected);
    },
  );
});
