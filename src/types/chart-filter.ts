import type { Period, Market } from './stock';

export type MarketFilter = '전체' | Market;

export type SortKey =
  | '토스증권 거래대금'
  | '토스증권 거래량'
  | '거래대금'
  | '거래량'
  | '급상승'
  | '급하락';

export interface ChartFilterState {
  market: MarketFilter;
  sort: SortKey;
  period: Period;
}

export const MARKET_OPTIONS: MarketFilter[] = ['전체', '국내', '해외'];

export const SORT_OPTIONS: SortKey[] = [
  '토스증권 거래대금',
  '토스증권 거래량',
  '거래대금',
  '거래량',
  '급상승',
  '급하락',
];

export const PERIOD_OPTIONS: Period[] = [
  '실시간', '1일', '1주일', '1개월', '3개월', '6개월', '1년',
];

export const DEFAULT_FILTER: ChartFilterState = {
  market: '전체',
  sort: '토스증권 거래대금',
  period: '실시간',
};
