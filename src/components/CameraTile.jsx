import React, { useEffect, useState } from 'react';
import { VideoOff } from 'lucide-react';

export default function CameraTile({ camera }) {
  const isOffline = camera.status === 'offline';
  const isDegraded = camera.status === 'degraded';
  const isOnline = camera.status === 'online';
  // CAM-03 or any camera labeled with intrusion has alert active
  const hasAlert = camera.id === 'CAM-03' || camera.hasAlert;

  const [timeStr, setTimeStr] = useState(() => formatTimestamp());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(formatTimestamp());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function formatTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    return `${day} ${month} ${hours}:${mins}:${secs}`;
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080c] shadow-lg transition-all duration-200 hover:border-white/[0.18]">
      {/* CCTV Monitor Screen Feed */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#050608]">
        {/* Subtle Surveillance Scanline & Grid Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, rgba(0, 0, 0, 0.9) 100%),
              linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 3px',
          }}
        />

        {/* Top-Left: REC Pill Overlay */}
        <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded bg-black/75 px-1.5 py-0.5 border border-white/10 backdrop-blur-sm">
          <span className={`h-1.5 w-1.5 rounded-full ${isOffline ? 'bg-slate-500' : 'bg-red-500 animate-pulse shadow-[0_0_6px_#ef4444]'}`} />
          <span className="font-mono text-[9.5px] font-bold tracking-wider text-white">REC</span>
        </div>

        {/* Top-Right: Surveillance Corner Brackets */}
        <div className="absolute right-2 top-2 z-10 opacity-70">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-white">
            <path d="M1 5V2a1 1 0 0 1 1-1h3M11 1h3a1 1 0 0 1 1 1v3M15 11v3a1 1 0 0 1-1 1h-3M5 15H2a1 1 0 0 1-1-1v-3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </div>

        {/* Center Overlay / Visual Detection */}
        {isOffline ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 bg-black/85 text-slate-400">
            <VideoOff size={20} strokeWidth={1.5} className="text-slate-500" />
            <span className="font-mono text-[10px] tracking-wider uppercase text-slate-500">Signal Lost</span>
          </div>
        ) : hasAlert ? (
          <div className="absolute inset-x-8 inset-y-4 z-10 flex items-start justify-center rounded-sm border border-red-500/80 bg-red-500/10 animate-pulse">
            <span className="rounded-b bg-red-600/90 px-1 py-0.2 text-[9px] font-mono font-bold text-white shadow">
              TRIP_01
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-sky-400/50">
              <div className="h-1 w-1 rounded-full bg-sky-400/80" />
            </div>
          </div>
        )}

        {/* Bottom Status / HUD Text */}
        {!isOffline && (
          <div className="absolute bottom-1.5 left-2 z-10">
            {hasAlert ? (
              <span className="font-mono text-[10px] font-bold text-[#ef4444] animate-pulse drop-shadow">
                MOTION DETECT
              </span>
            ) : isDegraded ? (
              <span className="font-mono text-[9.5px] font-medium text-[#f59e0b] drop-shadow">
                SIGNAL DEGRADED
              </span>
            ) : (
              <span className="font-mono text-[9.5px] font-medium text-[#4ade80] drop-shadow">
                FPS: 30.00 | OPTICAL HD
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Details / Metadata */}
      <div className="border-t border-white/[0.06] bg-[#07080c] px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[13px] font-bold tracking-tight text-white">
            {camera.id} · {camera.label}
          </p>

          {/* Status Badge */}
          {hasAlert ? (
            <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#ef4444] bg-[#7f1d1d]/80 border border-[#dc2626]/60">
              ALERT
            </span>
          ) : isOnline ? (
            <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#10b981] bg-[#064e3b]/80 border border-[#059669]/60">
              LIVE
            </span>
          ) : (
            <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-400 bg-white/10 border border-white/20">
              OFFLINE
            </span>
          )}
        </div>

        {/* Timestamp */}
        <p className="mt-1 font-mono text-[11px] tracking-wider uppercase text-slate-400">
          {timeStr}
        </p>
      </div>
    </div>
  );
}
