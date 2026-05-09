import Logo from './Logo';
import GNB from './GNB';
import SearchBar from './SearchBar';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <Logo />
          <GNB />
        </div>
        <SearchBar />
      </div>
    </header>
  );
}
