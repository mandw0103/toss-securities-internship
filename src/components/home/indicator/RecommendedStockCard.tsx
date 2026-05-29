import { useNavigate } from 'react-router-dom';
import type { Stock } from '../../../types/stock';
import Logo from '../../common/Logo';
import Sparkline from './Sparkline';
import RealtimeQuoteButton from './RealtimeQuoteButton';

interface RecommendedStockCardProps {
  stock: Stock;
}

export default function RecommendedStockCard({ stock }: RecommendedStockCardProps) {
  const navigate = useNavigate();

  return (
    <div className="indicator-card indicator-card-stock">
      <button
        type="button"
        className="indicator-card-stock-body"
        onClick={() => navigate(`/stocks/${stock.stockId}`)}
      >
        <div className="indicator-card-stock-header">
          <Logo logoSeed={stock.logoSeed} size={32} />
          <span className="indicator-card-stock-name">{stock.name}</span>
        </div>
        <Sparkline stockId={stock.stockId} />
      </button>
      <RealtimeQuoteButton />
    </div>
  );
}
