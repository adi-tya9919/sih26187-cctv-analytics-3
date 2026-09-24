import React from 'react';

const TONE_CONFIG = {
  primary: {
    valueColor: 'text-[#f4f4f5]',
    iconBoxBg: 'bg-white/[0.08] border-white/10 text-[#f4f4f5]',
    barColor: 'bg-white/80',
    defaultProgress: 100,
  },
  success: {
    valueColor: 'text-[#2ed573]',
    iconBoxBg: 'bg-[rgba(46,213,115,0.12)] border-[rgba(46,213,115,0.25)] text-[#2ed573]',
    badgeBg: 'bg-[rgba(46,213,115,0.12)] border-[rgba(46,213,115,0.3)] text-[#2ed573]',
    barColor: 'bg-[#2ed573]',
    defaultProgress: 75,
  },
  warning: {
    valueColor: 'text-[#e4e4e7]',
    iconBoxBg: 'bg-white/[0.06] border-white/10 text-[#a1a1aa]',
    badgeBg: 'bg-[rgba(255,165,2,0.12)] border-[rgba(255,165,2,0.3)] text-[#ffa502]',
    barColor: 'bg-[#ffa502]',
    defaultProgress: 18,
  },
  muted: {
    valueColor: 'text-[#e4e4e7]',
    iconBoxBg: 'bg-white/[0.06] border-white/10 text-[#a1a1aa]',
    badgeBg: 'bg-[rgba(255,165,2,0.12)] border-[rgba(255,165,2,0.3)] text-[#ffa502]',
    barColor: 'bg-[#ffa502]',
    defaultProgress: 18,
  },
  danger: {
    valueColor: 'text-[#ff4757]',
    iconBoxBg: 'bg-[rgba(255,71,87,0.12)] border-[rgba(255,71,87,0.25)] text-[#ff4757]',
    badgeBg: 'bg-[rgba(255,71,87,0.12)] border-[rgba(255,71,87,0.3)] text-[#ff4757]',
    barColor: 'bg-[#ff4757]',
    defaultProgress: 85,
  },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  badge,
  tone = 'primary',
  progress,
}) {
  const config = TONE_CONFIG[tone] || TONE_CONFIG.primary;
  const progressPercent = typeof progress === 'number' ? progress : config.defaultProgress;

  const formattedValue =
    typeof value === 'number' || (!isNaN(value) && value !== '' && value !== null)
      ? String(value).padStart(2, '0')
      : value;

  return (
    <div
      className="group relative flex flex-col justify-between rounded-xl p-4 transition-all duration-300 hover:scale-[1.01] min-h-[112px]"
      style={{
        background: 'rgba(18, 19, 22, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#a1a1aa]">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {badge && (
            <span
              className={`rounded px-1.5 py-0.5 text-[10.5px] font-bold tracking-wide border ${
                config.badgeBg || 'bg-white/10 text-white'
              }`}
            >
              {badge}
            </span>
          )}
          {Icon && (
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg border ${config.iconBoxBg}`}
            >
              <Icon size={15} strokeWidth={1.8} />
            </div>
          )}
        </div>
      </div>

      {/* Middle Value + Subtext Row */}
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span
          className={`font-mono text-[32px] font-bold leading-none tracking-tight ${config.valueColor}`}
        >
          {formattedValue}
        </span>
        {subtext && (
          <span className="truncate text-right text-[12px] text-[#71717a]">
            {subtext}
          </span>
        )}
      </div>

      {/* Bottom Track & Colored Progress Bar */}
      <div className="mt-3.5 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
          style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
        />
      </div>
    </div>
  );
}
