import React, { useState } from 'react';
import { GalleryAngle, PropertyListing } from '../data/properties';

interface ArchitecturalCanvasProps {
  variant?: PropertyListing['illustrationVariant'] | 'hero';
  angle?: GalleryAngle;
  imageUrl?: string;
  className?: string;
  label?: string;
}

/**
 * Renders real high-resolution architectural photography with automatic
 * resilient fallback and dedicated CAD floor plan blueprint rendering.
 */
export const ArchitecturalCanvas: React.FC<ArchitecturalCanvasProps> = ({
  angle = 'Exterior Dusk',
  imageUrl,
  className = '',
  label,
}) => {
  const [imgError, setImgError] = useState(false);

  if (angle === 'Architectural Plan') {
    return (
      <div className={`relative overflow-hidden bg-[#162321] text-[#E6E2DA] ${className}`}>
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={label || 'Architectural CAD floor plan'}
        >
          <defs>
            <pattern id="cad-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(230,226,218,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="800" height="500" fill="#13211F" />
          <rect width="800" height="500" fill="url(#cad-grid)" />

          {/* Outer Plot Boundary */}
          <rect x="90" y="55" width="620" height="390" stroke="#7CC4B8" strokeWidth="1.5" strokeDasharray="6 4" />
          {/* Main Building Footprint */}
          <rect x="140" y="95" width="380" height="310" fill="rgba(255,255,255,0.03)" stroke="#F4F0EA" strokeWidth="2.5" />
          {/* Internal Partitions */}
          <line x1="330" y1="95" x2="330" y2="405" stroke="#F4F0EA" strokeWidth="2" />
          <line x1="140" y1="245" x2="520" y2="245" stroke="#F4F0EA" strokeWidth="2" />
          <line x1="235" y1="245" x2="235" y2="405" stroke="#F4F0EA" strokeWidth="1.5" />
          {/* Pool & Deck */}
          <rect x="545" y="135" width="125" height="230" fill="rgba(45,168,148,0.18)" stroke="#5EEAD4" strokeWidth="1.5" />
          {/* Staircase */}
          <g stroke="#C8B9A6" strokeWidth="1.2">
            <line x1="345" y1="210" x2="405" y2="210" />
            <line x1="345" y1="220" x2="405" y2="220" />
            <line x1="345" y1="230" x2="405" y2="230" />
            <rect x="345" y="195" width="60" height="45" fill="none" />
          </g>
          {/* Door Swings */}
          <path d="M 330 150 A 35 35 0 0 1 365 185" stroke="#7CC4B8" strokeWidth="1.2" fill="none" />
          <path d="M 270 245 A 35 35 0 0 0 235 210" stroke="#7CC4B8" strokeWidth="1.2" fill="none" />

          {/* Dimension Callouts */}
          <text x="165" y="135" fill="#F4F0EA" fontSize="13" fontFamily="JetBrains Mono, monospace">
            ATRIUM VOID · 8.4m × 6.2m
          </text>
          <text x="355" y="135" fill="#F4F0EA" fontSize="13" fontFamily="JetBrains Mono, monospace">
            PRIMARY WING · 7.2m × 5.8m
          </text>
          <text x="160" y="285" fill="#C8B9A6" fontSize="12" fontFamily="JetBrains Mono, monospace">
            WET/DRY KITCHEN
          </text>
          <text x="355" y="285" fill="#C8B9A6" fontSize="12" fontFamily="JetBrains Mono, monospace">
            GALLERY GARAGE &amp; SOLAR
          </text>
          <text x="565" y="255" fill="#5EEAD4" fontSize="12" fontFamily="JetBrains Mono, monospace">
            LAP POOL
          </text>
          <text x="105" y="432" fill="#7CC4B8" fontSize="11" fontFamily="JetBrains Mono, monospace">
            COVA STRUCTURAL CAD · RIVERS STATE BUILDING CODE VERIFIED · SCALE 1:100
          </text>
        </svg>
      </div>
    );
  }

  const resolvedPhoto =
    imageUrl ||
    (angle === 'Living Atrium'
      ? '/images/interior-living.jpg'
      : angle === 'Primary Suite'
      ? '/images/interior-suite.jpg'
      : angle === 'Courtyard & Pool'
      ? '/images/pool-courtyard.jpg'
      : '/images/villa-01.jpg');

  if (!imgError) {
    return (
      <div className={`relative overflow-hidden bg-[#182220] ${className}`}>
        <img
          src={resolvedPhoto}
          alt={label || 'Cova Luxury Architectural Residence'}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Resilient Fallback Container
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#182623] via-[#0D4F48] to-[#141413] flex items-center justify-center p-6 text-center ${className}`}
    >
      <div className="space-y-1 text-[#FAF8F5]">
        <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#5EEAD4]">
          Cova Architectural Portfolio
        </div>
        <div className="text-sm font-display">{label || 'Port Harcourt Residence'}</div>
      </div>
    </div>
  );
};
