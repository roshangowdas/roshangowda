"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"

export interface PreviewItem {
  image: string
  title: string
  subtitle: string
  tag?: string
}

export type PreviewDataMap = Record<string, PreviewItem>

const defaultPreviewData: PreviewDataMap = {
  midjourney: {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    title: "Midjourney",
    subtitle: "Create stunning AI-generated artwork",
  },
  stable: {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    title: "Stable Diffusion",
    subtitle: "Open-source generative AI model",
  },
  leonardo: {
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    title: "Leonardo AI",
    subtitle: "Production-ready creative assets",
  },
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Syne:wght@600;700;800&family=Inter:wght@400;600;800&display=swap');

  .hover-preview-container {
    min-height: 100vh;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
    position: relative;
  }

  .hover-preview-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 2;
  }

  .ambient-glow {
    position: absolute;
    width: 650px;
    height: 650px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(235, 27, 56, 0.12) 0%, rgba(130, 25, 35, 0.05) 45%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: hoverPulse 8s ease-in-out infinite;
  }

  @keyframes hoverPulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.1); }
  }

  .content-container {
    max-width: 960px;
    width: 100%;
    position: relative;
    z-index: 10;
  }

  .text-block {
    font-size: clamp(1.4rem, 3.2vw, 2.3rem);
    line-height: 1.65;
    color: #9c8e84;
    font-weight: 400;
    letter-spacing: -0.015em;
  }

  .text-block p {
    margin-bottom: 1.6em;
  }

  .hover-link {
    color: #ffffff;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #eb1b38, #ff526a, #d4beab);
    transition: width 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after {
    width: 100%;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transform: translateY(12px) scale(0.94);
    transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: #110d0f;
    border-radius: 16px;
    padding: 8px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(235, 27, 56, 0.25),
      0 0 45px rgba(235, 27, 56, 0.15);
    overflow: hidden;
    backdrop-filter: blur(14px);
  }

  .preview-card img {
    width: 290px;
    height: 170px;
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }

  .preview-card-tag {
    display: inline-block;
    padding: 2px 8px;
    margin: 8px 8px 0;
    font-size: 0.65rem;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(235, 27, 56, 0.15);
    color: #eb1b38;
    border: 1px solid rgba(235, 27, 56, 0.3);
    border-radius: 4px;
  }

  .preview-card-title {
    padding: 6px 8px 4px;
    font-size: 0.95rem;
    color: #ffffff;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.01em;
  }

  .preview-card-subtitle {
    padding: 0 8px 8px;
    font-size: 0.78rem;
    color: #a8988d;
    line-height: 1.4;
  }
`

export const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  className = "",
}: {
  previewKey: string
  children: React.ReactNode
  onHoverStart: (key: string, e: React.MouseEvent) => void
  onHoverMove: (e: React.MouseEvent) => void
  onHoverEnd: () => void
  className?: string
}) => {
  return (
    <span
      className={`hover-link ${className}`}
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </span>
  )
}

export const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: PreviewItem | null
  position: { x: number; y: number }
  isVisible: boolean
  cardRef?: React.Ref<HTMLDivElement>
}) => {
  if (!data) return null

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {data.tag && <div className="preview-card-tag">{data.tag}</div>}
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  )
}

export interface HoverPreviewProps {
  data?: PreviewDataMap
  children?: (handlers: {
    handleHoverStart: (key: string, e: React.MouseEvent) => void
    handleHoverMove: (e: React.MouseEvent) => void
    handleHoverEnd: () => void
  }) => React.ReactNode
}

export function HoverPreview({ data = defaultPreviewData, children }: HoverPreviewProps) {
  const [activePreview, setActivePreview] = useState<PreviewItem | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Preload preview images on mount
  useEffect(() => {
    Object.entries(data).forEach(([, item]) => {
      if (item.image) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = item.image
      }
    })
  }, [data])

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 310
    const cardHeight = 260
    const offsetY = 20

    let x = e.clientX - cardWidth / 2
    let y = e.clientY - cardHeight - offsetY

    // Keep card on screen bounds
    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20
    }
    if (x < 20) {
      x = 20
    }

    if (y < 20) {
      y = e.clientY + offsetY
    }

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      const item = data[key]
      if (item) {
        setActivePreview(item)
        setIsVisible(true)
        updatePosition(e)
      }
    },
    [data, updatePosition],
  )

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition],
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <>
      <style>{styles}</style>
      <div className="hover-preview-container">
        <div className="ambient-glow" />

        <div className="content-container">
          {children ? (
            children({ handleHoverStart, handleHoverMove, handleHoverEnd })
          ) : (
            <div className="text-block">
              <p>
                Explore{" "}
                <HoverLink
                  previewKey="midjourney"
                  onHoverStart={handleHoverStart}
                  onHoverMove={handleHoverMove}
                  onHoverEnd={handleHoverEnd}
                >
                  Midjourney
                </HoverLink>{" "}
                for breathtaking AI-generated artwork and illustrations.
              </p>

              <p>
                For open-source freedom try{" "}
                <HoverLink
                  previewKey="stable"
                  onHoverStart={handleHoverStart}
                  onHoverMove={handleHoverMove}
                  onHoverEnd={handleHoverEnd}
                >
                  Stable Diffusion
                </HoverLink>{" "}
                or generate production assets with{" "}
                <HoverLink
                  previewKey="leonardo"
                  onHoverStart={handleHoverStart}
                  onHoverMove={handleHoverMove}
                  onHoverEnd={handleHoverEnd}
                >
                  Leonardo AI
                </HoverLink>
                .
              </p>
            </div>
          )}
        </div>

        <PreviewCard data={activePreview} position={position} isVisible={isVisible} cardRef={cardRef} />
      </div>
    </>
  )
}

export default HoverPreview
