import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('ボタンのテキスト表示', () => {
  it('ボタンに子要素のテキストが表示されること', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('ボタンがリンクとしてレンダリングされる', () => {
    render(<Button href="/test">Go to test</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Go to test');
  });

  it('カスタムclassNameが適用される', () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('ボタンがdisabled状態になり、無効スタイルが適用される', () => {
    render(<Button disabled>Disabled button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('ボタンがクリックされたときにonClickが呼び出される', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    button.click();
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('ボタンに基本のclassNameが適用される', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3', 'py-2', 'font-label', 'rounded-md', 'text-center', 'cursor-pointer');
  });

  it('ボタンがdisabled状態になり、無効スタイルが適用されクリックイベントが発火しない', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick} disabled>Click me</Button>);
    
    const button = screen.getByRole('button');
    button.click();
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
