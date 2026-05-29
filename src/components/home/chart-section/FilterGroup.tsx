import { useLayoutEffect, useRef, useState } from 'react';
import FilterPill from './FilterPill';
import SlidingIndicator from './SlidingIndicator';

interface FilterGroupProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}

export default function FilterGroup({ options, value, onSelect }: FilterGroupProps) {
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const activeIndex = options.indexOf(value);
    const el = pillRefs.current[activeIndex];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [value, options]);

  return (
    <div className="filter-group">
      <SlidingIndicator left={indicator.left} width={indicator.width} />
      {options.map((opt, idx) => (
        <FilterPill
          key={opt}
          ref={(el) => {
            pillRefs.current[idx] = el;
          }}
          label={opt}
          isActive={opt === value}
          onClick={() => onSelect(opt)}
        />
      ))}
    </div>
  );
}
