import type { Stock } from '../types/stock';
import type { ChartFilterState } from '../types/chart-filter';

export function selectRecommended(stocks: Stock[], count = 3): Stock[] {
  return [...stocks]
    .sort(
      (a, b) =>
        b.metricsByPeriod['1일'].tossTradingValue -
        a.metricsByPeriod['1일'].tossTradingValue
    )
    .slice(0, count);
}

export function applyChartFilter(stocks: Stock[], filter: ChartFilterState): Stock[] {
  let filtered = stocks;
  if (filter.market !== '전체') {
    filtered = filtered.filter((s) => s.market === filter.market);
  }

  const direction = filter.sort === '급하락' ? 1 : -1;
  const getMetric = (stock: Stock): number => {
    const m = stock.metricsByPeriod[filter.period];
    switch (filter.sort) {
      case '토스증권 거래대금':
        return m.tossTradingValue;
      case '토스증권 거래량':
        return m.tossTradingVolume;
      case '거래대금':
        return m.totalTradingValue;
      case '거래량':
        return m.totalTradingVolume;
      case '급상승':
      case '급하락':
        return m.changeRate;
    }
  };

  return [...filtered].sort((a, b) => direction * (getMetric(a) - getMetric(b)));
}
