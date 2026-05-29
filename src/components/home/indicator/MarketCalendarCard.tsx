import { useNavigate } from 'react-router-dom';

export default function MarketCalendarCard() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="indicator-card indicator-card-static"
      onClick={() => navigate('/calendar')}
    >
      <span className="indicator-card-label">증시 캘린더</span>
      <h3 className="indicator-card-title">실적, 배당, 공모 일정</h3>
      <p className="indicator-card-subtitle">한 곳에서 확인하기</p>
    </button>
  );
}
