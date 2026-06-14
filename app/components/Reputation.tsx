"use client";

import { useState } from "react";
import { 
  Award, 
  Shield, 
  Eye, 
  EyeOff,
  CheckCircle,
  Lock,
  Globe,
  Code,
  Users,
  MessageSquare,
  Star,
  Share2
} from "lucide-react";
import { useWalletContext } from "./WalletProvider";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  proof: string;
}

const badges: Badge[] = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Visited 10 ecosystem projects",
    icon: <Globe className="w-6 h-6" />,
    earned: true,
    earnedDate: "2024-01-15",
    proof: "proof_explorer_7a3f",
  },
  {
    id: "builder",
    name: "Builder",
    description: "Submitted project to ecosystem",
    icon: <Code className="w-6 h-6" />,
    earned: true,
    earnedDate: "2024-02-20",
    proof: "proof_builder_9e2a",
  },
  {
    id: "nightforce",
    name: "Nightforce Elite",
    description: "Participated in 20 Spaces",
    icon: <Star className="w-6 h-6" />,
    earned: true,
    earnedDate: "2024-03-10",
    proof: "proof_elite_4b8c",
  },
  {
    id: "educator",
    name: "Educator",
    description: "Published educational content",
    icon: <MessageSquare className="w-6 h-6" />,
    earned: false,
    proof: "",
  },
  {
    id: "recruiter",
    name: "Recruiter",
    description: "Brought 5 new builders",
    icon: <Users className="w-6 h-6" />,
    earned: false,
    proof: "",
  },
];

export function Reputation() {
  const { isConnected } = useWalletContext();
  const [showPrivate, setShowPrivate] = useState(true);
  const [activeProof, setActiveProof] = useState<string | null>(null);

  const earnedBadges = badges.filter(b => b.earned);
  const progress = (earnedBadges.length / badges.length) * 100;

  const generateProof = (badge: Badge) => {
    setActiveProof(badge.proof);
    setTimeout(() => setActiveProof(null), 5000);
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-12 text-center border border-midnight-800/50">
          <Award className="w-16 h-16 text-midnight-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Community Reputation</h2>
          <p className="text-midnight-400">
            Connect your wallet to view your badges and reputation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 flex items-center justify-center">
              <Award className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Community Reputation</h1>
              <p className="text-midnight-400">
                Prove contributions without revealing your wallet.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPrivate(!showPrivate)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-midnight-800/60 border border-midnight-700/50 text-midnight-300 hover:text-spy hover:border-spy/50 transition-all"
          >
            {showPrivate ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{showPrivate ? "Private Mode" : "Public Mode"}</span>
          </button>
        </div>
      </div>

      {/* Reputation Score */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Nightforce Score</h2>
          <span className="text-2xl font-bold text-spy">{earnedBadges.length * 250}</span>
        </div>
        <div className="h-3 bg-midnight-800/60 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-spy to-midnight-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-midnight-400">
          <span>{earnedBadges.length} badges earned</span>
          <span>{badges.length - earnedBadges.length} to go</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`glass rounded-2xl p-6 border transition-all ${
              badge.earned
                ? "border-midnight-800/50 hover:border-yellow-500/30"
                : "border-midnight-800/30 opacity-60"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                badge.earned
                  ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                  : "bg-midnight-800/40 border border-midnight-700/50 text-midnight-500"
              }`}>
                {badge.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{badge.name}</h3>
                  {badge.earned && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <p className="text-sm text-midnight-400 mt-1">{badge.description}</p>
                {badge.earned && badge.earnedDate && (
                  <p className="text-xs text-midnight-500 mt-2">
                    Earned {badge.earnedDate}
                  </p>
                )}
              </div>
            </div>

            {badge.earned && showPrivate && (
              <div className="mt-4 pt-4 border-t border-midnight-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-midnight-400">
                    <Lock className="w-3 h-3 text-spy" />
                    <span>Zero-knowledge proof available</span>
                  </div>
                  <button
                    onClick={() => generateProof(badge)}
                    className="flex items-center gap-1 text-xs text-spy hover:underline"
                  >
                    <Share2 className="w-3 h-3" />
                    Prove
                  </button>
                </div>
                
                {activeProof === badge.proof && (
                  <div className="mt-3 p-3 rounded-lg bg-midnight-950 border border-spy/30 font-mono text-xs text-midnight-400">
                    <div className="flex items-center gap-2 mb-2 text-spy">
                      <Shield className="w-3 h-3" />
                      <span>Selective Disclosure Proof</span>
                    </div>
                    <p>Proving: Has {badge.name} badge</p>
                    <p>Not revealing: Wallet, history, activity</p>
                    <p className="mt-2 text-green-400">Verification: Valid ✓</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Proof of Contributor Feature */}
      <div className="glass rounded-2xl p-6 border border-spy/30 spy-glow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-spy/10 border border-spy/30 flex items-center justify-center">
            <Shield className="w-6 h-6 text-spy" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white flex items-center gap-2">
              Proof-of-Contributor
              <span className="px-2 py-0.5 rounded-full bg-spy/10 text-spy text-xs border border-spy/30">
                Midnight Exclusive
              </span>
            </h3>
            <p className="text-sm text-midnight-400 mt-2">
              Generate a zero-knowledge proof that you are a top contributor without 
              revealing your wallet address, transaction history, or holdings. This 
              becomes your portable reputation passport across the ecosystem.
            </p>
            <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-spy text-midnight-950 font-medium hover:bg-spy-dark transition-all">
              <Shield className="w-4 h-4" />
              Generate Reputation Passport
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Info */}
      <div className="glass rounded-xl p-4 border border-midnight-800/50">
        <div className="flex items-start gap-3 text-sm text-midnight-400">
          <Eye className="w-4 h-4 text-spy mt-0.5" />
          <div>
            <p className="font-medium text-midnight-300 mb-1">Privacy-Preserving Reputation</p>
            <p>
              Your badges are stored on-chain with selective disclosure. You can prove 
              you have credentials without revealing any additional information about 
              your wallet or activity. Powered by Midnight's data protection by design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
