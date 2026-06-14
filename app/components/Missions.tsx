"use client";

import { useState } from "react";
import { 
  Target, 
  Compass, 
  FileText, 
  Hammer, 
  Users, 
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap
} from "lucide-react";
import { useWalletContext } from "./WalletProvider";

interface Mission {
  id: string;
  title: string;
  description: string;
  type: "scout" | "intel" | "builder" | "recruit";
  reward: number;
  xp: number;
  difficulty: "easy" | "medium" | "hard";
  timeEstimate: string;
  completed?: boolean;
}

const missions: Mission[] = [
  {
    id: "1",
    title: "Scout: Review New Ecosystem Project",
    description: "Explore a newly launched Midnight project and submit a brief review covering architecture, privacy features, and use case.",
    type: "scout",
    reward: 50,
    xp: 100,
    difficulty: "easy",
    timeEstimate: "15 min",
  },
  {
    id: "2",
    title: "Intel: Summarize Edda Labs Video",
    description: "Watch the latest Edda Labs tutorial and create a written summary for the community knowledge base.",
    type: "intel",
    reward: 100,
    xp: 200,
    difficulty: "easy",
    timeEstimate: "45 min",
  },
  {
    id: "3",
    title: "Builder: Create Educational Thread",
    description: "Write a Twitter/X thread explaining Compact contracts or Midnight privacy features. Minimum 5 tweets.",
    type: "builder",
    reward: 250,
    xp: 500,
    difficulty: "medium",
    timeEstimate: "1 hour",
  },
  {
    id: "4",
    title: "Recruit: Bring New Builder",
    description: "Introduce a developer to the Midnight ecosystem. They must complete onboarding and verify their wallet.",
    type: "recruit",
    reward: 200,
    xp: 400,
    difficulty: "medium",
    timeEstimate: "Varies",
  },
  {
    id: "5",
    title: "Scout: Security Audit Review",
    description: "Review a project's security documentation and identify potential privacy considerations.",
    type: "scout",
    reward: 150,
    xp: 300,
    difficulty: "hard",
    timeEstimate: "2 hours",
  },
  {
    id: "6",
    title: "Builder: Open Source Contribution",
    description: "Submit a PR to an official Midnight repository: docs, examples, or tooling improvements.",
    type: "builder",
    reward: 500,
    xp: 1000,
    difficulty: "hard",
    timeEstimate: "2-4 hours",
  },
];

const missionTypes = [
  { id: "all", label: "All Missions", icon: Target },
  { id: "scout", label: "Scout", icon: Compass },
  { id: "intel", label: "Intel", icon: FileText },
  { id: "builder", label: "Builder", icon: Hammer },
  { id: "recruit", label: "Recruit", icon: Users },
];

const difficultyColors: Record<string, string> = {
  easy: "text-green-400 bg-green-500/10 border-green-500/30",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  hard: "text-red-400 bg-red-500/10 border-red-500/30",
};

const typeIcons: Record<string, React.ReactNode> = {
  scout: <Compass className="w-4 h-4" />,
  intel: <FileText className="w-4 h-4" />,
  builder: <Hammer className="w-4 h-4" />,
  recruit: <Users className="w-4 h-4" />,
};

export function Missions() {
  const { isConnected } = useWalletContext();
  const [activeType, setActiveType] = useState("all");
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  const filteredMissions = activeType === "all" 
    ? missions 
    : missions.filter(m => m.type === activeType);

  const completeMission = (id: string) => {
    setCompletedMissions(prev => [...prev, id]);
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-12 text-center border border-midnight-800/50">
          <Target className="w-16 h-16 text-midnight-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Nightforce Missions</h2>
          <p className="text-midnight-400">
            Connect your wallet to view and complete community missions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-midnight-800/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 flex items-center justify-center">
              <Target className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Nightforce Missions</h1>
              <p className="text-midnight-400">
                Complete tasks, earn rewards, and build your reputation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass rounded-xl px-4 py-2 border border-midnight-800/50">
              <span className="text-xs text-midnight-400">Total XP</span>
              <div className="text-xl font-bold text-spy">
                {completedMissions.length * 250}
              </div>
            </div>
            <div className="glass rounded-xl px-4 py-2 border border-midnight-800/50">
              <span className="text-xs text-midnight-400">Completed</span>
              <div className="text-xl font-bold text-green-400">
                {completedMissions.length}/{missions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {missionTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveType(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              activeType === id
                ? "bg-spy/10 border-spy/50 text-spy"
                : "bg-midnight-800/40 border-midnight-700/50 text-midnight-300 hover:border-midnight-600"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => {
          const isCompleted = completedMissions.includes(mission.id);
          
          return (
            <div
              key={mission.id}
              className={`glass rounded-2xl p-6 border transition-all ${
                isCompleted
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-midnight-800/50 hover:border-midnight-700"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg border ${difficultyColors[mission.difficulty]}`}>
                    {typeIcons[mission.type]}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${difficultyColors[mission.difficulty]}`}>
                    {mission.difficulty}
                  </span>
                </div>
                {isCompleted && (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                )}
              </div>

              <h3 className="font-semibold text-white mb-2">{mission.title}</h3>
              <p className="text-sm text-midnight-400 mb-4">{mission.description}</p>

              <div className="flex items-center gap-4 text-sm text-midnight-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{mission.timeEstimate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>{mission.xp} XP</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-midnight-800/50">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-spy" />
                  <span className="text-spy font-medium">{mission.reward} NIGHT</span>
                </div>
                <button
                  onClick={() => completeMission(mission.id)}
                  disabled={isCompleted}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isCompleted
                      ? "bg-green-500/20 text-green-400 cursor-default"
                      : "bg-spy text-midnight-950 hover:bg-spy-dark"
                  }`}
                >
                  {isCompleted ? (
                    "Completed"
                  ) : (
                    <>
                      Start Mission
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="glass rounded-xl p-4 border border-midnight-800/50">
        <div className="flex items-center gap-2 text-sm text-midnight-400">
          <Award className="w-4 h-4 text-spy" />
          <span>
            Mission rewards are distributed in NIGHT tokens upon verification. 
            XP contributes to your Nightforce reputation score.
          </span>
        </div>
      </div>
    </div>
  );
}
