import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/*
 * National emblem mark. If you have the official artwork, drop it at
 * src/assets/emblem.png, import it, and swap the <EmblemMark /> below for
 * <img src={emblem} alt="" className="h-[46px] w-auto opacity-90" />.
 */ 
function EmblemMark() {
  return (
    <svg width="44" height="50" viewBox="0 0 44 50" fill="none" aria-hidden="true">
      <g stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {/* three lion heads on the abacus */}
        <path d="M14 15c0-3.3 1.8-5.6 4-5.6s4 2.3 4 5.6" />
        <path d="M22 15c0-3.3 1.8-5.6 4-5.6s4 2.3 4 5.6" />
        <path d="M18 12c0-3.6 1.8-6.1 4-6.1s4 2.5 4 6.1" />
        <path d="M16.5 9.5c-1.6-1.1-2.4-2.6-2.4-4.3M27.5 9.5c1.6-1.1 2.4-2.6 2.4-4.3" />
        {/* abacus band with wheel */}
        <path d="M11 15h22l-1.6 4.4H12.6L11 15Z" />
        <circle cx="22" cy="17.2" r="1.5" />
        {/* bell capital */}
        <path d="M14.4 19.4c0 3.3 2 5.4 2 7.6h11.2c0-2.2 2-4.3 2-7.6" />
        {/* base + motto band */}
        <path d="M15 27h14l-1 3.4H16L15 27Z" />
        <path d="M11.5 34h21" />
      </g>
      <text
        x="22"
        y="41.5"
        textAnchor="middle"
        fontSize="6.2"
        fill="#ffffff"
        fillOpacity="0.7"
        style={{ letterSpacing: '0.02em' }}
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}

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
    <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-white/[0.07] bg-gradient-to-r from-[#041426] to-[#06223b] px-6 text-white">
      {/* Ministry branding */}
      <div className="flex items-center gap-3">
        <img src="src/assets/logo.jpeg" alt="Ministry of Home Affairs" className="h-[46px] w-auto opacity-90" />
        <div className="leading-tight">
          <p className="text-[15px] font-semibold tracking-tight text-white" style={{ marginBottom: "0px" }}>
            Ministry of Home Affairs
          </p>
          <p className="mb-1 text-[12.5px] text-white/60">Government of India</p>
        </div>
      </div>

      {/* Date, system status, officer */}
      <div className="flex items-center gap-5">
        <p className="hidden text-[13.5px] text-white/75 sm:block">
          {dateLabel} <span className="mx-1.5 text-white/25">|</span> {timeLabel}
        </p>

        <div className="flex h-[38px] items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-500/[0.07] px-3.5 text-[13px] font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          System Operational
        </div>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#123b6b] text-[13px] font-semibold text-white/95 transition-colors hover:bg-[#16487f] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {initials}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[52px] w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0a2540] shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
            >
              <div className="border-b border-white/10 px-4 py-3 leading-tight">
                <p className="truncate text-[13px] font-medium text-white">{displayName}</p>
                <p className="mt-0.5 truncate text-[11.5px] text-white/50">
                  ID: {user?.badgeId || '—'}
                </p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[13px] text-white/80 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
