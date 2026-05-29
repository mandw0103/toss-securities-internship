import MarketStatusItem from './MarketStatusItem';
import './indicator.css';

export default function MarketStatusBar() {
  return (
    <div className="market-status-bar">
      <MarketStatusItem label="국내 장 닫힘" />
      <MarketStatusItem label="해외 장 닫힘" />
    </div>
  );
}
