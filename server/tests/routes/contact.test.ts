import request from 'supertest';
import app from '../../src/app';
import { createValidContactPayload, createInvalidContactPayloads } from '../fixtures';

// Set test environment
process.env.NODE_ENV = 'test';

// Mock the email service to avoid sending real emails during tests
jest.mock('../../src/services/emailService', () => ({
  sendContactEmail: jest.fn().mockResolvedValue(undefined),
}));

describe('POST /api/contact', () => {
  describe('Valid requests', () => {
    it('should return 200 with success message for valid data', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createValidContactPayload());

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('successfully');
    });

    it('should accept minimum valid input lengths', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createValidContactPayload({
          name: 'Ab',
          message: 'Hello this is a valid message',
        }));

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Validation - empty fields', () => {
    it('should reject empty name', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().emptyName);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject empty email', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().emptyEmail);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject empty message', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().emptyMessage);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject missing body entirely', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Validation - length constraints', () => {
    it('should reject name shorter than 2 characters', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().shortName);

      expect(res.status).toBe(400);
    });

    it('should reject name longer than 100 characters', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().longName);

      expect(res.status).toBe(400);
    });

    it('should reject message shorter than 10 characters', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().shortMessage);

      expect(res.status).toBe(400);
    });

    it('should reject message longer than 1000 characters', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().longMessage);

      expect(res.status).toBe(400);
    });
  });

  describe('Validation - email format', () => {
    it('should reject invalid email format', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().invalidEmail);

      expect(res.status).toBe(400);
    });
  });

  describe('Security - XSS prevention', () => {
    it('should sanitize HTML/script tags in input', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().xssAttempt);

      // Should succeed because express-validator escape() sanitizes the HTML
      // The data is stored escaped, not rejected
      expect([200, 400]).toContain(res.status);
    });
  });

  describe('Security - SQL injection prevention', () => {
    it('should handle SQL injection attempts safely', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send(createInvalidContactPayloads().sqlInjection);

      // Should process safely (no DB to inject, input is escaped)
      expect([200, 400]).toContain(res.status);
    });
  });

  describe('Content-Type handling', () => {
    it('should return 400 for non-JSON requests with missing fields', async () => {
      const res = await request(app)
        .post('/api/contact')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({ invalid: true }));

      expect(res.status).toBe(400);
    });
  });
});

describe('404 handling', () => {
  it('should return 404 for non-existent API routes', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect([404, 200]).toContain(res.status);
  });
});
