import { useLocation } from 'react-router-dom';
import GNBTab from './GNBTab';
import './GNB.css';

const NAV_ITEMS = [
  { label: '홈', to: '/' },
  { label: '피드', to: '/feed/recommended' },
  { label: '주식 골라보기', to: '/screener' },
  { label: '내 계좌', to: null },
] as const;

export default function GNB() {
  const location = useLocation();

  return (
    <nav className="gnb">
      {NAV_ITEMS.map((item) => (
        <GNBTab
          key={item.label}
          label={item.label}
          to={item.to}
          isActive={item.to !== null && location.pathname === item.to}
        />
      ))}
    </nav>
  );
}
