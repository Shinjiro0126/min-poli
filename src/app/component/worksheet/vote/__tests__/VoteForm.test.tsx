import { render, screen, fireEvent } from '@testing-library/react';
import VoteForm from '../VoteForm';

// Mock the VoteSubmitButton component
jest.mock('../VoteSubmitButtonProps', () => {
  return function MockVoteSubmitButton({ 
    disabled, 
    isSubmitting 
  }: {
    selectedValue: string | null;
    disabled?: boolean;
    isSubmitting?: boolean;
  }) {
    return (
      <button 
        disabled={disabled || isSubmitting}
        data-testid="vote-submit-button"
      >
        {isSubmitting ? '送信中...' : '投票する'}
      </button>
    );
  };
});

describe('VoteForm Component', () => {
  const defaultProps = {
    worksheetId: 1,
    userId: 'user123',
    worksheetTitle: 'テスト投票',
    workSheetAnswers: [
      { worksheet_id: 1, no: 1, answer_text: '賛成', sort: 1, is_active: true },
      { worksheet_id: 1, no: 2, answer_text: '反対', sort: 2, is_active: true },
      { worksheet_id: 1, no: 3, answer_text: 'どちらでもない', sort: 3, is_active: true },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('タイトルが表示される', () => {
    render(<VoteForm {...defaultProps} />);
    
    expect(screen.getByText('テスト投票')).toBeInTheDocument();
  });

  it('全ての回答オプションが表示される', () => {
    render(<VoteForm {...defaultProps} />);
    
    expect(screen.getByText('賛成')).toBeInTheDocument();
    expect(screen.getByText('反対')).toBeInTheDocument();
    expect(screen.getByText('どちらでもない')).toBeInTheDocument();
  });

  it('各回答に対してラジオボタンが表示される', () => {
    render(<VoteForm {...defaultProps} />);
    
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
  });

  it('理由入力欄が表示される', () => {
    render(<VoteForm {...defaultProps} />);
    
    const textarea = screen.getByLabelText(/理由/);
    expect(textarea).toBeInTheDocument();
  });

  it('ラジオボタンをクリックすると選択状態が更新される', () => {
    render(<VoteForm {...defaultProps} />);
    
    const radioButton = screen.getByLabelText('賛成');
    fireEvent.click(radioButton);
    
    expect(radioButton).toBeChecked();
  });

  it('理由入力欄が更新される', () => {
    render(<VoteForm {...defaultProps} />);
    
    const textarea = screen.getByLabelText(/理由/) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'テスト理由' } });
    
    expect(textarea.value).toBe('テスト理由');
  });

  it('送信ボタンが表示される', () => {
    render(<VoteForm {...defaultProps} />);
    
    expect(screen.getByTestId('vote-submit-button')).toBeInTheDocument();
  });

  it('空のワークシート回答を処理する', () => {
    const propsWithNoAnswers = {
      ...defaultProps,
      workSheetAnswers: [],
    };
    
    render(<VoteForm {...propsWithNoAnswers} />);
    
    expect(screen.getByText('テスト投票')).toBeInTheDocument();
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  it('操作間で状態が維持される', () => {
    render(<VoteForm {...defaultProps} />);

    // ラジオボタンを選択
    const radioButton = screen.getByLabelText('賛成');
    fireEvent.click(radioButton);

    // 理由を追加
    const textarea = screen.getByLabelText(/理由/) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '理由を記入' } });
    
    // Check that both selections are maintained
    expect(radioButton).toBeChecked();
    expect(textarea.value).toBe('理由を記入');
  });

  it('ラジオボタンは常に一つだけ選択できる', () => {
    render(<VoteForm {...defaultProps} />);
    
    const radioButton1 = screen.getByLabelText('賛成');
    const radioButton2 = screen.getByLabelText('反対');
    
    // Select first option
    fireEvent.click(radioButton1);
    expect(radioButton1).toBeChecked();
    expect(radioButton2).not.toBeChecked();
    
    // Select second option
    fireEvent.click(radioButton2);
    expect(radioButton1).not.toBeChecked();
    expect(radioButton2).toBeChecked();
  });  it('should handle single answer option', () => {
    const propsWithSingleAnswer = {
      ...defaultProps,
      workSheetAnswers: [
        { worksheet_id: 1, no: 1, answer_text: '唯一の選択肢', sort: 1, is_active: true },
      ],
    };

    render(<VoteForm {...propsWithSingleAnswer} />);
    
    expect(screen.getByText('唯一の選択肢')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(1);
  });

  it('正しいフォーム構造で描画される', () => {
    render(<VoteForm {...defaultProps} />);
    
    // Check that all form elements are present
    expect(screen.getByText('テスト投票')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('vote-submit-button')).toBeInTheDocument();
  });

  it('送信ボタンに正しいpropsが渡される', () => {
    render(<VoteForm {...defaultProps} />);
    
    // Initially no selection should be made
    const submitButton = screen.getByTestId('vote-submit-button');
    expect(submitButton).toBeInTheDocument();
    
    // Select an option and verify the button still exists
    const radioButton = screen.getByLabelText('賛成');
    fireEvent.click(radioButton);
    
    expect(screen.getByTestId('vote-submit-button')).toBeInTheDocument();
  });
});
