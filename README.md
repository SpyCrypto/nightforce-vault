# 🕶️ Nightforce Intelligence

**The Private AI Operations Center for Midnight Nightforce**

Powered by [Midnight](https://midnight.network) + [Edda Labs](https://eddalabs.io)  

---

## Vision

Utilize the first **Privacy-Preserving Community Intelligence Nightforce Agent** where users interact with an AI assistant ("Spy") that understands the Midnight ecosystem, stores preferences privately, and delivers personalized intelligence without exposing user data.

**Think:**
- ChatGPT + Midnight
- Research Assistant + Ecosystem Catalog
- Community Reputation + Selective Disclosure
- AI Agent + Privacy Layer

---

## ✨ Features

### 🕶️ Spy AI Assistant
Your personal intelligence agent for the Midnight ecosystem. Ask Spy anything:
- "What happened in Midnight this week?"
- "What projects launched recently?"
- "Summarize Edda Labs videos"
- "Explain Compact contracts"
- "Find ecosystem grants"
- "Which projects need community help?"

**Data Sources:**
- Midnight ecosystem catalog
- Midnight documentation
- Edda Labs content
- Community Spaces
- Governance updates
- Discord knowledge base

### 🔐 Private Memory Vault
Spy remembers your preferences privately:
- Favorite projects
- Preferred content types
- Technical level
- Builder interests

Stored locally with encrypted preview. No public profile required.

### 🏆 Community Reputation
Earn badges and prove contributions:
- **Explorer** - Visited 10 ecosystem projects
- **Builder** - Submitted project
- **Nightforce Elite** - Participated in 20 Spaces
- **Educator** - Published educational content
- **Recruiter** - Brought new Nightforce Recruits

**Unique Feature:** Proof-of-Contributor using Midnight selective disclosure
- ✅ Prove you have a badge
- ❌ Without revealing wallet, history, or exact score

### 🎯 Nightforce Missions
Complete Zealy Community Quests for rewards:
- **Scout Mission** - Review two (2) new ecosystem project (+50 XP)
- **Intel Mission** - Summarize Edda Labs video (+100 XP)
- **Builder Mission** - Create educational thread (+250 XP)
- **Recruit Mission** - Bring new Nightforce Recruit (+200 XP)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SpyCrypto/nightforce-intelligence.git
cd nightforce-intelligence

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Engagement Efforts

```bash
npm run build
npm start
```

---

## 🏗️ Architecture

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 3.4
- **Language:** TypeScript 5.7
- **Icons:** Lucide React
- **UI Design:** Glass morphism with Midnight theme

### AI Layer (MVP)
- **Pattern:** Retrieval-Augmented Generation (RAG)
- **Knowledge Sources:**
  - Midnight docs
  - Edda Labs content
  - Ecosystem Catalog
  - Community-created content
- **Future Vector DB:** Pinecone, Weaviate, or Chroma
- **Future Agent Framework:** LangGraph, CrewAI, or OpenAI SDK

### Midnight Smart Contracts (Future)

**Contract 1: Community Achievement Registry**
- Stores badge issuance
- Credential proofs
- Never stores personal activity publicly

**Contract 2: Selective Disclosure Verification**
- Prove contributor/builder/educator status
- Without revealing wallet or details

**Contract 3: Mission Rewards**
- Tasks: Attend Space, Create Content, Join Builder Call
- Rewards: XP, Reputation, NFTs, NIGHT tokens

---

## 📁 Project Structure

```
nightforce/
├── app/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx    # Main dashboard with news & opportunities
│   │   ├── SpyChat.tsx      # AI assistant interface
│   │   ├── Vault.tsx        # Private preferences storage
│   │   ├── Missions.tsx     # Community quests system
│   │   ├── Reputation.tsx   # Badge system with proofs
│   │   ├── Navigation.tsx   # Top navigation bar
│   │   ├── OnboardingModal.tsx  # User onboarding flow
│   │   └── WalletProvider.tsx   # Wallet context
│   ├── hooks/
│   │   └── useWallet.ts     # Wallet connection hook
│   ├── globals.css          # Global styles + Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with tabs
├── package.json
├── tailwind.config.ts       # Custom Midnight theme
├── tsconfig.json
└── next.config.ts
```

---

## 🎨 Design System

### Colors
- **Primary:** `#00d4ff` (Spy Cyan)
- **Background:** `#0a0a0f` (Midnight Dark)
- **Accent:** Midnight blue palette (50-950)
- **Text:** `#FFFFFF` (White Midnight Brand White)

### Typography
- **Font Family:** JetBrains Mono, Fira Code (monospace)
- **Style:** Terminal aesthetic with gradient text

### Effects
- Glass morphism (`backdrop-filter: blur`)
- Spy glow (`box-shadow` with cyan)
- Grid background pattern
- Pulse animations

---

## 🔒 Privacy Features

1. **Local Storage** - Preferences stored in browser, not server
2. **Encrypted Preview** - Visual demonstration of encryption
3. **Selective Disclosure** - Prove credentials without revealing data
4. **Zero-Knowledge Proofs** - Midnight-powered reputation verification
5. **No Tracking** - No analytics or third-party cookies

---

## �️ Intel Vault — Privacy-Preserving Threat Intelligence

### Overview
Nightforce Intel Vault lets agents submit threat intelligence **privately** and have the broader community **verify it** — without ever revealing wallet addresses, domains, contract addresses, or report details publicly.

### How It Works

#### 1. Submit Intel (`/intel`)
- Agent enters: **Title**, **Category**, **Risk Level**, **Intel Details**
- App generates a cryptographic **commitment**: `SHA-256(title + details + salt)`
- **Private state**: full report stored only in local private storage (simulates Midnight's shielded state)
- **Public ledger**: only `{ reportId, commitment, timestamp, category, riskLevel }` is anchored
- Agent receives a **Report ID** and **Witness Salt** to share selectively

#### 2. Verify Intel (`/verify`)
- Second agent selects a report from the public ledger
- Submits their independent knowledge: matching title, details, and the salt
- App recomputes `SHA-256(title + details + salt)` and compares to stored commitment
- **Zero-knowledge check**: if hashes match → `verificationCount += 1`
- No details are ever disclosed during verification

#### 3. Threat Feed (`/feed`)
- Public dashboard shows **only**: Report ID · Category · Risk Level · Confidence Score
- The actual threat intelligence (wallet, domain, contract, details) remains completely private
- Sortable by confidence score or recency

### Privacy Guarantees
| Data | Public Chain | Private State |
|------|-------------|---------------|
| Report ID | ✅ Visible | ✅ Stored |
| Commitment hash | ✅ Visible | — |
| Confidence score | ✅ Visible | — |
| Category & Risk | ✅ Visible | ✅ Stored |
| Title | ✅ Visible | ✅ Stored |
| Intel Details | ❌ Never | ✅ Stored |
| Wallet Address | ❌ Never | ❌ Never |
| Domain / Contract | ❌ Never | ✅ In details |
| Witness Salt | ❌ Never | ✅ Owner only |

### Smart Contract (`contracts/IntelVault.compact`)
```
createReport(reportId, title, category, details, riskLevel, salt)
  → stores commitment on-ledger, private report in shielded state

verifyReport(reportId, title, details, salt)
  → asserts witnessCommitment == storedCommitment (ZK)
  → increments verificationCount publicly

getSummary(reportId) → ReportSummary (public fields only)
```

### Demo Flow
```
Alice submits:
  Title:    "Fake Midnight giveaway scam"
  Details:  "wallet 0xABC... draining funds via fake airdrop"
  Salt:     [auto-generated, shared with Bob]

Public sees:  Report #A1B2C3D4  Confidence: 0

Bob independently knows the same scam.
Bob submits witness: same title + details + salt
Contract verifies hash match → Confidence: 1

Public sees:  Report #A1B2C3D4  Confidence: 1
Nobody sees:  the wallet, the domain, the details
```

---

## �️ Roadmap

### Phase 1: MVP (Complete ✅)
- [x] Spy AI Assistant with mock RAG
- [x] Private Memory Vault
- [x] Community Reputation badges
- [x] Nightforce Missions system
- [x] Wallet connection simulation
- [x] Onboarding flow
- [x] Intel Vault — private report submission with commitment generation
- [x] Witness Verification — ZK-style proof against stored commitment
- [x] Threat Reputation Feed — public confidence scores, zero intel exposed
- [x] `IntelVault.compact` — Midnight Compact contract skeleton

### Phase 2: Enhanced AI (3-6 months)
- [ ] Real RAG with vector database
- [ ] Live data from Midnight sources
- [ ] Spy Teams (specialized agents)
  - 🕶️ Spy Researcher
  - 🎯 Spy Builder
  - 📢 Spy Growth
  - 🔍 Spy Auditor

### Phase 3: AgentVault Marketplace (6-12 months)
- [ ] Users publish private AI agents
- [ ] Governance Agent
- [ ] Ecosystem Agent
- [ ] Grant Agent
- [ ] Marketing Agent
- [ ] Permission system via Midnight

---

## 🤝 Contributing

Contributions welcome! Areas of interest:
- AI/RAG improvements
- Midnight smart contract integration
- New mission types
- Additional data sources
- UI/UX enhancements

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **Midnight** - Data protection by design blockchain
- **Edda Labs** - Education and ecosystem support
- **Cardano Foundation** - Midnight's parent ecosystem

---

## 📬 Contact

- **GitHub:** [SpyCrypto/nightforce-intelligence](https://github.com/SpyCrypto/nightforce-intelligence)
- **Midnight Discord:** [discord.gg/midnight](https://discord.gg/midnight)
- **Edda Labs:** [eddalabs.io](https://eddalabs.io)

---

**Built with 🔒 privacy, 🤖 Spy AI, and 🌙 Midnight**
