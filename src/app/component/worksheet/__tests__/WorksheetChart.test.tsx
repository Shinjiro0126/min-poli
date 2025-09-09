import { render, screen } from '@testing-library/react';
import WorksheetChart from '../WorkSheetChart';

describe('WorksheetChart Component', () => {
  const mockData = [
    { label: '賛成', value: 75, is_answer: true, percent: 75.0 },
    { label: '反対', value: 25, is_answer: false, percent: 25.0 },
  ];

  it('データを渡すとグラフが表示される', () => {
    render(<WorksheetChart percentData={mockData} />);
    
    expect(screen.getByText('賛成')).toBeInTheDocument();
    expect(screen.getByText('反対')).toBeInTheDocument();
    expect(screen.getByText('75.0%')).toBeInTheDocument();
    expect(screen.getByText('25.0%')).toBeInTheDocument();
  });

  it('データが提供されない場合は空のリストが表示される', () => {
    render(<WorksheetChart percentData={[]} />);
    
    const list = document.querySelector('ul');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });

  it('選択された回答に対して正しいスタイリングが適用される', () => {
    render(<WorksheetChart percentData={mockData} />);
    
    const listItems = document.querySelectorAll('li');
    const selectedItem = Array.from(listItems).find(item => 
      item.textContent?.includes('賛成')
    );
    
    expect(selectedItem).toBeInTheDocument();
    // Check if the bar has the selected color class
    const bar = selectedItem?.querySelector('.bg-primary-500');
    expect(bar).toBeInTheDocument();
  });

  it('未洗濯の回答に通常のスタイルが適用される', () => {
    render(<WorksheetChart percentData={mockData} />);
    
    const listItems = document.querySelectorAll('li');
    const nonSelectedItem = Array.from(listItems).find(item => 
      item.textContent?.includes('反対')
    );
    
    expect(nonSelectedItem).toBeInTheDocument();
    // Check if the bar has the normal color class
    const bar = nonSelectedItem?.querySelector('.bg-stone-300');
    expect(bar).toBeInTheDocument();
  });

  it('選択された回答にチェックアイコンが表示される', () => {
    render(<WorksheetChart percentData={mockData} />);
    
    // Check for SVG circle and path elements that form the check icon
    const circles = document.querySelectorAll('circle');
    const paths = document.querySelectorAll('path');
    
    expect(circles.length).toBeGreaterThan(0);
    expect(paths.length).toBeGreaterThan(0);
  });

  it('パーセンテージに応じてバーの幅が正しく設定される', () => {
    render(<WorksheetChart percentData={mockData} />);
    
    const bars = document.querySelectorAll('[style*="width"]');
    
    // Find bar with 75% width
    const bar75 = Array.from(bars).find(bar => 
      (bar as HTMLElement).style.width === '75%'
    );
    expect(bar75).toBeInTheDocument();
    
    // Find bar with 25% width
    const bar25 = Array.from(bars).find(bar => 
      (bar as HTMLElement).style.width === '25%'
    );
    expect(bar25).toBeInTheDocument();
  });

  it('単一項目のデータでも正しく表示される', () => {
    const singleData = [
      { label: '中立', value: 100, is_answer: true, percent: 100.0 }
    ];
    
    render(<WorksheetChart percentData={singleData} />);
    
    expect(screen.getByText('中立')).toBeInTheDocument();
    expect(screen.getByText('100.0%')).toBeInTheDocument();
  });

  it('小数点を含む%を正しく表示できる', () => {
    const decimalData = [
      { label: 'オプション1', value: 33, is_answer: false, percent: 33.3 },
      { label: 'オプション2', value: 67, is_answer: true, percent: 66.7 },
    ];
    
    render(<WorksheetChart percentData={decimalData} />);
    
    expect(screen.getByText('33.3%')).toBeInTheDocument();
    expect(screen.getByText('66.7%')).toBeInTheDocument();
  });

  it('アクセシビリティ上、リスト構造が正しく描画される', () => {
    render(<WorksheetChart percentData={mockData} />);
    
    const list = document.querySelector('ul');
    expect(list).toBeInTheDocument();
    
    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    
    // Each list item should contain the percentage text
    listItems.forEach(item => {
      expect(item.textContent).toMatch(/\d+\.\d+%/);
    });
  });

  it('0%と100%のケースで正しく表示される', () => {
    const zeroData = [
      { label: 'ゼロ回答', value: 0, is_answer: false, percent: 0.0 },
      { label: '全回答', value: 100, is_answer: true, percent: 100.0 },
    ];
    
    render(<WorksheetChart percentData={zeroData} />);
    
    expect(screen.getByText('0.0%')).toBeInTheDocument();
    expect(screen.getByText('100.0%')).toBeInTheDocument();
  });
});
