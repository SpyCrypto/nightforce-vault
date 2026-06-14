"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  TrendingUp,
  Shield,
  RefreshCw,
  Filter,
} from "lucide-react";
import { getSummaries, type ReportSummary, type RiskLevel } from "../services/midnight";
import { IntelCard } from "./IntelCard";
import { ConfidenceBadge } from "./ConfidenceBadge";

const RISK_OPTIONS: { value: RiskLevel | "all"; label: string }[] = [
  { value: "all",      label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high",     label: "High" },
  { value: "medium",   label: "Medium" },
  { value: "low",      label: "Low" },
];

interface ThreatFeedProps {
  onVerify?: (reportId: string) => void;
}

export function ThreatFeed({ onVerify }: ThreatFeedProps) {
  const [summaries, setSummaries] = useState<ReportSummary[]>([]);
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [sortBy, setSortBy] = useState<"confidence" | "recent">("confidence");
  const [refreshed, setRefreshed] = useState(false);

  const load = () => {
    setSummaries(getSummaries());
  };

  useEffect(() => {
    load();
  }, []);

  const refresh = () => {
    load();
    setRefreshed(true);
    setTimeout(() => setRefreshed(false), 1500);
  };

  const filtered = summaries
    .filter((s) => riskFilter === "all" || s.riskLevel === riskFilter)
    .sort((a, b) =>
      sortBy === "confidence"
        ? b.verificationCount - a.verificationCount
        : b.createdAt - a.createdAt
    );

  const totalVerifications = summaries.reduce((acc, s) => acc + s.verificationCount, 0);
  const topReport = summaries.reduce<ReportSummary | null>(
    (top, s) => (!top || s.verificationCount > top.verificationCount ? s : top),
    null
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-spy/20 to-spy/5 border border-spy/30 flex items-center justify-center">
              <Activity className="w-7 h-7 text-spy" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Threat Reputation Feed</h1>
              <p className="text-midnight-400 text-sm">
                Public confidence scores only — zero intel details exposed.
              </p>
            </div>
          </div>
          <button
            onClick={refresh}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${
              refreshed
                ? "border-spy/40 text-spy bg-spy/5"
                : "border-midnight-700/50 text-midnight-400 hover:border-spy/30 hover:text-spy"
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshed ? "animate-spin" : ""}`} />
            {refreshed ? "Updated" : "Refresh"}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total Reports" value={String(summaries.length)} icon={<Shield className="w-5 h-5" />} />
        <StatTile label="Total Verifications" value={String(totalVerifications)} icon={<TrendingUp className="w-5 h-5" />} />
        <StatTile
          label="Top Confidence"
          value={topReport ? String(topReport.verificationCount) : "—"}
          icon={<Activity className="w-5 h-5" />}
        />
        <StatTile
          label="Critical Reports"
          value={String(summaries.filter((s) => s.riskLevel === "critical").length)}
          icon={<Shield className="w-5 h-5" />}
          highlight
        />
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 border border-midnight-800/50">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-midnight-400" />
            <span className="text-sm text-midnight-300 font-medium">Risk:</span>
            <div className="flex gap-1.5">
              {RISK_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setRiskFilter(value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    riskFilter === value
                      ? "bg-spy/20 text-spy border border-spy/40"
                      : "bg-midnight-800/40 text-midnight-400 border border-midnight-700/40 hover:border-midnight-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-midnight-300 font-medium">Sort:</span>
            <div className="flex gap-1.5">
              {([["confidence", "Confidence"], ["recent", "Recent"]] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSortBy(val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    sortBy === val
                      ? "bg-spy/20 text-spy border border-spy/40"
                      : "bg-midnight-800/40 text-midnight-400 border border-midnight-700/40 hover:border-midnight-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report grid or empty state */}
      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center border border-midnight-800/50">
          <Shield className="w-16 h-16 text-midnight-700 mx-auto mb-4" />
          <p className="text-midnight-400 font-medium">No reports yet</p>
          <p className="text-midnight-500 text-sm mt-2">
            Submit the first intelligence report in the Intel Vault tab.
          </p>
        </div>
      ) : (
        <>
          {/* Top leaderboard strip */}
          {sortBy === "confidence" && filtered.length > 0 && (
            <div className="glass rounded-xl p-4 border border-midnight-800/50">
              <h3 className="text-xs font-semibold text-midnight-400 uppercase tracking-wider mb-3">
                Confidence Leaderboard
              </h3>
              <div className="flex flex-wrap gap-3">
                {filtered.slice(0, 5).map((s, i) => (
                  <div
                    key={s.reportId}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-midnight-800/40 border border-midnight-700/40"
                  >
                    <span className="text-midnight-500 text-xs font-mono">#{i + 1}</span>
                    <span className="text-midnight-300 text-xs font-mono truncate max-w-[100px]">
                      {s.reportId}
                    </span>
                    <ConfidenceBadge count={s.verificationCount} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((s) => (
              <IntelCard key={s.reportId} summary={s} onVerify={onVerify} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatTile({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`glass rounded-xl p-4 border ${
        highlight ? "border-red-500/30" : "border-midnight-800/50"
      }`}
    >
      <div className={`flex items-center gap-2 mb-2 ${highlight ? "text-red-400" : "text-midnight-400"}`}>
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className={`text-2xl font-bold font-mono ${highlight ? "text-red-400" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}
