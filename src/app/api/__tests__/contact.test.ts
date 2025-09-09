/**
 * @jest-environment node
 */
import { POST } from '../contact/route';
import { NextRequest } from 'next/server';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransporter: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

describe('/api/contact', () => {
  let mockSendMail: jest.Mock;

  beforeEach(() => {
    const nodemailer = require('nodemailer');
    mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
    nodemailer.createTransport.mockReturnValue({
      sendMail: mockSendMail,
    });

    // Mock environment variables
    process.env.SMTP_HOST = 'test-smtp.example.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test@example.com';
    process.env.SMTP_PASS = 'test-password';
    
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
  });

  const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  it('should send email successfully with valid data', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-id' });

    const validData = {
      name: 'テスト太郎',
      email: 'test@example.com',
      category: 'question',
      message: 'これはテストメッセージです。',
    };

    const request = createMockRequest(validData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('お問い合わせを送信しました。ありがとうございます。');
    expect(mockSendMail).toHaveBeenCalledTimes(2); // 管理者メール + 自動返信メール
  });

  it('should return 400 for missing required fields', async () => {
    const invalidData = {
      name: 'テスト太郎',
      email: '', // missing email
      category: 'question',
      message: 'メッセージ',
    };

    const request = createMockRequest(invalidData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('必須項目が入力されていません。');
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('should return 400 for missing name', async () => {
    const invalidData = {
      name: '',
      email: 'test@example.com',
      category: 'question',
      message: 'メッセージ',
    };

    const request = createMockRequest(invalidData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('必須項目が入力されていません。');
  });

  it('should return 400 for missing category', async () => {
    const invalidData = {
      name: 'テスト太郎',
      email: 'test@example.com',
      category: '',
      message: 'メッセージ',
    };

    const request = createMockRequest(invalidData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('必須項目が入力されていません。');
  });

  it('should return 400 for missing message', async () => {
    const invalidData = {
      name: 'テスト太郎',
      email: 'test@example.com',
      category: 'question',
      message: '',
    };

    const request = createMockRequest(invalidData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('必須項目が入力されていません。');
  });

  it('should handle email sending errors', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP connection failed'));

    const validData = {
      name: 'テスト太郎',
      email: 'test@example.com',
      category: 'question',
      message: 'これはテストメッセージです。',
    };

    const request = createMockRequest(validData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('メールの送信に失敗しました。しばらく時間をおいて再度お試しください。');
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });

  it('should handle different categories correctly', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-id' });

    const validData = {
      name: 'テスト太郎',
      email: 'test@example.com',
      category: 'bug',
      message: '不具合を見つけました。',
    };

    const request = createMockRequest(validData);
    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: expect.stringContaining('不具合報告'),
      })
    );
  });

  it('should handle malformed JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: 'invalid json',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('メールの送信に失敗しました。しばらく時間をおいて再度お試しください。');
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('should use correct email configuration', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-id' });

    const validData = {
      name: 'テスト太郎',
      email: 'test@example.com',
      category: 'question',
      message: 'テストメッセージ',
    };

    const request = createMockRequest(validData);
    await POST(request);

    const nodemailer = require('nodemailer');
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'test-smtp.example.com',
      port: 587,
      secure: true,
      auth: {
        user: 'test@example.com',
        pass: 'test-password',
      },
    });
  });
});
