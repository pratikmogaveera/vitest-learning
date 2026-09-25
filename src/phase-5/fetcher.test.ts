import axios from 'axios';
import { getUserByUserId } from './fetcher';

const mockUser = { id: 1, name: 'Alice' };
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Testing with mock modules', () => {
  it("checks if response contains requested user's data", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockUser });
    await expect(getUserByUserId(1)).resolves.toMatchObject({ id: 1 });
  });

  it('checks if request resolves for correct value', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockUser });
    await getUserByUserId(1);
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
  });

  it('checks if request rejects', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('This is a mock reject'));
    await expect(getUserByUserId(1)).rejects.toThrow('This is a mock reject');
  });
});
