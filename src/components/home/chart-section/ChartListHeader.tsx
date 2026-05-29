import type { SortKey } from '../../../types/chart-filter';

interface ChartListHeaderProps {
  sort: SortKey;
}

export default function ChartListHeader({ sort }: ChartListHeaderProps) {
  const isChangeRateSort = sort === '급상승' || sort === '급하락';
  const rowClass = `chart-list-header${isChangeRateSort ? ' chart-list-grid-7col' : ' chart-list-grid-8col'}`;

  return (
    <div className={rowClass}>
      <div className="chart-list-cell chart-list-cell-rank">순위</div>
      <div className="chart-list-cell chart-list-cell-logo" />
      <div className="chart-list-cell chart-list-cell-name">종목명</div>
      <div className="chart-list-cell chart-list-cell-price">현재가</div>
      {isChangeRateSort ? (
        <div className="chart-list-cell chart-list-cell-rate">등락률 순</div>
      ) : (
        <>
          <div className="chart-list-cell chart-list-cell-rate">등락률</div>
          <div className="chart-list-cell chart-list-cell-metric">{sort} 순</div>
        </>
      )}
      <div className="chart-list-cell chart-list-cell-share">토스증권 거래 비율</div>
      <div className="chart-list-cell chart-list-cell-summary">토스증권 AI 요약</div>
    </div>
  );
}
