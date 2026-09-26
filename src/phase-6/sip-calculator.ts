export const calculateSip = (monthlySipAmount: number, tenureInMonths: number, annualReturnsRate: number): number => {
  if (monthlySipAmount < 500) throw new Error('Minimum monthly SIP amount is ₹500');
  if (tenureInMonths < 1) throw new Error('Tenure (months) cannot be less than 1');
  if (annualReturnsRate < 0) throw new Error('Annual return rate cannot be negative');
  if (annualReturnsRate === 0) return monthlySipAmount * tenureInMonths;

  const r = Math.pow(1 + annualReturnsRate / 100, 1 / 12) - 1;
  const maturityAmount = monthlySipAmount * ((Math.pow(r + 1, tenureInMonths) - 1) / r) * (r + 1);
  const result = Number(maturityAmount.toFixed(2));

  return result;
};
