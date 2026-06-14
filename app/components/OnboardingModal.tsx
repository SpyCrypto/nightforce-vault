"use client";

import { useState } from "react";
import { X, Cpu, Gamepad2, Coins, Fingerprint, Vote, Eye, Code } from "lucide-react";
import { useWalletContext } from "./WalletProvider";

interface OnboardingModalProps {
  onClose: () => void;
}

const interests = [
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

export function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [techLevel, setTechLevel] = useState<string>("");
  const { address } = useWalletContext();

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    // Save preferences to localStorage
    localStorage.setItem("nightforce_preferences", JSON.stringify({
      interests: selectedInterests,
      techLevel,
      onboarded: true,
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass rounded-2xl border border-spy/30 spy-glow p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Welcome to Nightforce</h2>
            <p className="text-sm text-midnight-400 mt-1">
              Step {step} of 2
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-midnight-800/60 text-midnight-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Interests */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-midnight-300">
              What are you interested in? Spy will personalize your intelligence feed.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {interests.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => toggleInterest(id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
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
            <button
              onClick={() => setStep(2)}
              disabled={selectedInterests.length === 0}
              className="w-full mt-4 py-3 rounded-xl bg-spy text-midnight-950 font-medium hover:bg-spy-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Technical Level */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-midnight-300">
              What is your technical level? This helps Spy tailor explanations.
            </p>
            <div className="space-y-3">
              {techLevels.map(({ id, label, desc }) => (
                <button
                  key={id}
                  onClick={() => setTechLevel(id)}
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
                    <div className="w-2 h-2 rounded-full bg-spy" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-midnight-700 text-midnight-300 hover:border-midnight-600 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={!techLevel}
                className="flex-1 py-3 rounded-xl bg-spy text-midnight-950 font-medium hover:bg-spy-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mt-6 pt-4 border-t border-midnight-800/50">
          <div className="flex items-center gap-2 text-xs text-midnight-400">
            <Eye className="w-4 h-4 text-spy" />
            <span>
              Your preferences are stored locally and encrypted. 
              Midnight selective disclosure ensures your privacy.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
