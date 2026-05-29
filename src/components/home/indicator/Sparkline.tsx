import { useMemo } from 'react';
import { generateSparkline } from '../../../mocks/stocks';

interface SparklineProps {
  stockId: string;
  length?: number;
  width?: number;
  height?: number;
}

export default function Sparkline({
  stockId,
  length = 30,
  width = 200,
  height = 60,
}: SparklineProps) {
  const points = useMemo(() => generateSparkline(stockId, length), [stockId, length]);

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  const polyline = points
    .map((value, idx) => {
      const x = idx * stepX;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const isUp = points[points.length - 1] >= points[0];
  const stroke = isUp ? '#f04452' : '#3182f6';

  return (
    <svg
      className="sparkline"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <polyline fill="none" stroke={stroke} strokeWidth="2" points={polyline} />
    </svg>
  );
}
