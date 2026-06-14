"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Clock, BookOpen, Search, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: string[];
}

const quickPrompts = [
  "What happened in Midnight this week?",
  "What projects launched recently?",
  "Summarize Edda Labs videos",
  "Explain Compact contracts",
  "Find ecosystem grants",
  "Which projects need community help?",
];

// Mock RAG responses based on keywords
const getMockResponse = (query: string): { content: string; sources: string[] } => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("week") || lowerQuery.includes("happened")) {
    return {
      content: `This week in Midnight:\n\n🚀 **Testnet v0.8.0 Released** - Major performance improvements with 40% faster proof generation\n\n📚 **3 New Tutorials** - Compact contract development, privacy patterns, and DApp integration\n\n🏆 **Grant Winners Announced** - 12 projects selected for the next funding round\n\n👥 **Community Spotlight** - Interview with the team building Midnight's first DeFi protocol`,
      sources: ["Midnight Official Blog", "Edda Labs Newsletter", "Community Discord"],
    };
  }
  
  if (lowerQuery.includes("project") && lowerQuery.includes("launch")) {
    return {
      content: `Recent Midnight Project Launches:\n\n1. **NightSwap** - Privacy-preserving DEX (Beta)\n   - Automated market maker with selective disclosure\n   - Audited by Edda Labs security team\n\n2. **MidLock** - Decentralized identity vault\n   - Store credentials privately\n   - Prove attributes without revealing data\n\n3. **CipherChat** - Encrypted messaging protocol\n   - Built on Midnight's privacy layer\n   - Group chats with zero-knowledge membership`,
      sources: ["Ecosystem Catalog", "Project Documentation"],
    };
  }
  
  if (lowerQuery.includes("edda") || lowerQuery.includes("video")) {
    return {
      content: `Recent Edda Labs Content:\n\n🎥 **"Building Your First Compact Contract"** (45 min)\n   - Walkthrough of the developer toolchain\n   - Common pitfalls and best practices\n   - 2.3k views this week\n\n🎥 **"Privacy Patterns for DeFi"** (32 min)\n   - Selective disclosure in practice\n   - Case study: NightSwap architecture\n\n🎥 **"Midnight vs Other Chains"** (28 min)\n   - Technical comparison with Zcash, Monero\n   - Why data protection by design matters`,
      sources: ["Edda Labs YouTube", "Video Transcripts"],
    };
  }
  
  if (lowerQuery.includes("compact") || lowerQuery.includes("contract")) {
    return {
      content: `Compact Contracts on Midnight:\n\nCompact is Midnight's domain-specific language for smart contracts with built-in privacy.\n\n**Key Features:**\n- Zero-knowledge proofs generated automatically\n- Selective disclosure of transaction details\n- Type-safe with strong compile-time guarantees\n\n**Example Structure:**\n\`\`\`compact
contract Token {
  private ledger Map<Address, U64> balances;
  
  public function transfer(to: Address, amount: U64) {
    // Proof generated for private state transition
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }
}
\`\`\`\n\nWant me to explain specific concepts like circuits, witnesses, or the proof system?`,
      sources: ["Midnight Documentation", "Compact Language Spec"],
    };
  }
  
  if (lowerQuery.includes("grant") || lowerQuery.includes("fund")) {
    return {
      content: `Active Midnight Grant Opportunities:\n\n💰 **Ecosystem Grants** (Up to 50k NIGHT)\n   - Open: Infrastructure, tooling, DeFi, identity\n   - Deadline: Rolling applications\n   - https://grants.midnight.network\n\n💰 **Builder Bounties** (1k-10k NIGHT)\n   - Specific tasks: docs, tutorials, bug fixes\n   - 23 active bounties available\n\n💰 **Research Grants** (Up to 100k NIGHT)\n   - Zero-knowledge research\n   - Privacy-preserving systems\n   - Formal verification of protocols`,
      sources: ["Grant Portal", "Governance Forum"],
    };
  }
  
  if (lowerQuery.includes("help") || lowerQuery.includes("community")) {
    return {
      content: `Projects Seeking Community Help:\n\n🔧 **NightSwap** - Needs frontend developers\n   - React/TypeScript experience\n   - Reward: 500 NIGHT + reputation badge\n\n🔧 **MidLock** - Documentation writers needed\n   - Technical writing for identity concepts\n   - Reward: 250 NIGHT\n\n🔧 **Ecosystem Catalog** - Project reviewers\n   - Evaluate new submissions\n   - Reward: 100 NIGHT per review\n\n🔧 **Translation** - Compact docs to Spanish, Mandarin\n   - Reward: 200 NIGHT per language`,
      sources: ["Community Discord", "Project Repositories"],
    };
  }
  
  // Default response
  return {
    content: `I understand you're asking about "${query}". Let me search the Midnight ecosystem knowledge base for relevant information.\n\nBased on available data sources (documentation, Edda Labs content, community discussions), here's what I found:\n\nThis query relates to several areas of the Midnight ecosystem. To give you the most relevant information, could you specify if you're interested in:\n- Technical documentation\n- Recent news/updates\n- Developer tutorials\n- Grant opportunities\n- Community discussions\n\nOr try one of the suggested prompts below for common questions.`,
    sources: ["Midnight Documentation", "Community Knowledge Base"],
  };
};

