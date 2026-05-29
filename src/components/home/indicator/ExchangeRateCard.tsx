import { useNavigate } from 'react-router-dom';

export default function ExchangeRateCard() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="indicator-card indicator-card-static"
      onClick={() => navigate('/exchange')}
    >
      <span className="indicator-card-label">환율</span>
      <h3 className="indicator-card-title">USD · JPY · EUR</h3>
      <p className="indicator-card-subtitle">실시간 환율 보기</p>
    </button>
  );
}
