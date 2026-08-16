export const checkEquality = () => {
  return {
    key: 'value',
    strict: undefined,
  };
};

export const checkTruthy = () => {
  const truthyItems = [1, true, 'xyz', {}, []];
  const randomItem = truthyItems[Math.floor(Math.random() * truthyItems.length)];
  return randomItem;
};

export const checkFalsy = () => {
  const falsyItems = [0, false, ''];
  const randomItem = falsyItems[Math.floor(Math.random() * falsyItems.length)];
  return randomItem;
};

export const checkArray = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
};

export const checkMatchingObject = () => {
  return {
    required1: true,
    required2: true,
    ignore1: true,
  };
};

export const getUser = (id: number) => {
  const db: Record<number, string> = { 1: 'Pratik' };
  return db[id];
};

export const divide = (x: number, y: number) => {
  if (y === 0) throw new Error('Cannot divide by 0');
  return x / y;
};
