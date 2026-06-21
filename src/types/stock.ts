export type Period = '실시간' | '1일' | '1주일' | '1개월' | '3개월' | '6개월' | '1년';

export type Market = '국내' | '해외';

export interface PeriodMetrics {
  changeRate: number;
  tossTradingValue: number;
  tossTradingVolume: number;
  totalTradingValue: number;
  totalTradingVolume: number;
}

export interface Stock {
  stockId: string;
  name: string;
  market: Market;
  logoSeed: string;
  logoImageUrl?: string;
  currentPrice: number;
  tossSharePercent: number | null;
  aiSummary: string;
  metricsByPeriod: Record<Period, PeriodMetrics>;
}

export const PERIODS: Period[] = ['실시간', '1일', '1주일', '1개월', '3개월', '6개월', '1년'];

export type StockSearchResult = Pick<Stock, 'stockId' | 'name'>;
