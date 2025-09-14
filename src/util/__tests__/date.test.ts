import { getRelativeTimeString, isExpired, isNewWorksheet, isWithinPeriod } from '../date';

describe('Date Utilities', () => {
  describe('getRelativeTimeString', () => {
    const mockNow = new Date('2025-01-20T12:00:00.000Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockNow);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('1分未満ならたった今と返す', () => {
      const dateString = '2025-01-20T11:59:30.000Z'; // 30秒前
      expect(getRelativeTimeString(dateString)).toBe('たった今');
    });

    it('1時間未満なら正しい分数を返す', () => {
      const dateString = '2025-01-20T11:45:00.000Z'; // 15分前
      expect(getRelativeTimeString(dateString)).toBe('15分前');
    });

    it('24時間未満なら正しい時間を返す', () => {
      const dateString = '2025-01-20T09:00:00.000Z'; // 3時間前
      expect(getRelativeTimeString(dateString)).toBe('3時間前');
    });

    it('7日前未満なら正しい日数を返す', () => {
      const dateString = '2025-01-18T12:00:00.000Z'; // 2日前
      expect(getRelativeTimeString(dateString)).toBe('2日前');
    });

    it('30日前未満なら正しい週数を返す', () => {
      const dateString = '2025-01-06T12:00:00.000Z'; // 2週間前
      expect(getRelativeTimeString(dateString)).toBe('2週間前');
    });

    it('365日前未満なら正しい月数を返す', () => {
      const dateString = '2024-11-20T12:00:00.000Z'; // 2ヶ月前
      expect(getRelativeTimeString(dateString)).toBe('2ヶ月前');
    });

    it('365日前より前なら正しい年数を返す', () => {
      const dateString = '2023-01-20T12:00:00.000Z'; // 2年前
      expect(getRelativeTimeString(dateString)).toBe('2年前');
    });
  });

  describe('isExpired', () => {
    const mockNow = new Date('2025-01-20T12:00:00.000Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockNow);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('endAtがnullの場合はfalseを返す', () => {
      expect(isExpired(null)).toBe(false);
    });

    it('過去の日付の場合はtrueを返す', () => {
      const pastDate = '2025-01-20T11:00:00.000Z'; // 1時間前
      expect(isExpired(pastDate)).toBe(true);
    });

    it('未来の日付の場合はfalseを返す', () => {
      const futureDate = '2025-01-20T13:00:00.000Z'; // 1時間後
      expect(isExpired(futureDate)).toBe(false);
    });

    it('現在の時間の場合はfalseを返す', () => {
      const currentTime = '2025-01-20T12:00:00.000Z';
      expect(isExpired(currentTime)).toBe(false);
    });
  });

  describe('isNewWorksheet', () => {
    const mockNow = new Date('2025-01-20T12:00:00.000Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockNow);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('startAtがnullの場合はfalseを返す', () => {
      expect(isNewWorksheet(null)).toBe(false);
    });

    it('1週間以内の日付の場合はtrueを返す', () => {
      const recentDate = '2025-01-15T12:00:00.000Z'; // 5日前
      expect(isNewWorksheet(recentDate)).toBe(true);
    });

    it('1週間より前の日付の場合はfalseを返す', () => {
      const oldDate = '2025-01-10T12:00:00.000Z'; // 10日前
      expect(isNewWorksheet(oldDate)).toBe(false);
    });

    it('ちょうど7日前の日付の場合はtrueを返す ', () => {
      const weekAgoDate = '2025-01-13T12:00:00.000Z'; // ちょうど7日前
      expect(isNewWorksheet(weekAgoDate)).toBe(true);
    });

    it('現在の時間の場合はtrueを返す', () => {
      const currentTime = '2025-01-20T12:00:00.000Z';
      expect(isNewWorksheet(currentTime)).toBe(true);
    });
  });

  describe('isWithinPeriod', () => {
    const mockNow = new Date('2025-01-20T12:00:00.000Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockNow);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('startとendがnullの場合はtrueを返す', () => {
      expect(isWithinPeriod(null, null)).toBe(true);
    });

    it('startがnullでendが未来の場合はtrueを返す', () => {
      const futureEnd = '2025-01-21T12:00:00.000Z';
      expect(isWithinPeriod(null, futureEnd)).toBe(true);
    });

    it('startがnullでendが過去の場合はfalseを返す', () => {
      const pastEnd = '2025-01-19T12:00:00.000Z';
      expect(isWithinPeriod(null, pastEnd)).toBe(false);
    });

    it('startが過去でendがnullの場合はtrueを返す', () => {
      const pastStart = '2025-01-19T12:00:00.000Z';
      expect(isWithinPeriod(pastStart, null)).toBe(true);
    });

    it('startが未来でendがnullの場合はfalseを返す', () => {
      const futureStart = '2025-01-21T12:00:00.000Z';
      expect(isWithinPeriod(futureStart, null)).toBe(false);
    });

    it('現在の時間が期間内の場合はtrueを返す', () => {
      const pastStart = '2025-01-19T12:00:00.000Z';
      const futureEnd = '2025-01-21T12:00:00.000Z';
      expect(isWithinPeriod(pastStart, futureEnd)).toBe(true);
    });

    it('現在が期間外の場合はfalseを返す', () => {
      const futureStart = '2025-01-21T12:00:00.000Z';
      const futureEnd = '2025-01-22T12:00:00.000Z';
      expect(isWithinPeriod(futureStart, futureEnd)).toBe(false);
    });

    it('現在の時間が期間外の場合はfalseを返す', () => {
      const futureStart = '2025-01-21T12:00:00.000Z';
      const futureEnd = '2025-01-22T12:00:00.000Z';
      expect(isWithinPeriod(futureStart, futureEnd)).toBe(false);
    });

    it('現在が期間外の場合はfalseを返す', () => {
      const pastStart = '2025-01-18T12:00:00.000Z';
      const pastEnd = '2025-01-19T12:00:00.000Z';
      expect(isWithinPeriod(pastStart, pastEnd)).toBe(false);
    });

    it('undefinedの値を正しく処理する', () => {
      expect(isWithinPeriod(undefined, undefined)).toBe(true);
      const futureEnd = '2025-01-21T12:00:00.000Z';
      expect(isWithinPeriod(undefined, futureEnd)).toBe(true);
    });
  });
});
