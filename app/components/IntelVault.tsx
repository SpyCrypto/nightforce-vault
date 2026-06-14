"use client";

import { useState } from "react";
import {
  Shield,
  Lock,
  Send,
  Copy,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { useWalletContext } from "./WalletProvider";
import {
  createReport,
  type IntelCategory,
  type RiskLevel,
} from "../services/midnight";

const CATEGORIES: IntelCategory[] = [
  "Suspicious Wallet",
  "Phishing Domain",
  "Fake Airdrop",
  "Malicious Smart Contract",
  "Social Engineering Campaign",
  "Rug Pull",
  "Other",
];

const RISK_LEVELS: { value: RiskLevel; label: string; color: string }[] = [
  { value: "low",      label: "Low",      color: "text-green-400" },
  { value: "medium",   label: "Medium",   color: "text-yellow-400" },
  { value: "high",     label: "High",     color: "text-orange-400" },
  { value: "critical", label: "Critical", color: "text-red-400" },
];

interface SubmitResult {
  reportId: string;
  commitment: string;
  salt: string;
}

export function IntelVault() {
  const { isConnected } = useWalletContext();

  const [title, setTitle]       = useState("");
  const [category, setCategory] = useState<IntelCategory>("Suspicious Wallet");
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("medium");
  const [details, setDetails]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult]     = useState<SubmitResult | null>(null);
  const [copied, setCopied]     = useState<string | null>(null);
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !details.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await createReport({ title, category, details, riskLevel });
      setResult(res);
      setTitle("");
      setDetails("");
    } catch {
      setError("Failed to generate commitment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-12 text-center border border-midnight-800/50">
          <Lock className="w-16 h-16 text-midnight-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Intel Vault</h2>
          <p className="text-midnight-400">
            Connect your wallet to submit private intelligence reports.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-spy/20 to-spy/5 border border-spy/30 flex items-center justify-center">
            <Shield className="w-7 h-7 text-spy" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Intel Vault</h1>
            <p className="text-midnight-400 text-sm">
              Submit private threat intelligence. Your report details are never
              stored on the public chain — only a cryptographic commitment is
              anchored publicly.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy explainer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "🔒", label: "Private Storage",   desc: "Details stored only in your private state" },
          { icon: "⛓️", label: "Public Commitment", desc: "Only a hash is visible on-chain" },
          { icon: "🔬", label: "Witness Proof",     desc: "Others verify knowledge without seeing data" },
        ].map((item) => (
          <div key={item.label} className="glass rounded-xl p-4 border border-midnight-800/50 text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-sm font-semibold text-white">{item.label}</p>
            <p className="text-xs text-midnight-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      {!result ? (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-midnight-800/50 space-y-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-spy" />
            Submit Intelligence Report
          </h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-midnight-300 mb-2">
              Report Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fake Midnight giveaway campaign"
              required
              className="w-full px-4 py-3 rounded-xl bg-midnight-800/50 border border-midnight-700/50 text-white placeholder-midnight-500 focus:outline-none focus:border-spy/50 focus:bg-midnight-800/80 transition-all"
            />
          </div>

          {/* Category + Risk Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-midnight-300 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as IntelCategory)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-midnight-800/50 border border-midnight-700/50 text-white focus:outline-none focus:border-spy/50 transition-all pr-10"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-midnight-900">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-midnight-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-midnight-300 mb-2">
                Risk Level
              </label>
              <div className="flex gap-2">
                {RISK_LEVELS.map(({ value, label, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRiskLevel(value)}
                    className={`flex-1 py-3 rounded-xl text-xs font-semibold border transition-all ${
                      riskLevel === value
                        ? `bg-midnight-800 border-spy/40 ${color}`
                        : "bg-midnight-800/30 border-midnight-700/40 text-midnight-500 hover:border-midnight-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-midnight-300 mb-2">
              Intel Details
              <span className="ml-2 text-midnight-500 font-normal">
                (private — never stored on-chain)
              </span>
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the threat in detail. Include wallet addresses, domains, contract addresses, or any other intelligence..."
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-midnight-800/50 border border-midnight-700/50 text-white placeholder-midnight-500 focus:outline-none focus:border-spy/50 focus:bg-midnight-800/80 transition-all resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-midnight-500 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-spy" />
              Details stored in private state only
            </p>
            <button
              type="submit"
              disabled={submitting || !title.trim() || !details.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-spy text-midnight-950 font-semibold hover:bg-spy-dark spy-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-midnight-950/40 border-t-midnight-950 rounded-full animate-spin" />
                  Generating Commitment…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Intel
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Success — show report ID, commitment, salt */
        <div className="glass rounded-2xl p-6 border border-spy/30 spy-glow space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-spy" />
            <div>
              <h2 className="text-xl font-bold text-white">Report Submitted</h2>
              <p className="text-sm text-midnight-400">
                Intelligence stored privately. Commitment anchored publicly.
              </p>
            </div>
          </div>

          {[
            { key: "reportId",   label: "Report ID",   value: result.reportId,   hint: "Share this publicly to reference your report" },
            { key: "commitment", label: "Commitment",   value: result.commitment, hint: "Public hash — no details are exposed" },
            { key: "salt",       label: "Witness Salt", value: result.salt,       hint: "Keep private — needed to verify your own witness" },
          ].map(({ key, label, value, hint }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-midnight-300">{label}</label>
                <span className="text-xs text-midnight-500">{hint}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 rounded-xl bg-midnight-950/80 border border-midnight-800 font-mono text-xs text-midnight-300 break-all">
                  {value}
                </div>
                <button
                  onClick={() => copyToClipboard(value, key)}
                  className="flex-shrink-0 p-3 rounded-xl bg-midnight-800/60 border border-midnight-700/50 hover:border-spy/30 text-midnight-400 hover:text-spy transition-all"
                >
                  {copied === key ? (
                    <CheckCircle className="w-4 h-4 text-spy" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-midnight-800/40 border border-midnight-700/50">
            <p className="text-xs text-midnight-400 leading-relaxed">
              ⚠️ <strong className="text-midnight-200">Save your Witness Salt.</strong> You need it to
              submit a witness proof later. Your intel details are stored only in your private
              state and never shared publicly.
            </p>
          </div>

          <button
            onClick={() => setResult(null)}
            className="w-full py-3 rounded-xl border border-midnight-700/50 text-midnight-300 hover:text-spy hover:border-spy/30 transition-all text-sm font-medium"
          >
            Submit Another Report
          </button>
        </div>
      )}
    </div>
  );
}
