interface TabUnderlineProps {
  activeIndex: number;
  totalCount: number;
}

export default function TabUnderline({ activeIndex, totalCount }: TabUnderlineProps) {
  const widthPercent = 100 / totalCount;
  return (
    <div
      className="chart-tab-underline"
      style={{
        width: `${widthPercent}%`,
        transform: `translateX(${activeIndex * 100}%)`,
      }}
    />
  );
}
