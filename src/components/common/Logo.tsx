import { useState } from 'react';
import { hashStringToSeed } from '../../mocks/prng';
import './Logo.css';

interface LogoProps {
  logoSeed: string;
  logoImageUrl?: string;
  size?: number;
}

export default function Logo({ logoSeed, logoImageUrl, size = 32 }: LogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const seed = hashStringToSeed(logoSeed);
  const hue = seed % 360;
  const saturation = 55 + (seed % 20);
  const lightness = 50 + ((seed >>> 8) % 12);
  const bg = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const showImage = Boolean(logoImageUrl) && !imageFailed;

  return (
    <div
      className="common-logo"
      style={{ width: size, height: size, fontSize: size * 0.5, backgroundColor: bg }}
    >
      {showImage ? (
        <img
          className="common-logo-image"
          src={logoImageUrl}
          alt=""
          onError={() => setImageFailed(true)}
        />
      ) : (
        logoSeed.slice(0, 1)
      )}
    </div>
  );
}
