import { NotifierService } from './notifier-service';

const mockSend = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Testing DI in classes', () => {
  it('checks if send() was called only once', () => {
    const ns = new NotifierService({ send: mockSend });
    ns.notify('test@mock.com', 'Hello Mock user.');
    expect(mockSend).toHaveBeenCalledOnce();
  });

  it('checks if send() was called with correct arguments', () => {
    const ns = new NotifierService({ send: mockSend });
    ns.notify('test@mock.com', 'Hello Mock user.');
    expect(mockSend).toHaveBeenCalledWith('test@mock.com', 'Hello Mock user.');
  });
});
