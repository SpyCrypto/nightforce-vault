"use client";

import { useState } from "react";
import { SpyChat } from "./components/SpyChat";
import { Dashboard } from "./components/Dashboard";
import { Vault } from "./components/Vault";
import { Missions } from "./components/Missions";
import { Reputation } from "./components/Reputation";
import { OnboardingModal } from "./components/OnboardingModal";
import { IntelVault } from "./components/IntelVault";
import { VerifyIntel } from "./components/VerifyIntel";
import { ThreatFeed } from "./components/ThreatFeed";
import { useWallet } from "./hooks/useWallet";

type Tab = "dashboard" | "spy" | "vault" | "missions" | "reputation" | "intel" | "verify" | "feed";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const { isConnected, showOnboarding, setShowOnboarding } = useWallet();

  const renderContent = () => {
    switch (activeTab) {
      case "spy":
        return <SpyChat />;
      case "vault":
        return <Vault />;
      case "missions":
        return <Missions />;
      case "reputation":
        return <Reputation />;
      case "intel":
        return <IntelVault />;
      case "verify":
        return <VerifyIntel />;
      case "feed":
        return <ThreatFeed onVerify={(id) => { setActiveTab("verify"); }} />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Tab Navigation */}
      <div className="fixed left-0 top-16 bottom-0 w-64 glass border-r border-midnight-800/50 p-4 hidden lg:block">
        <div className="space-y-2">
          <TabButton
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            label="Dashboard"
            icon="📊"
          />
          <TabButton
            active={activeTab === "spy"}
            onClick={() => setActiveTab("spy")}
            label="Spy Chat"
            icon="🕶️"
          />
          <TabButton
            active={activeTab === "vault"}
            onClick={() => setActiveTab("vault")}
            label="Private Vault"
            icon="🔐"
          />
          <TabButton
            active={activeTab === "missions"}
            onClick={() => setActiveTab("missions")}
            label="Missions"
            icon="🎯"
          />
          <TabButton
            active={activeTab === "reputation"}
            onClick={() => setActiveTab("reputation")}
            label="Reputation"
            icon="🏆"
          />

          <div className="my-3 border-t border-midnight-800/50" />
          <p className="px-4 text-[10px] font-semibold text-midnight-500 uppercase tracking-widest mb-1">
            Intel Vault
          </p>

          <TabButton
            active={activeTab === "intel"}
            onClick={() => setActiveTab("intel")}
            label="Submit Intel"
            icon="🛡️"
          />
          <TabButton
            active={activeTab === "verify"}
            onClick={() => setActiveTab("verify")}
            label="Verify Intel"
            icon="🔬"
          />
          <TabButton
            active={activeTab === "feed"}
            onClick={() => setActiveTab("feed")}
            label="Threat Feed"
            icon="📡"
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass rounded-lg p-4 text-xs text-midnight-300">
            <p className="font-semibold text-spy mb-2">Nightforce Intelligence</p>
            <p>Powered by Midnight + Edda Labs</p>
            <p className="mt-2 text-midnight-400">Privacy-Preserving AI</p>
          </div>
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-midnight-800/50 p-2 z-50">
        <div className="flex justify-around">
          <MobileTabButton
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            icon="📊"
            label="Home"
          />
          <MobileTabButton
            active={activeTab === "spy"}
            onClick={() => setActiveTab("spy")}
            icon="🕶️"
            label="Spy"
          />
          <MobileTabButton
            active={activeTab === "vault"}
            onClick={() => setActiveTab("vault")}
            icon="🔐"
            label="Vault"
          />
          <MobileTabButton
            active={activeTab === "missions"}
            onClick={() => setActiveTab("missions")}
            icon="🎯"
            label="Missions"
          />
          <MobileTabButton
            active={activeTab === "reputation"}
            onClick={() => setActiveTab("reputation")}
            icon="🏆"
            label="Rep"
          />
          <MobileTabButton
            active={activeTab === "intel"}
            onClick={() => setActiveTab("intel")}
            icon="🛡️"
            label="Intel"
          />
          <MobileTabButton
            active={activeTab === "verify"}
            onClick={() => setActiveTab("verify")}
            icon="🔬"
            label="Verify"
          />
          <MobileTabButton
            active={activeTab === "feed"}
            onClick={() => setActiveTab("feed")}
            icon="📡"
            label="Feed"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8 pb-24 lg:pb-8">
        {renderContent()}
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
        active
          ? "bg-midnight-800/60 text-spy border border-spy/30"
          : "text-midnight-300 hover:bg-midnight-800/40 hover:text-midnight-100"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-spy animate-pulse" />}
    </button>
  );
}

function MobileTabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
        active ? "text-spy" : "text-midnight-400"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
}
