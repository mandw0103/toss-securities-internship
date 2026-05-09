import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import './Logo.css';

export default function Logo() {
  return (
    <Link to="/" className="logo-link">
      <img src={logoImg} alt="토스증권" className="logo-img" />
    </Link>
  );
}
