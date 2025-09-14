import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('子要素の表示', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('デフォルトのclassNameが適用されること', () => {
    render(<Card>Test</Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('bg-white', 'border', 'border-stone-300', 'rounded-md', 'p-4');
  });

  it('カスタムclassNameがデフォルトと一緒に適用されること', () => {
    render(<Card className="custom-class">Test</Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('bg-white', 'border', 'border-stone-300', 'rounded-md', 'p-4', 'custom-class');
  });

  it('複数の子要素の表示', () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
