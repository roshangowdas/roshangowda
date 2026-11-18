// ==============================================================================
// Hardware, Battery & Reduced-Motion Performance Optimization Engine
// File: src/utils/performance.ts
// ==============================================================================

import { useState, useEffect } from "react";

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => void) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => void) | null;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
}

export interface PerformanceProfile {
  prefersReducedMotion: boolean;
  isLowBattery: boolean;
  isCharging: boolean;
  batteryLevel: number; // 0 to 1
  isLowPowerMode: boolean; // low battery or data saver or hardware constrained
  isHardwareConstrained: boolean;
  tier: "high" | "medium" | "low";
  // Optimized parameters for 3D Sphere Canvas
  sphere: {
    branches: number;
    speed: number;
    scale: number;
  };
  // Damping multiplier for GSAP Parallax scroll (0 to 1)
  parallaxDamping: number;
}

/**
 * Returns static initial profile snapshot for SSR or immediate render
 */
export function getInitialPerformanceProfile(): PerformanceProfile {
  let prefersReducedMotion = false;
  let isHardwareConstrained = false;

  if (typeof window !== "undefined") {
    prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nav = navigator as NavigatorWithBattery;
    const cpuCores = nav.hardwareConcurrency || 8;
    const ramGb = nav.deviceMemory || 8;
    const isSaveData = nav.connection?.saveData || false;

    if (cpuCores <= 4 || ramGb <= 4 || isSaveData) {
      isHardwareConstrained = true;
    }
  }

  const isLow = prefersReducedMotion || isHardwareConstrained;

  return {
    prefersReducedMotion,
    isLowBattery: false,
    isCharging: true,
    batteryLevel: 1.0,
    isLowPowerMode: isLow,
    isHardwareConstrained,
    tier: isLow ? "low" : "high",
    sphere: {
      branches: isLow ? 17 : 34,
      speed: prefersReducedMotion ? 0 : isLow ? 8 : 15,
      scale: isLow ? 80 : 88,
    },
    parallaxDamping: prefersReducedMotion ? 0 : isLow ? 0.45 : 1.0,
  };
}

/**
 * React Hook: usePerformanceTier
 *
 * Dynamically tracks:
 * 1. prefers-reduced-motion media query
 * 2. Battery Status API (low battery < 20% & unplugged)
 * 3. Hardware concurrency and memory constraints
 *
 * Automatically recalibrates particle counts, speeds, and GSAP damping
 * to sustain 60 FPS smoothly across all devices.
 */
export function usePerformanceTier(): PerformanceProfile {
  const [profile, setProfile] = useState<PerformanceProfile>(getInitialPerformanceProfile);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;
    const nav = navigator as NavigatorWithBattery;

    // 1. Reduced Motion Detection
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // 2. Hardware Checks
    const cpuCores = nav.hardwareConcurrency || 8;
    const ramGb = nav.deviceMemory || 8;
    const isSaveData = nav.connection?.saveData || false;
    const isMobile = window.innerWidth < 768;
    const isHardwareConstrained = cpuCores <= 4 || ramGb <= 4 || (isMobile && cpuCores <= 6) || isSaveData;

    let batteryManager: BatteryManager | null = null;
    let currentBatteryLevel = 1.0;
    let currentIsCharging = true;

    const recalculate = (
      reducedMotion: boolean,
      level: number,
      charging: boolean
    ) => {
      if (!isMounted) return;

      const isLowBattery = !charging && level <= 0.20; // unplugged and under 20%
      const isLowPowerMode = reducedMotion || isLowBattery || isHardwareConstrained;

      const tier: "high" | "medium" | "low" = isLowPowerMode
        ? "low"
        : isMobile || cpuCores <= 6
        ? "medium"
        : "high";

      const branches = tier === "low" ? 17 : 34;
      const speed = reducedMotion ? 0 : tier === "low" ? 7 : tier === "medium" ? 11 : 15;
      const scale = tier === "low" ? 78 : 88;
      const parallaxDamping = reducedMotion ? 0 : tier === "low" ? 0.35 : tier === "medium" ? 0.7 : 1.0;

      setProfile({
        prefersReducedMotion: reducedMotion,
        isLowBattery,
        isCharging: charging,
        batteryLevel: level,
        isLowPowerMode,
        isHardwareConstrained,
        tier,
        sphere: {
          branches,
          speed,
          scale,
        },
        parallaxDamping,
      });
    };

    // Initial calculation
    recalculate(motionQuery.matches, currentBatteryLevel, currentIsCharging);

    // Listener for reduced motion changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      recalculate(e.matches, currentBatteryLevel, currentIsCharging);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // 3. Battery API registration (Chrome, Edge, Android WebView, Opera)
    if (typeof nav.getBattery === "function") {
      nav.getBattery()
        .then((battery) => {
          if (!isMounted) return;
          batteryManager = battery;
          currentBatteryLevel = battery.level;
          currentIsCharging = battery.charging;

          recalculate(motionQuery.matches, battery.level, battery.charging);

          const onBatteryChange = () => {
            currentBatteryLevel = battery.level;
            currentIsCharging = battery.charging;
            recalculate(motionQuery.matches, battery.level, battery.charging);
          };

          battery.addEventListener("levelchange", onBatteryChange);
          battery.addEventListener("chargingchange", onBatteryChange);
        })
        .catch(() => {
          // Battery API denied or blocked by permissions policy - graceful fallback
        });
    }

    return () => {
      isMounted = false;
      motionQuery.removeEventListener("change", handleMotionChange);
      if (batteryManager) {
        batteryManager.removeEventListener("levelchange", () => {});
        batteryManager.removeEventListener("chargingchange", () => {});
      }
    };
  }, []);

  return profile;
}

export default usePerformanceTier;
