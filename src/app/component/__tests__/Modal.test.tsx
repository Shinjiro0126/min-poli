import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    isClosedButton: true,
    onClose: jest.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('trueならモーダルが表示される', () => {
    render(<Modal {...defaultProps} />);
    
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('falseならモーダルが表示されない', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('タイトルが提供された場合は表示される', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Modal');
  });

  it('タイトルが提供されない場合は表示されない', () => {
    render(<Modal {...defaultProps} />);
    
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('閉じるボタンがisClosedButtonがtrueのときに表示される', () => {
    render(<Modal {...defaultProps} isClosedButton={true} />);
    
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toBeInTheDocument();
  });

  it('閉じるボタンがisClosedButtonがfalseのときに表示されない', () => {
    render(<Modal {...defaultProps} isClosedButton={false} />);
    
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('閉じるボタンがクリックされたときにonCloseが呼び出される', () => {
    const mockOnClose = jest.fn();
    render(<Modal {...defaultProps} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('子要素が表示されること', () => {
    const children = (
      <div>
        <p>Test paragraph</p>
        <button>Test button</button>
      </div>
    );
    
    render(<Modal {...defaultProps}>{children}</Modal>);
    
    expect(screen.getByText('Test paragraph')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Test button' })).toBeInTheDocument();
  });

  it('背景オーバーレイが表示されること', () => {
    render(<Modal {...defaultProps} />);
    
    const backdrop = screen.getByText('Modal content').closest('.fixed');
    expect(backdrop).toHaveClass(
      'fixed',
      'inset-0',
      'backdrop-blur-sm',
      'bg-black/20',
      'flex',
      'items-center',
      'justify-center',
      'z-45',
      'p-4'
    );
  });

  it('モーダルコンテンツのCSSクラスが正しいこと', () => {
    render(<Modal {...defaultProps} />);
    
    const modalContent = screen.getByText('Modal content').closest('.bg-white');
    expect(modalContent).toHaveClass(
      'bg-white',
      'px-4',
      'py-6',
      'rounded-lg',
      'shadow-xl',
      'w-full',
      'max-w-md',
      'mx-auto',
      'relative'
    );
  });

  it('onCloseなしで閉じるボタンがクリックされてもエラーが発生しないこと', () => {
    render(<Modal isOpen={true} isClosedButton={true} onClose={undefined}>Content</Modal>);
    
    const closeButton = screen.getByLabelText('Close modal');
    // Should not throw an error when clicked
    expect(() => fireEvent.click(closeButton)).not.toThrow();
  });

  it('複数の子要素も正しく表示される', () => {
    const complexChildren = (
      <div>
        <form>
          <input type="text" placeholder="Enter text" />
          <textarea placeholder="Enter description" />
          <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
    
    render(<Modal {...defaultProps}>{complexChildren}</Modal>);
    
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
