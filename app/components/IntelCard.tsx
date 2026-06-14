"use client";

import { Clock, Hash, Lock } from "lucide-react";
import type { ReportSummary } from "../services/midnight";
import { ConfidenceBadge } from "./ConfidenceBadge";

const RISK_STYLES: Record<string, string> = {
  low:      "text-green-400 bg-green-500/10 border-green-500/30",
  medium:   "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  high:     "text-orange-400 bg-orange-500/10 border-orange-500/30",
  critical: "text-red-400 bg-red-500/10 border-red-500/30",
};

interface IntelCardProps {
  summary: ReportSummary;
  onVerify?: (reportId: string) => void;
  compact?: boolean;
}

export function IntelCard({ summary, onVerify, compact = false }: IntelCardProps) {
  const date = new Date(summary.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="glass rounded-xl border border-midnight-800/50 hover:border-spy/20 transition-all p-5 space-y-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-3.5 h-3.5 text-spy flex-shrink-0" />
            <span className="text-xs font-mono text-spy truncate">
              Report #{summary.reportId}
            </span>
          </div>
          <h3 className="font-semibold text-white truncate">{summary.title}</h3>
        </div>
        <span
          className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${
            RISK_STYLES[summary.riskLevel]
          }`}
        >
          {summary.riskLevel}
        </span>
      </div>

      {/* Category */}
      <div className="flex items-center gap-2 text-xs text-midnight-400">
        <Hash className="w-3 h-3" />
        <span>{summary.category}</span>
      </div>

      {/* Commitment snippet */}
      {!compact && (
        <div className="rounded-lg bg-midnight-950/60 border border-midnight-800 px-3 py-2">
          <p className="text-xs font-mono text-midnight-500 leading-relaxed break-all">
            <span className="text-midnight-400">commitment: </span>
            {summary.commitment.slice(0, 24)}…
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5 text-xs text-midnight-500">
          <Clock className="w-3 h-3" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-3">
          <ConfidenceBadge count={summary.verificationCount} size="sm" />
          {onVerify && (
            <button
              onClick={() => onVerify(summary.reportId)}
              className="text-xs px-3 py-1.5 rounded-lg bg-spy/10 text-spy border border-spy/30 hover:bg-spy/20 transition-all font-medium"
            >
              Verify
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
