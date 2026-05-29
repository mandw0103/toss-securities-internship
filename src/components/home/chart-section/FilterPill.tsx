import type { Ref } from 'react';

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  ref?: Ref<HTMLButtonElement>;
}

export default function FilterPill({ label, isActive, onClick, ref }: FilterPillProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={`filter-pill${isActive ? ' filter-pill-active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
