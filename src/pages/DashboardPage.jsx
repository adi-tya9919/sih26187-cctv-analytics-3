import { useEffect, useRef, useState } from 'react';
import bgImage from '../assets/bg.jpeg';
import { Video, VideoOff, AlertTriangle, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import StatCard from '../components/ui/StatCard';
import CameraGrid from '../components/CameraGrid';
import AlertFeed from '../components/AlertFeed';
import AlertDetailPanel from '../components/AlertDetailPanel';
import ConnectionStatus from '../components/ConnectionStatus';
import ToastStack from '../components/ToastStack';
import { CameraGridSkeleton, ListSkeleton } from '../components/Skeletons';
import { useAlertStream } from '../hooks/useAlertStream';
import { MOCK_CAMERAS, MOCK_ALERTS } from '../data/mockData';

export default function DashboardPage() {
  const { alerts, connectionStatus, updateAlertStatus } = useAlertStream({
    initialAlerts: MOCK_ALERTS,
    intervalMs: 15000,
  });
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const knownAlertIds = useRef(new Set(MOCK_ALERTS.map((a) => a.id)));

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fresh = alerts.filter((a) => !knownAlertIds.current.has(a.id));
    if (fresh.length === 0) return;
    fresh.forEach((a) => knownAlertIds.current.add(a.id));
    setToasts((prev) => [...fresh, ...prev].slice(0, 4));
  }, [alerts]);

  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const totalCameras = MOCK_CAMERAS.length;
  const onlineCount = MOCK_CAMERAS.filter((c) => c.status === 'online').length;
  const offlineCount = MOCK_CAMERAS.filter((c) => c.status === 'offline').length;
  const activeAlertCount = alerts.filter((a) => a.status === 'new').length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const onlinePercent = Math.round((onlineCount / (totalCameras || 1)) * 100);
  const offlinePercent = Math.max(18, Math.round((offlineCount / (totalCameras || 1)) * 100));
  const offlineCamera = MOCK_CAMERAS.find((c) => c.status === 'offline');
  const offlineSubtext = offlineCamera ? `${offlineCamera.id} unlinked` : 'CAM-08 unlinked';
  const selectedAlert = alerts.find((a) => a.id === selectedAlertId) || null;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#09090b] font-sans">
      {/* Whole Page Top Header */}
      <TopBar alertCount={activeAlertCount} />

      {/* Main Container below Header */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="h-full shrink-0 z-30"
          style={{
            width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-expanded)',
            transition: 'width var(--sidebar-transition)',
          }}
        >
          <Sidebar
            badgeCounts={{ alerts: activeAlertCount }}
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
          />
        </div>

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-[#0e0f12]">
          {/* Hero */}
          <section
            className="relative h-[100px] overflow-hidden"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/95 via-[#09090b]/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-center px-8">
              <h1 className="m-0 text-[26px] font-semibold leading-tight tracking-[-0.02em] text-white">
                {greeting}, Inspector
              </h1>
              <p className="mt-1 text-[14px] text-white/60">
                Real-time intelligence for a safer tomorrow.
              </p>
            </div>
          </section>

          <div className="p-5">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={Video}
                label="Total Cameras"
                value={totalCameras}
                subtext="Across all border zones"
                tone="primary"
                progress={100}
              />
              <StatCard
                icon={Radio}
                label="Online"
                value={onlineCount}
                subtext="Cameras currently live"
                badge={`▲ ${onlinePercent}%`}
                tone="success"
                progress={onlinePercent}
              />
              <StatCard
                icon={VideoOff}
                label="Offline"
                value={offlineCount}
                subtext={offlineSubtext}
                badge={`${offlineCount} UNIT`}
                tone="warning"
                progress={offlinePercent}
              />
              <StatCard
                icon={AlertTriangle}
                label="Active Alerts"
                value={activeAlertCount}
                subtext="Requiring attention"
                badge={criticalCount > 0 ? `▲ +${criticalCount} CRIT` : undefined}
                tone="danger"
                progress={85}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
              <div className="min-w-0">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-[17px] font-semibold text-white">Live Camera Feeds</h2>
                  <div className="flex items-center gap-4">
                    <ConnectionStatus status={connectionStatus} />
                    <Link
                      to="/live-monitoring"
                      className="text-[13px] font-medium text-[#00d4ff] hover:text-[#00b8dd]"
                    >
                      View All →
                    </Link>
                  </div>
                </div>
                {initialLoading ? <CameraGridSkeleton /> : <CameraGrid cameras={MOCK_CAMERAS} />}
              </div>

              <div className="min-h-[320px]">
                {initialLoading ? (
                  <div className="rounded-xl border border-white/[0.08] bg-[#07080c] p-3.5">
                    <ListSkeleton />
                  </div>
                ) : (
                  <AlertFeed alerts={alerts} onSelectAlert={(a) => setSelectedAlertId(a.id)} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {selectedAlert && (
        <AlertDetailPanel
          alert={selectedAlert}
          onClose={() => setSelectedAlertId(null)}
          onUpdateStatus={updateAlertStatus}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
