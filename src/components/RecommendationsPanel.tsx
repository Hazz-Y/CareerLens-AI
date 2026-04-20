"use client";

import {
  FileText,
  Cloud,
  Users,
  Laptop,
  Building2,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileText,
  Cloud,
  Users,
  Laptop,
  Building2,
};

interface Recommendation {
  id: number;
  icon: string;
  title: string;
  reason: string;
  impact: string;
  time: string;
  category: string;
}

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
}

export default function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  const impactColors: Record<string, { bg: string; text: string; border: string }> = {
    Critical: {
      bg: "var(--rose-50)",
      text: "#be123c",
      border: "#fecdd3",
    },
    High: {
      bg: "var(--indigo-50)",
      text: "var(--indigo-600)",
      border: "var(--indigo-200)",
    },
    Medium: {
      bg: "var(--amber-50)",
      text: "#b45309",
      border: "#fde68a",
    },
    Low: {
      bg: "var(--emerald-50)",
      text: "var(--emerald-600)",
      border: "#bbf7d0",
    },
  };

  return (
    <div className="card-premium p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "var(--gradient-card-amber)" }}
          >
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Next Best Actions
            </h2>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Personalized AI recommendations
            </p>
          </div>
        </div>
        <button
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-100"
          style={{ color: "var(--indigo-600)" }}
        >
          View All
        </button>
      </div>

      {/* Recommendation Cards */}
      <div className="space-y-3 stagger-children">
        {recommendations.map((rec) => {
          const Icon = iconMap[rec.icon] || FileText;
          const impact = impactColors[rec.impact] || impactColors.Medium;

          return (
            <div
              key={rec.id}
              className="group flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/30"
              style={{ borderColor: "var(--card-border)" }}
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-transform group-hover:scale-105"
                style={{
                  background: "var(--indigo-50)",
                  color: "var(--indigo-600)",
                }}
              >
                <Icon size={18} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {rec.title}
                  </h3>
                  <span
                    className="flex-shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase"
                    style={{
                      background: impact.bg,
                      color: impact.text,
                      border: `1px solid ${impact.border}`,
                    }}
                  >
                    {rec.impact}
                  </span>
                </div>
                <p
                  className="text-xs mt-1 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {rec.reason}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className="flex items-center gap-1 text-[11px] font-medium"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <Clock size={11} />
                    {rec.time}
                  </span>
                  <span
                    className="text-[11px] px-2 py-0.5 rounded font-medium"
                    style={{
                      background: "#f1f5f9",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {rec.category}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight
                size={16}
                className="flex-shrink-0 mt-1 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1"
                style={{ color: "var(--indigo-500)" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
