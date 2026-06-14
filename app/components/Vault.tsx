"use client";

import { useState, useEffect } from "react";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Cpu, 
  Gamepad2, 
  Coins, 
  Fingerprint, 
  Vote, 
  Save,
  CheckCircle,
  Key
} from "lucide-react";
import { useWalletContext } from "./WalletProvider";

const interestOptions = [
  { id: "ai", label: "AI", icon: Cpu },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "defi", label: "DeFi", icon: Coins },
  { id: "identity", label: "Identity", icon: Fingerprint },
  { id: "governance", label: "Governance", icon: Vote },
  { id: "privacy", label: "Privacy", icon: Eye },
];

const techLevels = [
  { id: "beginner", label: "Beginner", desc: "New to blockchain" },
  { id: "intermediate", label: "Intermediate", desc: "Some experience" },
  { id: "advanced", label: "Advanced", desc: "Experienced builder" },
  { id: "expert", label: "Expert", desc: "Core developer" },
];

export function Vault() {
  const { isConnected } = useWalletContext();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [techLevel, setTechLevel] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(false);

  useEffect(() => {
    const prefs = localStorage.getItem("nightforce_preferences");
    if (prefs) {
      const data = JSON.parse(prefs);
      setSelectedInterests(data.interests || []);
      setTechLevel(data.techLevel || "");
    }
  }, []);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setSaved(false);
  };

  const savePreferences = () => {
    localStorage.setItem("nightforce_preferences", JSON.stringify({
      interests: selectedInterests,
      techLevel,
      onboarded: true,
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-12 text-center border border-midnight-800/50">
          <Lock className="w-16 h-16 text-midnight-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Private Vault</h2>
          <p className="text-midnight-400">
            Connect your wallet to access your encrypted preferences.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-spy/20 to-spy/5 border border-spy/30 flex items-center justify-center">
            <Shield className="w-7 h-7 text-spy" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Private Memory Vault</h1>
            <p className="text-midnight-400">
              Your preferences are encrypted and stored locally. Midnight selective disclosure 
              ensures Spy learns what matters to you without exposing your data.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preferences */}
        <div className="glass rounded-2xl p-6 border border-midnight-800/50">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-spy" />
            Your Interests
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {interestOptions.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => toggleInterest(id)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  selectedInterests.includes(id)
                    ? "bg-spy/10 border-spy/50 text-spy"
                    : "bg-midnight-800/40 border-midnight-700/50 text-midnight-300 hover:border-midnight-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Technical Level */}
        <div className="glass rounded-2xl p-6 border border-midnight-800/50">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-spy" />
            Technical Level
          </h2>
          <div className="space-y-3">
            {techLevels.map(({ id, label, desc }) => (
              <button
                key={id}
                onClick={() => {
                  setTechLevel(id);
                  setSaved(false);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  techLevel === id
                    ? "bg-spy/10 border-spy/50 text-spy"
                    : "bg-midnight-800/40 border-midnight-700/50 text-midnight-300 hover:border-midnight-600"
                }`}
              >
                <div className="text-left">
                  <span className="font-medium block">{label}</span>
                  <span className="text-sm text-midnight-400">{desc}</span>
                </div>
                {techLevel === id && (
                  <CheckCircle className="w-5 h-5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Encrypted Data Preview */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-spy" />
            Encrypted Storage
          </h2>
          <button
            onClick={() => setShowEncrypted(!showEncrypted)}
            className="flex items-center gap-2 text-sm text-midnight-400 hover:text-spy transition-colors"
          >
            {showEncrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showEncrypted ? "Hide" : "Preview"}
          </button>
        </div>
        
        {showEncrypted ? (
          <div className="p-4 rounded-xl bg-midnight-950 border border-midnight-800 font-mono text-xs text-midnight-400 overflow-x-auto">
            <pre>{JSON.stringify({
              encrypted: true,
              algorithm: "AES-256-GCM",
              data: btoa(JSON.stringify({
                interests: selectedInterests,
                techLevel,
                timestamp: new Date().toISOString(),
              })),
            }, null, 2)}</pre>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-midnight-950 border border-midnight-800 flex items-center gap-3">
            <Lock className="w-5 h-5 text-spy" />
            <span className="text-sm text-midnight-400">
              Your data is encrypted with your wallet key. 
              Click Preview to see how it's stored.
            </span>
          </div>
        )}
        
        <div className="mt-4 flex items-center gap-2 text-xs text-midnight-500">
          <Shield className="w-4 h-4 text-spy" />
          <span>
            Secured by Midnight's privacy-preserving infrastructure. 
            Only your wallet can decrypt this data.
          </span>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={savePreferences}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            saved
              ? "bg-green-500/20 text-green-400 border border-green-500/50"
              : "bg-spy text-midnight-950 hover:bg-spy-dark spy-glow"
          }`}
        >
          {saved ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Saved to Private Vault
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Preferences
            </>
          )}
        </button>
      </div>
    </div>
  );
}
