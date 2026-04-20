"use client";

import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Brain,
  Info,
  GraduationCap,
  FolderGit2,
  Code2,
  BadgeCheck,
  Building2,
  Eye,
  Cloud,
} from "lucide-react";
import { useState } from "react";

const factorIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GraduationCap,
  FolderGit2,
  Code2,
  BadgeCheck,
  Building2,
  Eye,
  Cloud,
};

interface Factor {
  label: string;
  impact: number;
  icon: string;
}

interface RiskAnalysisData {
  level: "Low" | "Medium" | "High";
  score: number;
  confidence: number;
  summary: string;
  positiveFactors: Factor[];
  negativeFactors: Factor[];
  topReasons: string[];
}

interface AIRiskAnalysisProps {
  data: RiskAnalysisData;
}

export default function AIRiskAnalysis({ data }: AIRiskAnalysisProps) {
  const [showDetails, setShowDetails] = useState(false);

  const levelConfig = {
    Low: {
      color: "var(--emerald-500)",
      bgColor: "var(--emerald-50)",
      borderColor: "#bbf7d0",
      Icon: ShieldCheck,
      meterAngle: 30,
    },
    Medium: {
      color: "#b45309",
      bgColor: "var(--amber-50)",
      borderColor: "#fde68a",
      Icon: ShieldAlert,
      meterAngle: 90,
    },
    High: {
      color: "var(--rose-500)",
      bgColor: "var(--rose-50)",
      borderColor: "#fecdd3",
      Icon: ShieldX,
      meterAngle: 150,
    },
  };

  const config = levelConfig[data.level];

  return (
    <div className="card-premium p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Brain size={18} className="text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              AI Risk Analysis
            </h2>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Powered by ML prediction model
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-gray-100"
          style={{ color: "var(--indigo-600)" }}
        >
          <Info size={13} />
          {showDetails ? "Less detail" : "More detail"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Risk Meter */}
        <div className="flex flex-col items-center">
          {/* Gauge */}
          <div className="relative w-44 h-24 mb-4">
            <svg viewBox="0 0 200 110" className="w-full h-full">
              {/* Background arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e8ecf4"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Colored arc segments */}
              <path
                d="M 20 100 A 80 80 0 0 1 73 32"
                fill="none"
                stroke="#10b981"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d="M 73 32 A 80 80 0 0 1 127 32"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d="M 127 32 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Needle */}
              <line
                x1="100"
                y1="100"
                x2={100 + 60 * Math.cos(((180 - config.meterAngle) * Math.PI) / 180)}
                y2={100 - 60 * Math.sin(((180 - config.meterAngle) * Math.PI) / 180)}
                stroke={config.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="100" r="6" fill={config.color} />
              <circle cx="100" cy="100" r="3" fill="white" />
            </svg>
          </div>

          {/* Risk badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm mb-2"
            style={{
              background: config.bgColor,
              color: config.color,
              border: `1px solid ${config.borderColor}`,
            }}
          >
            <config.Icon size={16} />
            {data.level} Risk
          </div>

          {/* Score & Confidence */}
          <div className="text-center">
            <p className="text-3xl font-bold number-display" style={{ color: "var(--text-primary)" }}>
              {data.score}<span className="text-base font-medium" style={{ color: "var(--text-tertiary)" }}>/100</span>
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
              Model confidence: <span className="font-semibold" style={{ color: "var(--indigo-600)" }}>{data.confidence}%</span>
            </p>
          </div>
        </div>

        {/* Center — Summary & Top Reasons */}
        <div className="lg:col-span-2">
          {/* Summary */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "var(--indigo-50)",
              border: "1px solid var(--indigo-100)",
            }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              &ldquo;{data.summary}&rdquo;
            </p>
          </div>

          {/* Top reasons */}
          <h3
            className="text-sm font-semibold mb-3 flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            <AlertTriangle size={14} style={{ color: "var(--amber-500)" }} />
            Key Risk Drivers
          </h3>
          <div className="space-y-2 mb-4">
            {data.topReasons.map((reason, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-xs font-semibold mt-0.5"
                  style={{
                    background: "var(--amber-50)",
                    color: "var(--amber-500)",
                    border: "1px solid #fde68a",
                  }}
                >
                  {i + 1}
                </span>
                {reason}
              </div>
            ))}
          </div>

          {/* Factors */}
          {showDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              {/* Positive */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                  style={{ color: "var(--emerald-600)" }}>
                  <TrendingUp size={12} />
                  Strongest Positives
                </h4>
                <div className="space-y-2">
                  {data.positiveFactors.map((f, i) => {
                    const FIcon = factorIconMap[f.icon] || GraduationCap;
                    return (
                      <FactorBar
                        key={i}
                        icon={<FIcon size={14} />}
                        label={f.label}
                        value={f.impact}
                        color="var(--emerald-500)"
                        bgColor="var(--emerald-50)"
                      />
                    );
                  })}
                </div>
              </div>

              {/* Negative */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                  style={{ color: "var(--rose-500)" }}>
                  <TrendingDown size={12} />
                  Strongest Negatives
                </h4>
                <div className="space-y-2">
                  {data.negativeFactors.map((f, i) => {
                    const FIcon = factorIconMap[f.icon] || Building2;
                    return (
                      <FactorBar
                        key={i}
                        icon={<FIcon size={14} />}
                        label={f.label}
                        value={Math.abs(f.impact)}
                        color="var(--rose-500)"
                        bgColor="var(--rose-50)"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FactorBar({
  icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 p-2.5 rounded-lg"
      style={{ background: bgColor }}
    >
      <span style={{ color }}>{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
          {label}
        </p>
        <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
          <div
            className="h-full rounded-full animate-progress"
            style={{ width: `${value}%`, background: color }}
          />
        </div>
      </div>
      <span className="text-xs font-bold" style={{ color }}>{value}%</span>
    </div>
  );
}
