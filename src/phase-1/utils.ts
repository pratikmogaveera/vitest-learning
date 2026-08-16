export const add = (x: number, y: number): number => {
  return x + y;
};

export const subtract = (x: number, y: number): number => {
  return x - y;
};

export const multiply = (x: number, y: number): number => {
  return x * y;
};

export const isEven = (x: number): boolean => {
  return x % 2 === 0;
};

export const capitalize = (str: string): string => {
  const cleanString = str.trim();
  return cleanString[0].toUpperCase() + cleanString.slice(1);
};
