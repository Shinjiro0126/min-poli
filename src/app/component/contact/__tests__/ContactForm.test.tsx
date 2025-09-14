import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../ContactForm';

// Mock fetch
global.fetch = jest.fn();

describe('ContactForm 統合テスト', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('全てのフォーム項目が表示されること', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/お名前/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(screen.getByLabelText(/お問い合わせ種別/)).toBeInTheDocument();
    expect(screen.getByLabelText(/お問い合わせ内容/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /送信/ })).toBeInTheDocument();
  });

  it('有効な入力で送信できる', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: '送信完了しました' }),
    });

    render(<ContactForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: 'テスト太郎' },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ種別/), {
      target: { value: 'question' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), {
      target: { value: 'テストメッセージです' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /送信/ }));

    // Wait for the submission to complete and check for success message
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'テスト太郎',
          email: 'test@example.com',
          category: 'question',
          message: 'テストメッセージです',
        }),
      });
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/送信完了しました/)).toBeInTheDocument();
    });
  });

  it('送信失敗時にエラーメッセージが表示される', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'サーバーエラーが発生しました' }),
    });

    render(<ContactForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: 'テスト太郎' },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ種別/), {
      target: { value: 'question' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), {
      target: { value: 'テストメッセージです' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /送信/ }));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/サーバーエラーが発生しました/)).toBeInTheDocument();
    });
  });

  it('ネットワークエラー時にエラーメッセージが表示される', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<ContactForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: 'テスト太郎' },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ種別/), {
      target: { value: 'question' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), {
      target: { value: 'テストメッセージです' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /送信/ }));

    // Check for network error message
    await waitFor(() => {
      expect(screen.getByText(/ネットワークエラーが発生しました/)).toBeInTheDocument();
    });
  });

  it('フォームが無効な時送信ボタンが無効化されている', () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /送信/ });
    expect(submitButton).toBeDisabled();
  });

  it('全ての必須項目が入力された時に送信ボタンが有効化される', () => {
    render(<ContactForm />);

    // Fill out all required fields
    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: 'テスト太郎' },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ種別/), {
      target: { value: 'question' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), {
      target: { value: 'テストメッセージです' },
    });

    const submitButton = screen.getByRole('button', { name: /送信/ });
    expect(submitButton).toBeEnabled();
  });

  it('送信成功後にフォームがリセットされる', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: '送信完了しました' }),
    });

    render(<ContactForm />);

    // Fill out the form
    const nameInput = screen.getByLabelText(/お名前/) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/メールアドレス/) as HTMLInputElement;
    const categorySelect = screen.getByLabelText(/お問い合わせ種別/) as HTMLSelectElement;
    const messageTextarea = screen.getByLabelText(/お問い合わせ内容/) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'テスト太郎' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(categorySelect, { target: { value: 'question' } });
    fireEvent.change(messageTextarea, { target: { value: 'テストメッセージです' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /送信/ }));

    // Wait for the submission to complete and form to reset
    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(categorySelect.value).toBe('');
      expect(messageTextarea.value).toBe('');
    });
  });

  it('送信中に全てのフォーム項目が無効化される', async () => {
    // Mock a slow response
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ message: '送信完了しました' }),
              }),
            100
          )
        )
    );

    render(<ContactForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/お名前/), {
      target: { value: 'テスト太郎' },
    });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ種別/), {
      target: { value: 'question' },
    });
    fireEvent.change(screen.getByLabelText(/お問い合わせ内容/), {
      target: { value: 'テストメッセージです' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /送信/ }));

    // Check that form fields are disabled during submission
    expect(screen.getByLabelText(/お名前/)).toBeDisabled();
    expect(screen.getByLabelText(/メールアドレス/)).toBeDisabled();
    expect(screen.getByLabelText(/お問い合わせ種別/)).toBeDisabled();
    expect(screen.getByLabelText(/お問い合わせ内容/)).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByText(/送信完了しました/)).toBeInTheDocument();
    });
  });
});
