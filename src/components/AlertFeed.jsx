import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import AlertItem from './AlertItem';
import EmptyState from './EmptyState';

export default function AlertFeed({ alerts = [], onSelectAlert }) {
  const sortedAlerts = alerts
    .slice()
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#07080c] p-3.5 shadow-lg backdrop-blur-md">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-[#ef4444] fill-[#ef4444]/20" />
          <h2 className="text-[13px] font-bold tracking-wider text-white uppercase">
            RECENT ALERTS
          </h2>
        </div>
        <Link
          to="/alerts"
          className="flex items-center gap-1 text-[12px] font-medium text-[#38bdf8] transition-colors hover:text-[#7dd3fc]"
        >
          View All →
        </Link>
      </div>

      {/* Alert List */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-0.5 max-h-[420px]">
        {sortedAlerts.length === 0 ? (
          <EmptyState title="No alerts in the current window" />
        ) : (
          sortedAlerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} onSelect={onSelectAlert} />
          ))
        )}
      </div>
    </div>
  );
}
