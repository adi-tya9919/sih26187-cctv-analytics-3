import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Video,
  Bell,
  History,
  BarChart3,
  Map,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/live-monitoring', label: 'Live Monitoring', icon: Video },
  { to: '/alerts', label: 'Alerts', icon: Bell, badgeKey: 'alerts' },
  { to: '/history', label: 'Event History', icon: History },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/map', label: 'Map View', icon: Map },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ badgeCounts = { alerts: 0 }, collapsed = false, onToggle }) {
  return (
    <aside className={`sidebar-ai ${collapsed ? 'sidebar-ai--collapsed' : ''}`}>
      {/* Background gradient layer */}
      <div className="sidebar-ai__bg" />

      {/* Content */}
      <div className="sidebar-ai__content">
        {/* Navigation */}
        <nav className="sidebar-ai__nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon, badgeKey }) => {
            const badgeCount = badgeKey ? badgeCounts[badgeKey] : 0;

            return (
              <NavLink
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  `sidebar-ai__link ${isActive ? 'sidebar-ai__link--active' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="sidebar-ai__link-icon">
                      <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
                    </span>
                    {!collapsed && (
                      <span className={`sidebar-ai__link-label ${isActive ? 'font-semibold' : ''}`}>
                        {label}
                      </span>
                    )}
                    {!collapsed && badgeCount > 0 && (
                      <span className="sidebar-ai__badge">{badgeCount}</span>
                    )}
                    {isActive && <span className="sidebar-ai__active-glow" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom: Collapse toggle */}
        <div className="sidebar-ai__footer">
          <button
            className="sidebar-ai__toggle"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span className="sidebar-ai__toggle-text">Collapse</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
