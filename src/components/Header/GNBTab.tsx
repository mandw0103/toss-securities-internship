import { Link } from 'react-router-dom';
import './GNBTab.css';

interface GNBTabProps {
  label: string;
  to: string | null;
  isActive: boolean;
}

export default function GNBTab({ label, to, isActive }: GNBTabProps) {
  if (to === null) {
    return (
      <span className={`gnb-tab gnb-tab--disabled`}>
        {label}
      </span>
    );
  }

  return (
    <Link
      to={to}
      className={`gnb-tab ${isActive ? 'gnb-tab--active' : ''}`}
    >
      {label}
    </Link>
  );
}
