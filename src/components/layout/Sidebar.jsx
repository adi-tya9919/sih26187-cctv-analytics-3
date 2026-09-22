import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Video,
  Bell,
  History,
  BarChart3,
  Map,
  Settings,
  PanelBottom,
} from 'lucide-react';
import loginBackground from '../../assets/login-background.png';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/live-monitoring', label: 'Live Monitoring', icon: Video },
  { to: '/alerts', label: 'Alerts', icon: Bell, badgeKey: 'alerts' },
  { to: '/history', label: 'Event History', icon: History },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/map', label: 'Map View', icon: Map },
  { to: '/settings', label: 'Settings', icon: Settings },
];

/* Filled shield mark — replaces the old outlined icon-in-a-box lockup. */
function ShieldMark() {
  return (
    <svg width="34" height="38" viewBox="0 0 34 38" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="be-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b9dff" />
          <stop offset="100%" stopColor="#1257c4" />
        </linearGradient>
      </defs>
      <path
        d="M17 1.5 32 6.4v12.2c0 8.1-5.7 15.3-15 18.9C7.7 33.9 2 26.7 2 18.6V6.4L17 1.5Z"
        fill="url(#be-shield)"
        stroke="#7cc2ff"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      <path
        d="M10.8 19.2l4.3 4.3 8.1-8.4"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Sidebar({ badgeCounts = { alerts: 0 } }) {
  return (
    <aside className="relative flex h-screen w-[272px] shrink-0 flex-col overflow-hidden bg-[#041426] text-white">
      {/* Brand — aligned to the height of the ministry bar on the right */}
      <div className="relative z-20 flex h-[76px] shrink-0 items-center gap-3 px-6">
        <ShieldMark />
        <div>
          <p className="text-[22px] box font-semibold tracking-[-0.01em] text-white" style={{ marginBottom: "0px" }}>BorderEye</p>
          <p className="text-[10px] tracking-[1px] text-white/50">SECURE BORDERS • SAFER INDIA</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 shrink-0 px-4 pb-4 pt-2">
        <div className="space-y-1.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, badgeKey }) => {
            const badgeCount = badgeKey ? badgeCounts[badgeKey] : 0;

            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex h-[50px] items-center justify-between rounded-[10px] px-4 text-[15px] transition-colors ${
                    isActive
                      ? 'bg-[#1668e3] text-white shadow-[0_4px_18px_rgba(22,104,227,0.35)]'
                      : 'text-white/75 hover:bg-white/[0.06] hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex min-w-0 items-center gap-3.5">
                      <Icon size={21} strokeWidth={isActive ? 2.2 : 1.8} className="shrink-0" />
                      <span className={isActive ? 'font-semibold' : 'font-normal'}>{label}</span>
                    </span>

                    {badgeCount > 0 && (
                      <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#ef4444] px-1.5 text-[11px] font-semibold text-white">
                        {badgeCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Watchtower artwork fills the lower rail with a dark top-to-bottom blend */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="absolute inset-0 scale-110 h-[260px] bg-cover bg-[position:60%_60%]"
          style={{ backgroundImage: `url(${loginBackground})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#041426] via-[#041426]/40 to-[#020b14]/95"
          aria-hidden="true"
        />

       
      </div>
    </aside>
  );
}
