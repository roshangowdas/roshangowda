import React from "react";

/**
 * FilmGrain
 * Subtle analog 35mm film-grain & noise texture overlay.
 * Eliminates digital banding across deep obsidian blacks (#000000) and crimson gradients
 * while remaining fully pointer-events-none and hardware-composited for zero scroll-impact.
 */
export const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.035 }) => {
  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-0 z-40 select-none overflow-hidden will-change-transform"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  );
};

export default FilmGrain;
