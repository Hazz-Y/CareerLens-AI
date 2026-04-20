"use client";

import {
  FileText,
  Download,
  ArrowUpRight,
  Clock,
} from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  registrationId: string;
  department: string;
  batch: string;
  campus: string;
  status: "Placement Ready" | "Needs Improvement" | "High Risk";
  lastUpdated: string;
  avatarInitials: string;
  cgpa: number;
}

export default function ProfileHeader({
  name,
  registrationId,
  department,
  batch,
  campus,
  status,
  lastUpdated,
  avatarInitials,
  cgpa,
}: ProfileHeaderProps) {
  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    "Placement Ready": {
      bg: "var(--emerald-50)",
      text: "var(--emerald-600)",
      border: "#bbf7d0",
    },
    "Needs Improvement": {
      bg: "var(--amber-50)",
      text: "#b45309",
      border: "#fde68a",
    },
    "High Risk": {
      bg: "var(--rose-50)",
      text: "#be123c",
      border: "#fecdd3",
    },
  };

  const sc = statusColors[status];

  return (
    <div className="card-premium overflow-hidden animate-fade-in">
      {/* Cover Banner */}
      <div
        className="relative h-36 md:h-44 overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Abstract pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="120" fill="url(#grad1)" />
          <circle cx="400" cy="50" r="80" fill="url(#grad1)" />
          <circle cx="700" cy="130" r="100" fill="url(#grad1)" />
          <circle cx="1000" cy="60" r="90" fill="url(#grad1)" />
          <circle cx="1150" cy="150" r="60" fill="url(#grad1)" />
          <path d="M0,180 Q300,120 600,160 T1200,140 V200 H0 Z" fill="rgba(255,255,255,0.04)" />
        </svg>

        {/* Floating decorative dots */}
        <div className="absolute top-6 right-8 grid grid-cols-5 gap-2 opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>
      </div>

      {/* Profile Content */}
      <div className="relative px-5 md:px-8 pb-6">
        {/* Avatar */}
        <div
          className="absolute -top-12 left-5 md:left-8 w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold text-white border-4 border-white"
          style={{
            background: "var(--gradient-primary)",
            boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
          }}
        >
          {avatarInitials}
        </div>

        {/* Top row — Actions */}
        <div className="flex justify-end pt-3 gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--card-border)", color: "var(--text-secondary)" }}>
            <FileText size={14} />
            View Report
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--card-border)", color: "var(--text-secondary)" }}>
            <Download size={14} />
            Download
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white transition-all hover:opacity-90"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ArrowUpRight size={14} />
            Improve Profile
          </button>
        </div>

        {/* Name & Details */}
        <div className="mt-4 md:mt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1
              className="text-xl md:text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {name}
            </h1>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold w-fit"
              style={{
                background: sc.bg,
                color: sc.text,
                border: `1px solid ${sc.border}`,
              }}
            >
              {status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2">
            <InfoChip label="ID" value={registrationId} />
            <InfoChip label="Dept" value={department} />
            <InfoChip label="Batch" value={batch} />
            <InfoChip label="Campus" value={campus} />
            <InfoChip label="CGPA" value={String(cgpa)} />
          </div>

          <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: "var(--text-tertiary)" }}>
            <Clock size={12} />
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
      <span className="font-medium" style={{ color: "var(--text-tertiary)" }}>
        {label}:
      </span>{" "}
      <span className="font-medium" style={{ color: "var(--text-primary)" }}>
        {value}
      </span>
    </span>
  );
}
