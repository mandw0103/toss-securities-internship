import { useMemo } from 'react';
import { useStocks } from '../hooks/useStocks';
import { selectRecommended } from '../utils/stocks';
import MarketStatusBar from '../components/home/indicator/MarketStatusBar';
import IndicatorCarousel from '../components/home/indicator/IndicatorCarousel';
import ChartSection from '../components/home/chart-section/ChartSection';

export default function HomePage() {
  const { data: stocks = [], error } = useStocks();
  const recommended = useMemo(() => selectRecommended(stocks, 3), [stocks]);

  return (
    <main className="home-page">
      <MarketStatusBar />
      <IndicatorCarousel recommendedStocks={recommended} />
      <ChartSection stocks={stocks} stockError={error} />
    </main>
  );
}
