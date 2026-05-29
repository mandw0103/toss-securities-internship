import { useEffect, useRef, useState } from 'react';
import type { Stock } from '../../../types/stock';
import CarouselArrow from './CarouselArrow';
import MarketCalendarCard from './MarketCalendarCard';
import ExchangeRateCard from './ExchangeRateCard';
import RecommendedStockCard from './RecommendedStockCard';
import './indicator.css';

interface IndicatorCarouselProps {
  recommendedStocks: Stock[];
}

export default function IndicatorCarousel({ recommendedStocks }: IndicatorCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      setCanScrollLeft(track.scrollLeft > 1);
      setCanScrollRight(
        track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
      );
    };

    update();
    track.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [recommendedStocks.length]);

  const handlePrev = () => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  };

  const handleNext = () => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="indicator-carousel">
      {canScrollLeft && <CarouselArrow direction="left" onClick={handlePrev} />}
      <div className="indicator-carousel-track" ref={trackRef}>
        <MarketCalendarCard />
        <ExchangeRateCard />
        {recommendedStocks.map((stock) => (
          <RecommendedStockCard key={stock.stockId} stock={stock} />
        ))}
      </div>
      {canScrollRight && <CarouselArrow direction="right" onClick={handleNext} />}
    </div>
  );
}
