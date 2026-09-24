import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";

export default function ConsoleLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#09090b]">
      {/* Whole Page Top Header */}
      <TopBar />

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
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
          />
        </div>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0e0f12]" style={{ paddingLeft: '20px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}