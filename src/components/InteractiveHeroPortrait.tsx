import React, { useState, useRef, useEffect, useCallback } from "react";

interface InteractiveHeroPortraitProps {
  baseImageSrc?: string;
  revealImageSrc?: string;
  alt?: string;
  className?: string;
}

/**
 * InteractiveHeroPortrait
 *
 * Displays the anime character (L) as the primary portrait.
 * When the user moves the cursor over the image, a dynamic cursor spotlight
 * reveals the real photo underneath, following the cursor in real time.
 */
export const InteractiveHeroPortrait: React.FC<InteractiveHeroPortraitProps> = ({
  baseImageSrc = "/images/character-l.png",
  revealImageSrc = "/images/roshan.png",
  alt = "Roshan Gowda",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [smoothCoords, setSmoothCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Smooth lerp following cursor for organic lens movement
  useEffect(() => {
    let currentX = smoothCoords.x;
    let currentY = smoothCoords.y;

    const animate = () => {
      const targetX = coords.x;
      const targetY = coords.y;

      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;

      setSmoothCoords({ x: currentX, y: currentY });

      if (isHovered) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    if (isHovered) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [coords, isHovered]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
    if (!isHovered) {
      setSmoothCoords({ x, y });
      setIsHovered(true);
    }
  }, [isHovered]);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
    setSmoothCoords({ x, y });
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Spotlight aperture radius (responsive)
  const spotlightRadius = 175;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative group cursor-crosshair select-none pointer-events-auto ${className}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
      }}
    >
      {/* 1. Base Layer: Anime Character Image (Default Visible) */}
      <img
        src={baseImageSrc}
        alt={`${alt} - Anime Avatar`}
        draggable={false}
        className="relative z-10 object-contain object-bottom h-[74vh] sm:h-[80vh] md:h-[84vh] lg:h-[88vh] max-h-[90vh] max-w-[92vw] w-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] will-change-transform"
      />

      {/* 2. Revealed Layer: Roshan's Real Photo (Unveiled by Cursor Spotlight) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none overflow-hidden transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(circle ${spotlightRadius}px at ${smoothCoords.x}px ${smoothCoords.y}px, black 0%, black 48%, rgba(0,0,0,0.6) 72%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at ${smoothCoords.x}px ${smoothCoords.y}px, black 0%, black 48%, rgba(0,0,0,0.6) 72%, transparent 100%)`,
        }}
      >
        <img
          src={revealImageSrc}
          alt={`${alt} - Real Photo`}
          draggable={false}
          className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* 3. Futuristic Tactical Lens HUD Ring (Follows Cursor Spotlight) */}
      <div
        className="absolute z-30 pointer-events-none transition-opacity duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${smoothCoords.x}px`,
          top: `${smoothCoords.y}px`,
          width: `${spotlightRadius * 2}px`,
          height: `${spotlightRadius * 2}px`,
          opacity: isHovered ? 1 : 0,
        }}
      >
        {/* Outer glowing aperture ring */}
        <div className="w-full h-full rounded-full border border-red-500/50 shadow-[0_0_25px_rgba(235,27,56,0.45),inset_0_0_15px_rgba(235,27,56,0.2)] animate-pulse" />

        {/* Tactical Crosshair Ticks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-red-400/80 shadow-[0_0_8px_#eb1b38]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-0.5 bg-red-400/80 shadow-[0_0_8px_#eb1b38]" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-0.5 bg-red-400/80 shadow-[0_0_8px_#eb1b38]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-3 w-0.5 bg-red-400/80 shadow-[0_0_8px_#eb1b38]" />

        {/* Telemetry Micro Label */}
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase bg-black/85 text-red-400 border border-red-500/30 whitespace-nowrap shadow-lg">
          IDENTITY_SCAN // REAL_PHOTO
        </span>
      </div>

      {/* 4. Subtle Hint Badge (Fades out when hovered) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-300 group-hover:opacity-0 opacity-75">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/80 border border-white/15 text-zinc-300 whitespace-nowrap shadow-xl flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#eb1b38] animate-ping" />
          <span>Hover to reveal photo</span>
        </span>
      </div>
    </div>
  );
};

export default InteractiveHeroPortrait;