export function SpyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "🕶️ **Spy online.**\n\nI'm your private intelligence agent for the Midnight ecosystem. I can help you with:\n\n• Latest ecosystem updates\n• Project discovery and research\n• Technical documentation\n• Grant opportunities\n• Community insights\n\nWhat would you like to know? Your queries are processed with privacy-preserving RAG - I learn what matters to you without exposing your data.",
      timestamp: new Date(),
      sources: ["Spy Intelligence Network"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getMockResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        sources: response.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Chat Header */}
      <div className="glass rounded-t-2xl p-4 border border-midnight-800/50 border-b-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-spy/20 to-spy/5 border border-spy/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-spy" />
          </div>
          <div>
            <h2 className="font-semibold text-white flex items-center gap-2">
              Spy
              <span className="px-2 py-0.5 rounded-full bg-spy/10 text-spy text-xs border border-spy/30">
                Online
              </span>
            </h2>
            <p className="text-xs text-midnight-400">
              Privacy-preserving RAG • Midnight Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 glass border-x border-midnight-800/50 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-midnight-700"
                  : "bg-spy/10 border border-spy/30"
              }`}
            >
              {message.role === "user" ? (
                <User className="w-4 h-4 text-midnight-300" />
              ) : (
                <Bot className="w-4 h-4 text-spy" />
              )}
            </div>
            <div className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block rounded-2xl px-4 py-3 text-left ${
                  message.role === "user"
                    ? "bg-midnight-700 text-white"
                    : "bg-midnight-800/60 border border-midnight-700/50 text-midnight-100"
                }`}
              >
                <div className="whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                  {message.content.split("**").map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="text-spy">{part}</strong>
                    ) : (
                      part
                    )
                  )}
                </div>
                {message.sources && (
                  <div className="mt-3 pt-3 border-t border-midnight-700/50">
                    <div className="flex items-center gap-2 text-xs text-midnight-400">
                      <BookOpen className="w-3 h-3" />
                      <span>Sources: {message.sources.join(", ")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-midnight-500 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-spy/10 border border-spy/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-spy" />
            </div>
            <div className="bg-midnight-800/60 border border-midnight-700/50 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-spy animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-spy animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-spy animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length < 3 && (
        <div className="glass border-x border-midnight-800/50 p-4">
          <div className="flex items-center gap-2 mb-3 text-xs text-midnight-400">
            <Lightbulb className="w-4 h-4" />
            <span>Quick prompts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-1.5 rounded-full bg-midnight-800/60 border border-midnight-700/50 text-xs text-midnight-300 hover:border-spy/50 hover:text-spy transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="glass rounded-b-2xl p-4 border border-midnight-800/50 border-t-0">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Spy anything about Midnight..."
              className="w-full bg-midnight-800/60 border border-midnight-700/50 rounded-xl px-4 py-3 text-midnight-100 placeholder-midnight-500 focus:outline-none focus:border-spy/50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-midnight-500" />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-spy text-midnight-950 font-medium hover:bg-spy-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-midnight-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-spy" />
            <span>Powered by RAG • Sources verified on Midnight</span>
          </div>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
}
