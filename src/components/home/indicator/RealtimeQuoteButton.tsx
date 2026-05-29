import { useNavigate } from 'react-router-dom';

export default function RealtimeQuoteButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="realtime-quote-button"
      onClick={() => navigate('/login')}
    >
      실시간 시세 확인하기
    </button>
  );
}
