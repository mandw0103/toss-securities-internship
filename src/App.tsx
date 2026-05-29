import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import ScreenerPage from './pages/ScreenerPage';
import CalendarPage from './pages/CalendarPage';
import ExchangePage from './pages/ExchangePage';
import LoginPage from './pages/LoginPage';
import StockDetailPage from './pages/StockDetailPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed/recommended" element={<FeedPage />} />
        <Route path="/screener" element={<ScreenerPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stocks/:stockId" element={<StockDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
