import type { ChartFilterState, MarketFilter, SortKey } from '../../../types/chart-filter';
import { MARKET_OPTIONS, SORT_OPTIONS, PERIOD_OPTIONS } from '../../../types/chart-filter';
import type { Period } from '../../../types/stock';
import FilterGroup from './FilterGroup';

interface ChartSectionFilterProps {
  value: ChartFilterState;
  onChange: (next: ChartFilterState) => void;
}

export default function ChartSectionFilter({ value, onChange }: ChartSectionFilterProps) {
  return (
    <div className="chart-filter">
      <FilterGroup
        options={MARKET_OPTIONS}
        value={value.market}
        onSelect={(v) => onChange({ ...value, market: v as MarketFilter })}
      />
      <FilterGroup
        options={SORT_OPTIONS}
        value={value.sort}
        onSelect={(v) => onChange({ ...value, sort: v as SortKey })}
      />
      <FilterGroup
        options={PERIOD_OPTIONS}
        value={value.period}
        onSelect={(v) => onChange({ ...value, period: v as Period })}
      />
    </div>
  );
}
