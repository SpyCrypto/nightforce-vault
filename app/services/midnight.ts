"use client";

import { v4 as uuidv4 } from "uuid";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type IntelCategory =
  | "Suspicious Wallet"
  | "Phishing Domain"
  | "Fake Airdrop"
  | "Malicious Smart Contract"
  | "Social Engineering Campaign"
  | "Rug Pull"
  | "Other";

export interface PrivateReport {
  title: string;
  category: IntelCategory;
  details: string;
  riskLevel: RiskLevel;
}

export interface ReportSummary {
  reportId: string;
  commitment: string;
  verificationCount: number;
  createdAt: number;
  category: IntelCategory;
  riskLevel: RiskLevel;
  title: string;
}

export interface WitnessResult {
  success: boolean;
  message: string;
}

// ---------------------------------------------------------------------------
// Commitment — simulates Midnight's private-state commitment scheme.
// In a real Compact contract this would be: commit(poseidon(title || details || salt))
// ---------------------------------------------------------------------------
async function sha256Hex(data: string): Promise<string> {
  const encoded = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function generateCommitment(
  title: string,
  details: string,
  salt: string
): Promise<string> {
  const preimage = `${title}::${details}::${salt}`;
  const hash = await sha256Hex(preimage);
  return `0x${hash}`;
}

export function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ---------------------------------------------------------------------------
// Private State — stored only in localStorage, never posted publicly.
// Models Midnight's private ledger state.
// ---------------------------------------------------------------------------
const PRIVATE_KEY = "nightforce_private_reports";
const PUBLIC_KEY = "nightforce_public_summaries";

function loadPrivate(): Record<string, PrivateReport & { salt: string }> {
  try {
    const raw = localStorage.getItem(PRIVATE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePrivate(data: Record<string, PrivateReport & { salt: string }>) {
  localStorage.setItem(PRIVATE_KEY, JSON.stringify(data));
}

function loadPublic(): Record<string, ReportSummary> {
  try {
    const raw = localStorage.getItem(PUBLIC_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePublic(data: Record<string, ReportSummary>) {
  localStorage.setItem(PUBLIC_KEY, JSON.stringify(data));
}

// ---------------------------------------------------------------------------
// Circuit: createReport()
// Inputs: title, category, details, riskLevel
// Actions: generates commitment, stores private report, stores public summary
// ---------------------------------------------------------------------------
export async function createReport(
  report: PrivateReport
): Promise<{ reportId: string; commitment: string; salt: string }> {
  const reportId = uuidv4().replace(/-/g, "").slice(0, 12).toUpperCase();
  const salt = generateSalt();
  const commitment = await generateCommitment(report.title, report.details, salt);

  // Private state — never leaves this device (simulates Midnight private ledger)
  const privateStore = loadPrivate();
  privateStore[reportId] = { ...report, salt };
  savePrivate(privateStore);

  // Public state — commitment + metadata only (no sensitive details)
  const publicStore = loadPublic();
  publicStore[reportId] = {
    reportId,
    commitment,
    verificationCount: 0,
    createdAt: Date.now(),
    category: report.category,
    riskLevel: report.riskLevel,
    title: report.title,
  };
  savePublic(publicStore);

  return { reportId, commitment, salt };
}

// ---------------------------------------------------------------------------
// Circuit: verifyReport()
// Inputs: reportId, witnessTitle, witnessDetails, witnessSalt
// Actions: recomputes commitment, checks match, increments verificationCount
// ---------------------------------------------------------------------------
export async function verifyReport(
  reportId: string,
  witnessTitle: string,
  witnessDetails: string,
  witnessSalt: string
): Promise<WitnessResult> {
  const publicStore = loadPublic();
  const summary = publicStore[reportId];

  if (!summary) {
    return { success: false, message: "Report not found on the public ledger." };
  }

  const witnessCommitment = await generateCommitment(
    witnessTitle,
    witnessDetails,
    witnessSalt
  );

  if (witnessCommitment !== summary.commitment) {
    return {
      success: false,
      message:
        "Witness proof failed — your data does not match the commitment. No details were disclosed.",
    };
  }

  // Increment confidence score publicly
  publicStore[reportId] = {
    ...summary,
    verificationCount: summary.verificationCount + 1,
  };
  savePublic(publicStore);

  return {
    success: true,
    message: `Witness verified. Confidence score for Report #${reportId} is now ${
      summary.verificationCount + 1
    }.`,
  };
}

// ---------------------------------------------------------------------------
// Query: getSummaries() — public information only
// ---------------------------------------------------------------------------
export function getSummaries(): ReportSummary[] {
  const store = loadPublic();
  return Object.values(store).sort((a, b) => b.createdAt - a.createdAt);
}

// ---------------------------------------------------------------------------
// Owner-only: getPrivateReport() — simulates private witness access
// ---------------------------------------------------------------------------
export function getPrivateReport(
  reportId: string
): (PrivateReport & { salt: string }) | null {
  const store = loadPrivate();
  return store[reportId] ?? null;
}
