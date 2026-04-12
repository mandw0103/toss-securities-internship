import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import ScreenerPage from './pages/ScreenerPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed/recommended" element={<FeedPage />} />
        <Route path="/screener" element={<ScreenerPage />} />
      </Routes>
    </>
  );
}

export default App;
