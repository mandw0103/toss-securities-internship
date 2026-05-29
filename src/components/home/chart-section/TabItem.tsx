import type { ChartTab } from '../../../types/chart-tab';

interface TabItemProps {
  label: ChartTab;
  isActive: boolean;
  onClick: () => void;
}

export default function TabItem({ label, isActive, onClick }: TabItemProps) {
  return (
    <button
      type="button"
      className={`chart-tab-item${isActive ? ' chart-tab-item-active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
