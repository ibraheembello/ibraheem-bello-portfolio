export const createValidContactPayload = (overrides = {}) => ({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, I would like to discuss a project with you.',
  ...overrides,
});

export const createInvalidContactPayloads = () => ({
  emptyName: createValidContactPayload({ name: '' }),
  shortName: createValidContactPayload({ name: 'A' }),
  longName: createValidContactPayload({ name: 'A'.repeat(101) }),
  emptyEmail: createValidContactPayload({ email: '' }),
  invalidEmail: createValidContactPayload({ email: 'not-an-email' }),
  emptyMessage: createValidContactPayload({ message: '' }),
  shortMessage: createValidContactPayload({ message: 'Hi' }),
  longMessage: createValidContactPayload({ message: 'A'.repeat(1001) }),
  xssAttempt: createValidContactPayload({
    name: '<script>alert("xss")</script>',
    message: '<img onerror="alert(1)" src=x>',
  }),
  sqlInjection: createValidContactPayload({
    name: "'; DROP TABLE users; --",
    email: 'test@example.com',
    message: "' OR '1'='1'; DROP TABLE messages; --",
  }),
});
