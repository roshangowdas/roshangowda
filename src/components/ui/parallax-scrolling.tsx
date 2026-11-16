'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowDown, Compass } from 'lucide-react';

export interface ParallaxComponentProps {
  title?: string;
  layer1?: string;
  layer2?: string;
  layer4?: string;
  showContent?: boolean;
  className?: string;
}

export function ParallaxComponent({
  title = "Parallax",
  layer1 = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
  layer2 = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
  layer4 = "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80",
  showContent = true,
  className = "",
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    let tl: gsap.core.Timeline | null = null;
    if (triggerElement) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl?.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      if (tl) {
        tl.kill();
      }
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`parallax ${className}`} ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img
              src={layer1}
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt="Parallax Background Layer"
              className="parallax__layer-img brightness-75 contrast-125"
            />
            <img
              src={layer2}
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt="Parallax Midground Layer"
              className="parallax__layer-img opacity-85 mix-blend-screen"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">{title}</h2>
            </div>
            <img
              src={layer4}
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt="Parallax Foreground Layer"
              className="parallax__layer-img opacity-90"
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>

      {showContent && (
        <section className="parallax__content">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Compass className="w-12 h-12 text-[#eb1b38] animate-spin" style={{ animationDuration: '12s' }} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 160 160"
              fill="none"
              className="osmo-icon-svg"
            >
              <path
                d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
                fill="currentColor"
              />
            </svg>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4beab] tracking-widest uppercase">
              <span>Scroll down to continue</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#eb1b38] animate-bounce" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ParallaxComponent;

