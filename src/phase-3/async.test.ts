import { getUser } from './async';

describe('Async test', () => {
  it('resolves with user: async/await', async () => {
    const response = await getUser(1);
    expect(response).toBe('John Doe');
  });

  it('resolves with user: .resolves', async () => {
    await expect(getUser(1)).resolves.toBe('John Doe');
  });

  it('rejects on invalid user-id: .rejects', async () => {
    await expect(getUser(null)).rejects.toThrow('Please enter valid user-id');
  });

  it('resolves with user: older pattern', () => {
    return getUser(1).then((result) => expect(result).toBe('John Doe'));
  });

  it('rejects on invalid user-id: older pattern', () => {
    return getUser(null).catch((err) => expect(err.message).toBe('Please enter valid user-id'));
  });

  it('checks truthfullness of response without await', async () => {
    const response = getUser(1);
    expect(response).toBeTruthy();
  });
});
