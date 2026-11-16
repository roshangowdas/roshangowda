import React from "react";
import { X, RotateCcw, Sliders, Type, Palette, Eye, Activity } from "lucide-react";
import { VectorWordmarkProps, defaultVectorWordmarkProps } from "./VectorWordmark";

interface WordmarkCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  config: VectorWordmarkProps;
  onChange: (updated: Partial<VectorWordmarkProps>) => void;
  onReset: () => void;
}

const COLOR_PRESETS = [
  { name: "Cyan", hex: "#00f0ff", label: "CYAN_CORE" },
  { name: "Emerald", hex: "#10b981", label: "EMERALD_MATRIX" },
  { name: "Violet", hex: "#a855f7", label: "VIOLET_PULSE" },
  { name: "Amber", hex: "#f59e0b", label: "AMBER_VECTOR" },
  { name: "Crimson", hex: "#f43f5e", label: "CRIMSON_ALERT" },
  { name: "Ghost White", hex: "#ffffff", label: "GHOST_MONO" },
];

const TEXT_PRESETS = [
  "ROSHAN",
  "ARCHITECT",
  "CREATIVE",
  "SYSTEMS",
  "WEBGL 2.0",
];

export const WordmarkCustomizer: React.FC<WordmarkCustomizerProps> = ({
  isOpen,
  onClose,
  config,
  onChange,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed bottom-6 right-6 z-50 w-full max-w-sm glass-panel-elevated rounded-xl shadow-2xl shadow-black/80 p-5 text-white animate-in fade-in slide-in-from-bottom-4 duration-200 border border-cyan-500/30">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="font-mono text-xs font-semibold tracking-wider text-cyan-300">
            RIG_INSPECTOR // SHADER_TUNER
          </h3>
        </div>
        <div className="flex items-center space-x-1.5">
          <button
            onClick={onReset}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/5 transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/5 transition-colors"
            title="Close inspector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* Wordmark Text Input */}
        <div>
          <label className="flex items-center justify-between font-mono text-[11px] text-zinc-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Type className="w-3 h-3 text-cyan-400" /> WORDMARK_TEXT
            </span>
            <span className="text-zinc-500 text-[10px]">MAX 16 CHARS</span>
          </label>
          <input
            type="text"
            maxLength={16}
            value={config.text || ""}
            onChange={(e) => onChange({ text: e.target.value.toUpperCase() })}
            className="w-full bg-zinc-950/80 border border-white/10 rounded px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors uppercase tracking-widest"
            placeholder="TYPE WORDMARK..."
          />
          {/* Quick Preset Pills */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {TEXT_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => onChange({ text: preset })}
                className={`font-mono text-[10px] px-2 py-0.5 rounded border transition-colors ${
                  config.text === preset
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                    : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color Palettes */}
        <div>
          <label className="flex items-center justify-between font-mono text-[11px] text-zinc-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Palette className="w-3 h-3 text-cyan-400" /> RIG_ACCENT_HUE
            </span>
            <span className="font-mono text-[10px] text-cyan-400">
              {config.accent}
            </span>
          </label>
          <div className="grid grid-cols-6 gap-1.5">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c.hex}
                onClick={() => onChange({ accent: c.hex })}
                className={`group relative h-7 rounded border transition-all flex items-center justify-center ${
                  config.accent?.toLowerCase() === c.hex.toLowerCase()
                    ? "border-white ring-2 ring-cyan-400/50 scale-105"
                    : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/40"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
              >
                {config.accent?.toLowerCase() === c.hex.toLowerCase() && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reach Radius Slider */}
        <div>
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-cyan-400" /> REVEAL_REACH (px)
            </span>
            <span className="text-zinc-400">{config.reach ?? 290}</span>
          </div>
          <input
            type="range"
            min={100}
            max={500}
            step={10}
            value={config.reach ?? 290}
            onChange={(e) => onChange({ reach: parseFloat(e.target.value) })}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
        </div>

        {/* Lattice Spread Slider */}
        <div>
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-300 mb-1">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-cyan-400" /> LATTICE_SPREAD
            </span>
            <span className="text-zinc-400">
              {config.handles?.spread ?? 27}
            </span>
          </div>
          <input
            type="range"
            min={12}
            max={55}
            step={1}
            value={config.handles?.spread ?? 27}
            onChange={(e) =>
              onChange({
                handles: {
                  ...config.handles,
                  spread: parseFloat(e.target.value),
                },
              })
            }
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
        </div>

        {/* Speed & Damping Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-300 mb-1">
              <span>SWEEP_SPEED</span>
              <span className="text-zinc-400">{config.speed ?? 50}</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={config.speed ?? 50}
              onChange={(e) => onChange({ speed: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
            />
          </div>

          <div>
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-300 mb-1">
              <span>LERP_DAMPING</span>
              <span className="text-zinc-400">{config.damping ?? 60}</span>
            </div>
            <input
              type="range"
              min={15}
              max={95}
              step={5}
              value={config.damping ?? 60}
              onChange={(e) =>
                onChange({ damping: parseFloat(e.target.value) })
              }
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
            />
          </div>
        </div>

        {/* Toggle Coordinate Labels */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="font-mono text-[11px] text-zinc-300">
            SHOW_COORDINATE_HUD
          </span>
          <button
            onClick={() =>
              onChange({
                handles: {
                  ...config.handles,
                  labels: !(config.handles?.labels ?? true),
                },
              })
            }
            className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
              config.handles?.labels ?? true ? "bg-cyan-500" : "bg-zinc-800"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                config.handles?.labels ?? true
                  ? "left-4.5"
                  : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>GL_ACCELERATED // 60 FPS</span>
        <span className="text-cyan-400/80">INTERACTIVE</span>
      </div>
    </aside>
  );
};

