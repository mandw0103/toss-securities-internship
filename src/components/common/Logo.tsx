import { hashStringToSeed } from '../../mocks/prng';
import './Logo.css';

interface LogoProps {
  logoSeed: string;
  size?: number;
}

export default function Logo({ logoSeed, size = 32 }: LogoProps) {
  const seed = hashStringToSeed(logoSeed);
  const hue = seed % 360;
  const saturation = 55 + (seed % 20);
  const lightness = 50 + ((seed >>> 8) % 12);
  const bg = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <div
      className="common-logo"
      style={{ width: size, height: size, fontSize: size * 0.5, backgroundColor: bg }}
    >
      {logoSeed.slice(0, 1)}
    </div>
  );
}
