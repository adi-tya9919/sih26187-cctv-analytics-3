import React from 'react';

function timeAgo(timestamp) {
  if (!timestamp) return 'just now';
  const diffMs = Date.now() - timestamp;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const SEVERITY_CONFIG = {
  critical: {
    bar: 'bg-[#ef4444]',
    badgeBg: 'bg-[#ef4444]/15 border-[#ef4444]/35 text-[#ef4444]',
    label: 'CRITICAL',
  },
  high: {
    bar: 'bg-[#ef4444]',
    badgeBg: 'bg-[#ef4444]/15 border-[#ef4444]/35 text-[#ef4444]',
    label: 'HIGH',
  },
  medium: {
    bar: 'bg-[#f59e0b]',
    badgeBg: 'bg-[#f59e0b]/15 border-[#f59e0b]/35 text-[#f59e0b]',
    label: 'MED',
  },
  low: {
    bar: 'bg-[#06b6d4]',
    badgeBg: 'bg-[#06b6d4]/15 border-[#06b6d4]/35 text-[#06b6d4]',
    label: 'LOW',
  },
  info: {
    bar: 'bg-[#3b82f6]',
    badgeBg: 'bg-[#3b82f6]/15 border-[#3b82f6]/35 text-[#3b82f6]',
    label: 'INFO',
  },
};

export default function AlertItem({ alert, onSelect }) {
  const sev = (alert.severity || 'low').toLowerCase();
  const config = SEVERITY_CONFIG[sev] || SEVERITY_CONFIG.low;
  const timeStr = timeAgo(alert.timestamp);
  const isRecent = timeStr === 'just now';

  const locationText =
    alert.location?.label || alert.cameraLabel || 'Sector Perimeter';

  return (
    <button
      type="button"
      onClick={() => onSelect?.(alert)}
      className="group relative flex w-full items-center gap-3 rounded-lg border border-white/[0.06] bg-[#0d1017] p-2.5 text-left transition-all duration-200 hover:border-white/[0.14] hover:bg-[#121620]"
    >
      {/* Left Rounded Accent Stripe */}
      <span
        className={`h-9 w-1 shrink-0 rounded-full ${config.bar}`}
        aria-hidden="true"
      />

      {/* Main Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        {/* Top Line: Event Title & Severity Badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[13px] font-semibold text-white">
            {alert.type}
          </span>
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider border ${config.badgeBg}`}
          >
            {config.label}
          </span>
        </div>

        {/* Bottom Line: Camera ID · Location and Time Ago */}
        <div className="mt-1 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-mono text-[#38bdf8] font-medium">
              {alert.cameraId}
            </span>
            <span className="text-slate-500 font-bold">·</span>
            <span className="truncate text-slate-400">
              {locationText}
            </span>
          </div>
          <span
            className={`shrink-0 font-mono text-[11px] ${
              isRecent ? 'text-[#ef4444] font-medium' : 'text-slate-400'
            }`}
          >
            {timeStr}
          </span>
        </div>
      </div>
    </button>
  );
}
