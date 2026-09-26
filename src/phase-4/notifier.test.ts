import { notifyUser, sendEmail } from './notifier';

const mockEmailAndMessage = { email: 'mock@email.com', message: 'Hello Mock User, your account is ready.' };
const mockUser = { id: 1, name: 'Mock User', email: 'mock@email.com' };

const mockSendEmail = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  notifyUser(mockUser, mockSendEmail);
});

describe('Testing with mock functions', () => {
  it('checks if `sendEmail` returns correct response', () => {
    const response = sendEmail(mockEmailAndMessage.email, mockEmailAndMessage.message);
    expect(response).toEqual({
      success: true,
      ...mockEmailAndMessage,
    });
  });

  it('checks if `sendEmail` was called exactly once', () => {
    expect(mockSendEmail).toHaveBeenCalledOnce();
  });

  it('checks if `sendEmail` was called with correct email', () => {
    expect(mockSendEmail).toHaveBeenCalledWith(mockUser.email, expect.anything());
  });

  it('checks if `sendEmail` was called with correct message', () => {
    expect(mockSendEmail).toHaveBeenCalledWith(expect.anything(), mockEmailAndMessage.message);
  });

  it('checks if return value of `notifyUser` matches what `sendEmail` returns', () => {
    const expected = { success: true, email: mockUser.email, message: mockEmailAndMessage.message };
    mockSendEmail.mockReturnValue(expected);
    expect(notifyUser(mockUser, mockSendEmail)).toEqual(expected);
  });
});
