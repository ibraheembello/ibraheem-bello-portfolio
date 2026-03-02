import { sendContactEmail } from '../../src/services/emailService';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
  }),
}));

describe('Email Service', () => {
  it('should send email without throwing', async () => {
    await expect(
      sendContactEmail({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message for the portfolio',
      })
    ).resolves.not.toThrow();
  });

  it('should handle email with special characters in name', async () => {
    await expect(
      sendContactEmail({
        name: "O'Brien & Co.",
        email: 'obrien@test.com',
        message: 'Testing special characters in the name field',
      })
    ).resolves.not.toThrow();
  });

  it('should handle long messages', async () => {
    await expect(
      sendContactEmail({
        name: 'Long Message User',
        email: 'long@test.com',
        message: 'A'.repeat(1000),
      })
    ).resolves.not.toThrow();
  });
});
