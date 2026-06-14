"use client";

import { ShieldCheck } from "lucide-react";

interface ConfidenceBadgeProps {
  count: number;
  size?: "sm" | "md" | "lg";
}

function getColor(count: number) {
  if (count === 0) return { ring: "border-midnight-600", text: "text-midnight-400", bg: "bg-midnight-800/40", label: "Unverified" };
  if (count < 3)  return { ring: "border-yellow-500/60", text: "text-yellow-400", bg: "bg-yellow-500/10", label: "Low" };
  if (count < 7)  return { ring: "border-orange-500/60", text: "text-orange-400", bg: "bg-orange-500/10", label: "Medium" };
  return             { ring: "border-red-500/60",    text: "text-red-400",    bg: "bg-red-500/10",    label: "High" };
}

export function ConfidenceBadge({ count, size = "md" }: ConfidenceBadgeProps) {
  const { ring, text, bg, label } = getColor(count);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-2 gap-2",
  };

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-mono font-semibold ${ring} ${text} ${bg} ${sizeClasses[size]}`}
    >
      <ShieldCheck className={iconSize[size]} />
      {count} · {label}
    </span>
  );
}
