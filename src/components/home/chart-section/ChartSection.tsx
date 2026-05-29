import { useState } from 'react';
import type { Stock } from '../../../types/stock';
import type { ChartTab } from '../../../types/chart-tab';
import type { ChartFilterState } from '../../../types/chart-filter';
import { DEFAULT_FILTER } from '../../../types/chart-filter';
import ChartSectionTabs from './ChartSectionTabs';
import ChartSectionFilter from './ChartSectionFilter';
import ChartSectionList from './ChartSectionList';
import './chart-section.css';

interface ChartSectionProps {
  stocks: Stock[];
}

export default function ChartSection({ stocks }: ChartSectionProps) {
  const [activeTab, setActiveTab] = useState<ChartTab>('실시간 차트');
  const [filter, setFilter] = useState<ChartFilterState>(DEFAULT_FILTER);

  return (
    <section className="chart-section">
      <ChartSectionTabs activeTab={activeTab} onChange={setActiveTab} />
      <ChartSectionFilter value={filter} onChange={setFilter} />
      <ChartSectionList stocks={stocks} filter={filter} />
    </section>
  );
}
