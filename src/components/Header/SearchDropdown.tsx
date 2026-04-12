import type { Stock } from '../../apis/stocks';
import SearchResultItem from './SearchResultItem';
import './SearchDropdown.css';

interface SearchDropdownProps {
  results: Stock[];
  isLoading: boolean;
  isError: boolean;
  onSelect: (stock: Stock) => void;
}

export default function SearchDropdown({ results, isLoading, isError, onSelect }: SearchDropdownProps) {
  if (isLoading) {
    return (
      <div className="search-dropdown">
        <p className="search-dropdown-message">검색 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="search-dropdown">
        <p className="search-dropdown-message">검색 중 문제가 발생했습니다.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-dropdown">
        <p className="search-dropdown-message">검색 결과 없음</p>
      </div>
    );
  }

  return (
    <ul className="search-dropdown">
      {results.map((stock) => (
        <SearchResultItem
          key={stock.id}
          name={stock.name}
          onClick={() => onSelect(stock)}
        />
      ))}
    </ul>
  );
}
