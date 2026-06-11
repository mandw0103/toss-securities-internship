import { useNavigate } from 'react-router-dom';
import type { Stock, Period } from '../../../types/stock';
import type { SortKey } from '../../../types/chart-filter';
import Logo from '../../common/Logo';

interface ChartListRowProps {
  rank: number;
  stock: Stock;
  period: Period;
  sort: SortKey;
}

const numberFormatter = new Intl.NumberFormat('ko-KR');

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function formatPrice(value: number): string {
  return `₩${numberFormatter.format(value)}`;
}

function formatPercent(value: number): string {
  const fixed = value.toFixed(2);
  if (value > 0) return `+${fixed}%`;
  return `${fixed}%`;
}

function getMetricValue(stock: Stock, period: Period, sort: SortKey): number {
  const m = stock.metricsByPeriod[period];
  switch (sort) {
    case '토스증권 거래대금':
      return m.tossTradingValue;
    case '토스증권 거래량':
      return m.tossTradingVolume;
    case '거래대금':
      return m.totalTradingValue;
    case '거래량':
      return m.totalTradingVolume;
    default:
      return 0;
  }
}

function getRateClass(rate: number): string {
  if (rate > 0) return 'chart-rate-up';
  if (rate < 0) return 'chart-rate-down';
  return '';
}

export default function ChartListRow({ rank, stock, period, sort }: ChartListRowProps) {
  const navigate = useNavigate();
  const metric = stock.metricsByPeriod[period];
  const isChangeRateSort = sort === '급상승' || sort === '급하락';
  const rateClass = getRateClass(metric.changeRate);
  const rowClass = `chart-list-row${isChangeRateSort ? ' chart-list-grid-7col' : ' chart-list-grid-8col'}`;

  return (
    <button
      type="button"
      className={rowClass}
      onClick={() => navigate(`/stocks/${stock.stockId}`)}
    >
      <div className="chart-list-cell chart-list-cell-rank">{rank}</div>
      <div className="chart-list-cell chart-list-cell-logo">
        <Logo logoSeed={stock.logoSeed} size={32} />
      </div>
      <div className="chart-list-cell chart-list-cell-name">{stock.name}</div>
      <div className="chart-list-cell chart-list-cell-price">{formatPrice(stock.currentPrice)}</div>
      {isChangeRateSort ? (
        <div className={`chart-list-cell chart-list-cell-rate ${rateClass}`}>
          {formatPercent(metric.changeRate)}
        </div>
      ) : (
        <>
          <div className={`chart-list-cell chart-list-cell-rate ${rateClass}`}>
            {formatPercent(metric.changeRate)}
          </div>
          <div className="chart-list-cell chart-list-cell-metric">
            {formatNumber(getMetricValue(stock, period, sort))}
          </div>
        </>
      )}
      <div className="chart-list-cell chart-list-cell-share">
        {stock.tossSharePercent === null ? '' : `${stock.tossSharePercent.toFixed(1)}%`}
      </div>
      <div className="chart-list-cell chart-list-cell-summary">{stock.aiSummary}</div>
    </button>
  );
}
