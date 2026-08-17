// Using any for testing purpose.
export const getUser = async (userId: any) => {
  await delay(200);
  if (typeof userId !== 'number') throw new Error('Please enter valid user-id');
  return 'John Doe';
};

const delay = (duration: number = 300) => {
  return new Promise<void>((resolve) => setTimeout(resolve, duration));
};
