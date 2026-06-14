"use client";

import { useEffect, useState } from "react";
import { 
  Zap, 
  Shield, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Award,
  FileText,
  Users,
  ArrowRight,
  Radio,
  ShieldCheck,
  Activity
} from "lucide-react";
import { useWalletContext } from "./WalletProvider";

type Tab = "dashboard" | "spy" | "vault" | "missions" | "reputation" | "intel" | "verify" | "feed";

interface DashboardProps {
  onNavigate: (tab: Tab) => void;
}

const newsItems = [
  {
    id: 1,
    title: "New Compact Contract Tutorial Released",
    source: "Edda Labs",
    time: "2 hours ago",
    type: "education",
  },
  {
    id: 2,
    title: "Midnight Testnet Upgrade Announced",
    source: "Official",
    time: "5 hours ago",
    type: "update",
  },
  {
    id: 3,
    title: "Community Grant Program Opens",
    source: "Governance",
    time: "1 day ago",
    type: "opportunity",
  },
];

const opportunities = [
  {
    id: 1,
    title: "DeFi Protocol needs auditors",
    reward: "500 NIGHT",
    type: "technical",
  },
  {
    id: 2,
    title: "Create educational content",
    reward: "250 NIGHT",
    type: "content",
  },
  {
    id: 3,
    title: "Test new dApp features",
    reward: "100 NIGHT",
    type: "testing",
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const { isConnected } = useWalletContext();
  const [preferences, setPreferences] = useState<any>(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const prefs = localStorage.getItem("nightforce_preferences");
    if (prefs) {
      setPreferences(JSON.parse(prefs));
    }
  }, []);

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-12 text-center border border-spy/30 spy-glow">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-midnight-800 to-midnight-950 border border-spy/30 flex items-center justify-center">
            <Shield className="w-10 h-10 text-spy" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to Nightforce Intelligence
          </h2>
          <p className="text-midnight-300 text-lg mb-8 max-w-xl mx-auto">
            The Private AI Operations Center for Midnight Builders. 
            Connect your wallet to access personalized intelligence, 
            private memory vault, and community missions.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-8 py-4 rounded-xl bg-spy text-midnight-950 font-semibold text-lg hover:bg-spy-dark transition-all spy-glow"
          >
            Connect Wallet to Begin
          </button>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Spy AI Assistant"
              description="Ask anything about the Midnight ecosystem. Spy delivers personalized intelligence from docs, videos, and community knowledge."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Private Memory Vault"
              description="Your preferences and interests are stored privately. Spy remembers what matters to you without exposing your data."
            />
            <FeatureCard
              icon={<Award className="w-6 h-6" />}
              title="Community Reputation"
              description="Earn badges and prove your contributions using Midnight selective disclosure. Your reputation, your privacy."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <h1 className="text-2xl font-bold text-white mb-2">
          {greeting}, Agent
        </h1>
        <p className="text-midnight-300">
          {preferences?.interests?.length > 0 ? (
            <>Your interests: {preferences.interests.join(", ")}</>
          ) : (
            <>Complete onboarding to personalize your feed</>
          )}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction
          icon={<MessageSquare className="w-5 h-5" />}
          label="Chat with Spy"
          onClick={() => onNavigate("spy")}
          color="spy"
        />
        <QuickAction
          icon={<Target className="w-5 h-5" />}
          label="View Missions"
          onClick={() => onNavigate("missions")}
          color="blue"
        />
        <QuickAction
          icon={<Shield className="w-5 h-5" />}
          label="Private Vault"
          onClick={() => onNavigate("vault")}
          color="purple"
        />
        <QuickAction
          icon={<Award className="w-5 h-5" />}
          label="Reputation"
          onClick={() => onNavigate("reputation")}
          color="gold"
        />
      </div>

      {/* Intel Vault Quick Actions */}
      <div className="glass rounded-2xl p-5 border border-spy/20">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-spy" />
          <h2 className="text-base font-semibold text-white">Intel Vault</h2>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-spy/10 text-spy border border-spy/30 font-mono">
            Privacy-Preserving
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <QuickAction
            icon={<Shield className="w-5 h-5" />}
            label="Submit Intel"
            onClick={() => onNavigate("intel")}
            color="spy"
          />
          <QuickAction
            icon={<ShieldCheck className="w-5 h-5" />}
            label="Verify Intel"
            onClick={() => onNavigate("verify")}
            color="blue"
          />
          <QuickAction
            icon={<Activity className="w-5 h-5" />}
            label="Threat Feed"
            onClick={() => onNavigate("feed")}
            color="purple"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* News Feed */}
        <div className="glass rounded-2xl p-6 border border-midnight-800/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-spy" />
              Latest Intelligence
            </h2>
            <span className="text-xs text-midnight-400">Live updates</span>
          </div>
          <div className="space-y-3">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-midnight-800/40 border border-midnight-700/50 hover:border-midnight-600 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-midnight-100 group-hover:text-spy transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-midnight-400">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-midnight-500 group-hover:text-spy transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="glass rounded-2xl p-6 border border-midnight-800/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Opportunities
            </h2>
            <button 
              onClick={() => onNavigate("missions")}
              className="text-xs text-spy hover:underline"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl bg-midnight-800/40 border border-midnight-700/50 hover:border-midnight-600 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-midnight-100 group-hover:text-spy transition-colors">
                      {opp.title}
                    </h3>
                    <span className="text-xs text-midnight-400 capitalize">{opp.type}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-spy/10 text-spy text-sm font-medium">
                    {opp.reward}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label="Docs Indexed"
          value="1,247"
          change="+12 today"
        />
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Active Agents"
          value="3,892"
          change="+45 this week"
        />
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Missions"
          value="156"
          change="12 available"
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Badges Issued"
          value="8,421"
          change="On-chain verified"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-midnight-800/40 border border-midnight-700/50">
      <div className="w-12 h-12 rounded-lg bg-spy/10 flex items-center justify-center text-spy mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-midnight-400">{description}</p>
    </div>
  );
}

function QuickAction({ icon, label, onClick, color }: { icon: React.ReactNode; label: string; onClick: () => void; color: string }) {
  const colorClasses: Record<string, string> = {
    spy: "bg-spy/10 text-spy border-spy/30 hover:bg-spy/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20",
    gold: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${colorClasses[color]}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function StatCard({ icon, label, value, change }: { icon: React.ReactNode; label: string; value: string; change: string }) {
  return (
    <div className="glass rounded-xl p-4 border border-midnight-800/50">
      <div className="flex items-center gap-2 text-midnight-400 mb-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-spy mt-1">{change}</div>
    </div>
  );
}
