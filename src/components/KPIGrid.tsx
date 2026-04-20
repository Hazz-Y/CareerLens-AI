"use client";

import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  IndianRupee,
  ShieldAlert,
  Gauge,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingUp,
  Target,
  Award,
  IndianRupee,
  ShieldAlert,
  Gauge,
};

interface KPICardData {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix: string;
  trend: number;
  explanation: string;
  sparkline: number[];
  gradient: string;
  icon: string;
}

interface KPIGridProps {
  cards: KPICardData[];
}

export default function KPIGrid({ cards }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
      {cards.map((card) => (
        <KPICard key={card.id} card={card} />
      ))}
    </div>
  );
}

function KPICard({ card }: { card: KPICardData }) {
  const Icon = iconMap[card.icon] || TrendingUp;
  const isPositiveTrend = card.trend >= 0;
  // For risk score, down is good
  const isGoodTrend = card.id === "risk" ? !isPositiveTrend : isPositiveTrend;

  return (
    <div className="card-premium p-5 group cursor-pointer relative overflow-hidden">
      {/* Background gradient accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-[60px] opacity-[0.06] transition-opacity group-hover:opacity-[0.12]"
        style={{ background: card.gradient }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{
            background: card.gradient,
            boxShadow: `0 4px 12px ${card.gradient.includes("emerald") ? "rgba(16,185,129,0.2)" : card.gradient.includes("amber") ? "rgba(245,158,11,0.2)" : "rgba(99,102,241,0.2)"}`,
          }}
        >
          <Icon size={18} className="text-white" />
        </div>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
          style={{
            background: isGoodTrend ? "var(--emerald-50)" : "var(--rose-50)",
            color: isGoodTrend ? "var(--emerald-600)" : "var(--rose-500)",
          }}
        >
          {isPositiveTrend ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          {Math.abs(card.trend)}%
        </div>
      </div>

      {/* Value */}
      <div className="mb-1">
        <span
          className="text-3xl font-bold number-display"
          style={{ color: "var(--text-primary)" }}
        >
          {card.prefix}
          {card.value}
        </span>
        <span
          className="text-sm font-medium ml-0.5"
          style={{ color: "var(--text-tertiary)" }}
        >
          {card.suffix}
        </span>
      </div>

      {/* Title */}
      <p
        className="text-sm font-medium mb-3"
        style={{ color: "var(--text-secondary)" }}
      >
        {card.title}
      </p>

      {/* Sparkline */}
      <div className="h-8">
        <MiniSparkline data={card.sparkline} gradient={card.gradient} />
      </div>

      {/* Explanation */}
      <p
        className="text-xs mt-2 leading-relaxed"
        style={{ color: "var(--text-tertiary)" }}
      >
        {card.explanation}
      </p>
    </div>
  );
}

function MiniSparkline({
  data,
  gradient,
}: {
  data: number[];
  gradient: string;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const height = 32;
  const width = 180;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => ({
    x: i * step,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }));

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  // Area fill path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  // Use a basic color based on gradient string
  let strokeColor = "#6366f1";
  if (gradient.includes("emerald")) strokeColor = "#10b981";
  if (gradient.includes("amber")) strokeColor = "#f59e0b";
  if (gradient.includes("rose")) strokeColor = "#f43f5e";
  if (gradient.includes("purple")) strokeColor = "#a855f7";
  if (gradient.includes("cyan")) strokeColor = "#06b6d4";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`spark-${strokeColor}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#spark-${strokeColor})`} />
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="3"
        fill={strokeColor}
      />
    </svg>
  );
}
