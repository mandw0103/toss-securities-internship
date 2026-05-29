interface MarketStatusItemProps {
  label: string;
}

export default function MarketStatusItem({ label }: MarketStatusItemProps) {
  return <span className="market-status-item">{label}</span>;
}
