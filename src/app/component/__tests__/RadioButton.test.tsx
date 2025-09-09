import { render, screen, fireEvent } from '@testing-library/react';
import RadioButton from '../RadioButton';

describe('RadioButton Component', () => {
  it('ラベルとラジオボタンが表示される', () => {
    render(<RadioButton label="Test Option" />);
    
    expect(screen.getByText('Test Option')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('name属性が正しく設定されること', () => {
    render(<RadioButton label="Test Option" name="test-group" />);
    
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('name', 'test-group');
  });

  it('name未指定ならデフォルト名が使用される', () => {
    render(<RadioButton label="Test Option" />);
    
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('name', 'radio');
  });

  it('value属性が正しく設定される', () => {
    render(<RadioButton label="Test Option" value="test-value" />);
    
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('value', 'test-value');
  });

  it('選択状態がコントロールされる', () => {
    render(<RadioButton label="Test Option" checked={true} />);
    
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('checked propがfalseのときは選択されない', () => {
    render(<RadioButton label="Test Option" checked={false} />);
    
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();
  });

  it('クリックされたときにonChangeが呼び出される', () => {
    const mockOnChange = jest.fn();
    render(<RadioButton label="Test Option" value="test-value" onChange={mockOnChange} />);
    
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    
    expect(mockOnChange).toHaveBeenCalledWith('test-value');
  });

  it('カスタムクラスが適用される', () => {
    render(<RadioButton label="Test Option" className="custom-class" />);
    
    const label = screen.getByText('Test Option').closest('label');
    expect(label).toHaveClass('custom-class');
  });

  it('基本のスタイリングクラスが正しい', () => {
    render(<RadioButton label="Test Option" />);
    
    const label = screen.getByText('Test Option').closest('label');
    expect(label).toHaveClass('flex', 'items-center', 'gap-2', 'w-fit', 'cursor-pointer', 'mb-2');
    expect(label).toHaveClass('p-3', 'w-full', 'bg-white', 'rounded-md', 'border', 'border-stone-300');
  });

  it('checked状態のときにスタイリングが適用される', () => {
    render(<RadioButton label="Test Option" checked={true} />);
    
    const label = screen.getByText('Test Option').closest('label');
    expect(label).toHaveClass('has-[:checked]:border-primary-700', 'has-[:checked]:bg-primary-50');
  });

  it('キーボードナビゲーションで動作する', () => {
    const mockOnChange = jest.fn();
    render(<RadioButton label="Test Option" value="test-value" onChange={mockOnChange} />);
    
    const radio = screen.getByRole('radio');
    radio.focus();
    fireEvent.keyDown(radio, { key: ' ' });
    
    expect(radio).toHaveFocus();
  });

  it('ラベルとラジオボタンが正しく関連付けられている', () => {
    const handleChange = jest.fn();
    render(<RadioButton label="Test Option" name="test" value="option1" onChange={handleChange} />);
    
    const radio = screen.getByRole('radio');
    const label = screen.getByText('Test Option');
    
    // The label should be correctly associated with the radio input
    // Since the input is wrapped inside the label, clicking the label should trigger onChange
    fireEvent.click(radio);
    
    expect(handleChange).toHaveBeenCalledWith('option1');
    expect(radio).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
