import './SearchResultItem.css';

interface SearchResultItemProps {
  name: string;
  onClick: () => void;
}

export default function SearchResultItem({ name, onClick }: SearchResultItemProps) {
  return (
    <li className="search-result-item" onClick={onClick}>
      {name}
    </li>
  );
}
