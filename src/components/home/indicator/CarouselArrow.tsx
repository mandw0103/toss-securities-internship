interface CarouselArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export default function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  return (
    <button
      type="button"
      className={`carousel-arrow carousel-arrow-${direction}`}
      onClick={onClick}
      aria-label={direction === 'left' ? '이전' : '다음'}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
}
