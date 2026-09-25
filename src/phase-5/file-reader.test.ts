import { readFileSync } from 'fs';
import { readFileFromSystem } from './file-reader';

const mockFileContent = 'strong-mocking-actual-content';
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Testing with mock built-in modules', () => {
  it('checks if the function returns the file contents', () => {
    vi.mocked(readFileSync).mockReturnValue(mockFileContent);
    const response = readFileFromSystem('./mock-file.txt');
    expect(response).toBe(mockFileContent);
  });

  it('checks if the function propogates the error', () => {
    vi.mocked(readFileSync).mockImplementation(() => {
      throw new Error('Some error occured while reading the file');
    });
    expect(() => readFileFromSystem('./mock-file.txt')).toThrow('Some error occured while reading the file');
  });
});
