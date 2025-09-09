import { createAnswer } from '../answer/create';

// Mock Supabase client
jest.mock('@/lib/supabase/supabeseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(),
        })),
      })),
    })),
  },
}));

// Import the mocked supabase after the mock
import { supabase } from '@/lib/supabase/supabeseClient';

describe('createAnswer', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('回答の作成に成功する', async () => {
    const mockAnswer = {
      id: 1,
      worksheet_id: 1,
      user_id: 'user123',
      no: 1,
      reason: 'Test reason',
      is_active: true,
      created_at: '2025-01-20T12:00:00Z',
      updated_at: '2025-01-20T12:00:00Z',
    };

    const mockSelect = jest.fn().mockReturnValue({
      single: jest.fn().mockResolvedValue({
        data: mockAnswer,
        error: null,
      }),
    });

    const mockInsert = jest.fn().mockReturnValue({
      select: mockSelect,
    });

    (mockSupabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    const result = await createAnswer(1, 'user123', 1, 'Test reason');

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAnswer);
    expect(result.error).toBeUndefined();

    expect(mockSupabase.from).toHaveBeenCalledWith('t_answer');
    expect(mockInsert).toHaveBeenCalledWith({
      worksheet_id: 1,
      user_id: 'user123',
      no: 1,
      reason: 'Test reason',
      is_active: true,
    });
  });

  it('理由がnullの場合を正しく処理する', async () => {
    const mockAnswer = {
      id: 1,
      worksheet_id: 1,
      user_id: 'user123',
      no: 1,
      reason: null,
      is_active: true,
      created_at: '2025-01-20T12:00:00Z',
      updated_at: '2025-01-20T12:00:00Z',
    };

    const mockSelect = jest.fn().mockReturnValue({
      single: jest.fn().mockResolvedValue({
        data: mockAnswer,
        error: null,
      }),
    });

    const mockInsert = jest.fn().mockReturnValue({
      select: mockSelect,
    });

    (mockSupabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    const result = await createAnswer(1, 'user123', 1);

    expect(result.success).toBe(true);
    expect(mockInsert).toHaveBeenCalledWith({
      worksheet_id: 1,
      user_id: 'user123',
      no: 1,
      reason: null,
      is_active: true,
    });
  });

  it('データベースエラーを正しく処理する', async () => {
    const mockError = { message: 'Database connection failed' };

    const mockSelect = jest.fn().mockReturnValue({
      single: jest.fn().mockResolvedValue({
        data: null,
        error: mockError,
      }),
    });

    const mockInsert = jest.fn().mockReturnValue({
      select: mockSelect,
    });

    (mockSupabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    const result = await createAnswer(1, 'user123', 1, 'Test reason');

    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.error).toBe('Database connection failed');
  });

  it('例外を処理し、一般的なエラーメッセージを返す', async () => {
    (mockSupabase.from as jest.Mock).mockImplementation(() => {
      throw new Error('Network error');
    });

    const result = await createAnswer(1, 'user123', 1, 'Test reason');

    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.error).toBe('データベースエラーが発生しました。');
  });

  it('空文字列の理由をnullに変換する', async () => {
    const mockAnswer = {
      id: 1,
      worksheet_id: 1,
      user_id: 'user123',
      no: 1,
      reason: null,
      is_active: true,
      created_at: '2025-01-20T12:00:00Z',
      updated_at: '2025-01-20T12:00:00Z',
    };

    const mockSelect = jest.fn().mockReturnValue({
      single: jest.fn().mockResolvedValue({
        data: mockAnswer,
        error: null,
      }),
    });

    const mockInsert = jest.fn().mockReturnValue({
      select: mockSelect,
    });

    (mockSupabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
    });

    const result = await createAnswer(1, 'user123', 1, '');

    expect(result.success).toBe(true);
    expect(mockInsert).toHaveBeenCalledWith({
      worksheet_id: 1,
      user_id: 'user123',
      no: 1,
      reason: null,
      is_active: true,
    });
  });
});
