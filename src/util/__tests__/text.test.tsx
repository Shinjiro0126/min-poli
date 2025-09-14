import { convertNewlinesToBr } from '../text';
import { render } from '@testing-library/react';

describe('Text Utilities', () => {
  describe('convertNewlinesToBr', () => {
    it('入力がnullの場合はnullを返す', () => {
      expect(convertNewlinesToBr(null)).toBeNull();
    });

    it('空の文字列の場合はnullを返す', () => {
      expect(convertNewlinesToBr('')).toBeNull();
    });

    it('改行やURLがない場合はテキストをそのまま返す', () => {
      const text = 'Simple text without newlines or URLs';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      expect(container.textContent).toBe(text);
    });

    it('改行をbrタグに変換する', () => {
      const text = 'Line 1\nLine 2\nLine 3';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      
      // Check that br tags are present (one for each line including the last one)
      const brTags = container.querySelectorAll('br');
      expect(brTags.length).toBe(3); // One for each line
      
      // Check text content (br tags don't contribute to textContent)
      expect(container.textContent).toBe('Line 1Line 2Line 3');
    });

    it('URLをクリック可能なリンクに変換する', () => {
      const text = 'Check out https://example.com for more info';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      
      const links = container.querySelectorAll('a');
      expect(links.length).toBe(1);
      expect(links[0].getAttribute('href')).toBe('https://example.com');
      expect(links[0].getAttribute('target')).toBe('_blank');
      expect(links[0].getAttribute('rel')).toBe('noopener noreferrer');
      expect(links[0].textContent).toBe('https://example.com');
    });

    it('改行とURLが混在する場合でも正しく処理される', () => {
      const text = 'Line 1\nCheck out https://example.com\nLine 3';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      
      // Check for br tags (one for each line)
      const brTags = container.querySelectorAll('br');
      expect(brTags.length).toBe(3);
      
      // Check for links
      const links = container.querySelectorAll('a');
      expect(links.length).toBe(1);
      expect(links[0].getAttribute('href')).toBe('https://example.com');
      
      // Check text content includes all parts
      expect(container.textContent).toContain('Line 1');
      expect(container.textContent).toContain('https://example.com');
      expect(container.textContent).toContain('Line 3');
    });

    it('同じ行に複数のURLがある場合を正しく処理する', () => {
      const text = 'Visit https://example.com and https://test.com';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      
      const links = container.querySelectorAll('a');
      expect(links.length).toBe(2);
      expect(links[0].getAttribute('href')).toBe('https://example.com');
      expect(links[1].getAttribute('href')).toBe('https://test.com');
    });

    it('HTTP URLを正しく処理する', () => {
      const text = 'Visit http://example.com';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      
      const links = container.querySelectorAll('a');
      expect(links.length).toBe(1);
      expect(links[0].getAttribute('href')).toBe('http://example.com');
    });

    it('クエリパラメータとフラグメントを含むURLを正しく処理する', () => {
      const text = 'Search: https://example.com/search?q=test&sort=date#results';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      
      const links = container.querySelectorAll('a');
      expect(links.length).toBe(1);
      expect(links[0].getAttribute('href')).toBe('https://example.com/search?q=test&sort=date#results');
    });

    it('URLの前後のテキストを保持する', () => {
      const text = 'Before https://example.com after';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      
      expect(container.textContent).toBe('Before https://example.com after');
      
      const links = container.querySelectorAll('a');
      expect(links.length).toBe(1);
    });

    it('空行（連続する改行）を正しく処理する', () => {
      const text = 'Line 1\n\nLine 3';
      const result = convertNewlinesToBr(text);
      const { container } = render(<div>{result}</div>);
      
      const brTags = container.querySelectorAll('br');
      expect(brTags.length).toBe(3); // One for each line including empty line
    });
  });
});
