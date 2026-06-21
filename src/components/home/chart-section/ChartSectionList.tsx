import { useMemo } from 'react';
import type { Stock } from '../../../types/stock';
import type { ChartFilterState } from '../../../types/chart-filter';
import { TOSS_RANKING_ERROR } from '../../../apis/tossRanking';
import { applyChartFilter } from '../../../utils/stocks';
import ChartListHeader from './ChartListHeader';
import ChartListRow from './ChartListRow';

interface ChartSectionListProps {
  stocks: Stock[];
  filter: ChartFilterState;
  stockError: Error | null;
}

function getStockErrorMessage(error: Error): string {
  if (error.message === TOSS_RANKING_ERROR.RESPONSE_MISMATCH) {
    return '응답 구조 불일치';
  }

  return 'API 요청 실패';
}

export default function ChartSectionList({ stocks, filter, stockError }: ChartSectionListProps) {
  const sorted = useMemo(() => applyChartFilter(stocks, filter), [stocks, filter]);

  return (
    <div className="chart-list">
      <ChartListHeader sort={filter.sort} />
      <div className="chart-list-body">
        {stockError ? (
          <div className="chart-list-message">{getStockErrorMessage(stockError)}</div>
        ) : (
          sorted.map((stock, idx) => (
            <ChartListRow
              key={stock.stockId}
              rank={idx + 1}
              stock={stock}
              period={filter.period}
              sort={filter.sort}
            />
          ))
        )}
      </div>
    </div>
  );
}
