"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Eye,
} from "lucide-react";
import { useWalletContext } from "./WalletProvider";
import {
  verifyReport,
  getSummaries,
  type ReportSummary,
} from "../services/midnight";
import { IntelCard } from "./IntelCard";

export function VerifyIntel() {
  const { isConnected } = useWalletContext();

  const [summaries, setSummaries] = useState<ReportSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [witnessTitle, setWitnessTitle]   = useState("");
  const [witnessDetails, setWitnessDetails] = useState("");
  const [witnessSalt, setWitnessSalt]   = useState("");
  const [verifying, setVerifying]       = useState(false);
  const [result, setResult]             = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    setSummaries(getSummaries());
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId || !witnessTitle.trim() || !witnessDetails.trim() || !witnessSalt.trim()) return;

    setVerifying(true);
    setResult(null);

    try {
      const res = await verifyReport(selectedId, witnessTitle, witnessDetails, witnessSalt);
      setResult(res);
      if (res.success) {
        setSummaries(getSummaries());
      }
    } catch {
      setResult({ success: false, message: "Unexpected error during verification." });
    } finally {
      setVerifying(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-12 text-center border border-midnight-800/50">
          <Lock className="w-16 h-16 text-midnight-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Verify Intel</h2>
          <p className="text-midnight-400">
            Connect your wallet to submit witness proofs.
          </p>
        </div>
      </div>
    );
  }

  const selectedSummary = summaries.find((s) => s.reportId === selectedId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-spy/20 to-spy/5 border border-spy/30 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-spy" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Witness Verification</h1>
            <p className="text-midnight-400 text-sm">
              Prove you know intelligence matching a report without revealing your
              wallet, domain, or any private details. A valid witness increments
              the public confidence score.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report selector */}
        <div className="glass rounded-2xl p-6 border border-midnight-800/50 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-spy" />
            Select Report to Verify
          </h2>

          {summaries.length === 0 ? (
            <div className="text-center py-8 text-midnight-500 text-sm">
              No public reports yet. Submit one in Intel Vault.
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {summaries.map((s) => (
                <button
                  key={s.reportId}
                  onClick={() => {
                    setSelectedId(s.reportId);
                    setResult(null);
                  }}
                  className={`w-full text-left transition-all rounded-xl border p-4 ${
                    selectedId === s.reportId
                      ? "border-spy/50 bg-spy/5"
                      : "border-midnight-700/50 bg-midnight-800/30 hover:border-midnight-600"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-spy">#{s.reportId}</p>
                      <p className="font-medium text-white text-sm mt-0.5 truncate">{s.title}</p>
                      <p className="text-xs text-midnight-500 mt-0.5">{s.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs text-midnight-400">Confidence</span>
                      <p className="text-lg font-bold text-spy font-mono">{s.verificationCount}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Witness form */}
        <div className="glass rounded-2xl p-6 border border-midnight-800/50 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-spy" />
            Submit Witness Proof
          </h2>

          {!selectedId ? (
            <div className="text-center py-8 text-midnight-500 text-sm">
              Select a report on the left to begin witness verification.
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              {selectedSummary && (
                <div className="rounded-xl bg-midnight-800/40 border border-midnight-700/50 p-4">
                  <p className="text-xs text-midnight-400 mb-1">Verifying report:</p>
                  <p className="font-semibold text-white text-sm">{selectedSummary.title}</p>
                  <p className="font-mono text-xs text-spy mt-1">#{selectedId}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-midnight-300 mb-2">
                  Matching Title
                </label>
                <input
                  type="text"
                  value={witnessTitle}
                  onChange={(e) => setWitnessTitle(e.target.value)}
                  placeholder="Must match the original report title exactly"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-midnight-800/50 border border-midnight-700/50 text-white placeholder-midnight-500 focus:outline-none focus:border-spy/50 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-midnight-300 mb-2">
                  Matching Intel Details
                </label>
                <textarea
                  value={witnessDetails}
                  onChange={(e) => setWitnessDetails(e.target.value)}
                  placeholder="Must match the original intel details exactly"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-midnight-800/50 border border-midnight-700/50 text-white placeholder-midnight-500 focus:outline-none focus:border-spy/50 transition-all resize-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-midnight-300 mb-2">
                  Witness Salt
                  <span className="ml-2 text-midnight-500 font-normal">
                    (provided by report creator)
                  </span>
                </label>
                <input
                  type="text"
                  value={witnessSalt}
                  onChange={(e) => setWitnessSalt(e.target.value)}
                  placeholder="Salt from the original report submission"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-midnight-800/50 border border-midnight-700/50 text-white placeholder-midnight-500 focus:outline-none focus:border-spy/50 transition-all font-mono text-xs"
                />
              </div>

              {result && (
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
                    result.success
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p>{result.message}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-midnight-500 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-spy" />
                  Your data is never revealed
                </p>
                <button
                  type="submit"
                  disabled={
                    verifying ||
                    !witnessTitle.trim() ||
                    !witnessDetails.trim() ||
                    !witnessSalt.trim()
                  }
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-spy text-midnight-950 font-semibold hover:bg-spy-dark spy-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  {verifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-midnight-950/40 border-t-midnight-950 rounded-full animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Submit Witness
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* How it works */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <h2 className="text-sm font-semibold text-midnight-300 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          How Witness Verification Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          {[
            {
              step: "1",
              title: "You Know the Intel",
              desc: "You independently discovered the same threat intelligence as the original report.",
            },
            {
              step: "2",
              title: "Commitment Check",
              desc: "The contract recomputes hash(title + details + salt) and checks it against the stored commitment.",
            },
            {
              step: "3",
              title: "Confidence +1",
              desc: "If the hash matches, the public confidence score increments. No details are ever disclosed.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-spy/10 border border-spy/30 text-spy text-xs font-bold flex items-center justify-center flex-shrink-0">
                {step}
              </div>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-midnight-400 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
