import { render, screen, fireEvent } from '@testing-library/react';
import TextBox from '../TextBox';

describe('TextBox Component', () => {
  it('ラベルと入力欄が表示される', () => {
    render(<TextBox id="test" label="Test Label" />);
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('エラーメッセージが表示される', () => {
    render(<TextBox id="test" label="Test Label" error="This field is required" />);
    
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
  });

  it('エラースタイリングが適用される', () => {
    render(<TextBox id="test" label="Test Label" error="Error message" />);
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('エラースタイリングが適用されない', () => {
    render(<TextBox id="test" label="Test Label" />);
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('カスタムclassNameが適用される', () => {
    render(<TextBox id="test" label="Test Label" className="custom-class" />);
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('custom-class');
  });

  it('プレースホルダーが設定される', () => {
    render(<TextBox id="test" label="Test Label" placeholder="Enter text here" />);
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('placeholder', 'Enter text here');
  });

  it('入力の変更を処理する', () => {
    const mockOnChange = jest.fn();
    render(<TextBox id="test" label="Test Label" onChange={mockOnChange} />);
    
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('input typeが正しく設定される', () => {
    render(<TextBox id="test" label="Test Label" type="password" />);
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('必須属性が設定される', () => {
    render(<TextBox id="test" label="Test Label" required />);
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeRequired();
  });

  it('初期値が設定される', () => {
    render(<TextBox id="test" label="Test Label" value="initial value" readOnly />);
    
    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    expect(input.value).toBe('initial value');
  });

  it('基本のスタイリングクラスが正しく表示される', () => {
    render(<TextBox id="test" label="Test Label" />);
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('p-2', 'h-11', 'block', 'w-full', 'rounded-md', 'border', 'bg-stone-50');
  });
});
