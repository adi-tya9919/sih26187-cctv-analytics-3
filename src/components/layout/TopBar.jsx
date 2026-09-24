import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Activity } from 'lucide-react';
import ministryLogo from '../../assets/logo.jpeg';
import { useAuth } from '../../context/AuthContext';
import './Topbar.css';

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [now, setNow] = useState(() => new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const dateLabel = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timeLabel = now
    .toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })
    .toLowerCase();

  const displayName = user?.name || 'Inspector';
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await logout?.();
    navigate('/login', { replace: true });
  };

  return (
    <header className="topbar-ai">
      {/* Left: Ministry Branding across whole page top */}
      <div className="topbar-ai__left">
        <div className="topbar-ai__brand">
          <img
            src={ministryLogo}
            alt="Ministry of Home Affairs"
            className="topbar-ai__emblem"
          />
          <div className="topbar-ai__brand-text">
            <span className="topbar-ai__ministry">Ministry of Home Affairs</span>
            <span className="topbar-ai__gov">Government of India</span>
          </div>
        </div>

        <div className="topbar-ai__divider" />

        <div className="topbar-ai__ai-indicator">
          <Activity size={14} className="topbar-ai__ai-pulse" />
          <span>AI Active</span>
        </div>
      </div>

      {/* Right: Date, status, user */}
      <div className="topbar-ai__right">
        <span className="topbar-ai__datetime">
          {dateLabel} <span className="topbar-ai__sep">•</span> {timeLabel}
        </span>

        <div className="topbar-ai__status">
          <span className="topbar-ai__status-dot" />
          System Operational
        </div>

        <div className="topbar-ai__user" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="topbar-ai__avatar"
          >
            {initials}
          </button>

          {menuOpen && (
            <div role="menu" className="topbar-ai__menu">
              <div className="topbar-ai__menu-header">
                <p className="topbar-ai__menu-name">{displayName}</p>
                <p className="topbar-ai__menu-id">
                  ID: {user?.badgeId || '—'}
                </p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="topbar-ai__menu-item"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient border */}
      <div className="topbar-ai__border" />
    </header>
  );
}
