import type { ChartTab } from '../../../types/chart-tab';
import { CHART_TABS } from '../../../types/chart-tab';
import TabItem from './TabItem';
import TabUnderline from './TabUnderline';

interface ChartSectionTabsProps {
  activeTab: ChartTab;
  onChange: (tab: ChartTab) => void;
}

export default function ChartSectionTabs({ activeTab, onChange }: ChartSectionTabsProps) {
  const activeIndex = CHART_TABS.indexOf(activeTab);

  return (
    <div className="chart-tabs">
      {CHART_TABS.map((tab) => (
        <TabItem
          key={tab}
          label={tab}
          isActive={tab === activeTab}
          onClick={() => onChange(tab)}
        />
      ))}
      <TabUnderline activeIndex={activeIndex} totalCount={CHART_TABS.length} />
    </div>
  );
}
