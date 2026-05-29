import { useMemo } from 'react';
import type { Stock } from '../../../types/stock';
import type { ChartFilterState } from '../../../types/chart-filter';
import { applyChartFilter } from '../../../utils/stocks';
import ChartListHeader from './ChartListHeader';
import ChartListRow from './ChartListRow';

interface ChartSectionListProps {
  stocks: Stock[];
  filter: ChartFilterState;
}

export default function ChartSectionList({ stocks, filter }: ChartSectionListProps) {
  const sorted = useMemo(() => applyChartFilter(stocks, filter), [stocks, filter]);

  return (
    <div className="chart-list">
      <ChartListHeader sort={filter.sort} />
      <div className="chart-list-body">
        {sorted.map((stock, idx) => (
          <ChartListRow
            key={stock.stockId}
            rank={idx + 1}
            stock={stock}
            period={filter.period}
            sort={filter.sort}
          />
        ))}
      </div>
    </div>
  );
}
