interface SlidingIndicatorProps {
  left: number;
  width: number;
}

export default function SlidingIndicator({ left, width }: SlidingIndicatorProps) {
  return (
    <div
      className="sliding-indicator"
      style={{ transform: `translateX(${left}px)`, width: `${width}px` }}
    />
  );
}
