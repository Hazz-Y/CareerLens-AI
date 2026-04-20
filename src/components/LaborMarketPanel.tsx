"use client";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  AlertTriangle,
  Building2,
  MapPin,
  Briefcase,
  Activity,
} from "lucide-react";

// ─── Labor Market Data ─────────────────────────────
const sectorTrends = [
  { sector: "IT Services", demand: 85, change: +12, hiring: "Strong" },
  { sector: "BFSI", demand: 72, change: +5, hiring: "Moderate" },
  { sector: "Healthcare", demand: 68, change: +18, hiring: "Growing" },
  { sector: "Manufacturing", demand: 45, change: -8, hiring: "Declining" },
  { sector: "E-Commerce", demand: 78, change: +22, hiring: "Strong" },
  { sector: "EdTech", demand: 55, change: -15, hiring: "Slowing" },
];

const regionData = [
  { region: "Pune", density: 92, avgSalary: "₹8.2 LPA", topSector: "IT" },
  { region: "Bangalore", density: 95, avgSalary: "₹9.5 LPA", topSector: "IT" },
  { region: "Mumbai", density: 88, avgSalary: "₹8.8 LPA", topSector: "BFSI" },
  { region: "Hyderabad", density: 85, avgSalary: "₹7.9 LPA", topSector: "IT" },
  { region: "Chennai", density: 80, avgSalary: "₹7.2 LPA", topSector: "Manufacturing" },
  { region: "Delhi NCR", density: 82, avgSalary: "₹8.0 LPA", topSector: "E-Commerce" },
];

const macroIndicators = [
  { label: "GDP Growth Rate", value: "6.8%", trend: "up", impact: "Positive hiring cycle" },
  { label: "IT Sector Growth", value: "12% YoY", trend: "up", impact: "Strong demand for CSE grads" },
  { label: "Campus Hiring Volume", value: "+18% YoY", trend: "up", impact: "More recruiter participation" },
  { label: "Avg Time to Placement", value: "2.4 months", trend: "down", impact: "Faster placements this year" },
  { label: "Cloud Skills Demand", value: "+35% QoQ", trend: "up", impact: "Gap in student profile" },
  { label: "Fresher Unemployment", value: "14.2%", trend: "down", impact: "Improving job market" },
];

export default function LaborMarketPanel() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="card-premium p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "var(--gradient-card-cyan)" }}
          >
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Industry & Labor Market Indicators
            </h2>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Real-time market conditions affecting placement outcomes
            </p>
          </div>
        </div>

        {/* Macro Indicators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {macroIndicators.map((ind, i) => (
            <div
              key={i}
              className="p-3 rounded-xl transition-all hover:shadow-sm"
              style={{ background: "#f8fafc", border: "1px solid var(--card-border)" }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium" style={{ color: "var(--text-tertiary)" }}>
                  {ind.label}
                </span>
                {ind.trend === "up" ? (
                  <TrendingUp size={12} style={{ color: "var(--emerald-600)" }} />
                ) : (
                  <TrendingDown size={12} style={{ color: "var(--emerald-600)" }} />
                )}
              </div>
              <p className="text-lg font-bold number-display" style={{ color: "var(--text-primary)" }}>
                {ind.value}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                {ind.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sector Hiring Trends */}
      <div className="card-premium p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "var(--gradient-card-emerald)" }}
          >
            <Briefcase size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Sector Hiring Trends
            </h2>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              IT, BFSI, manufacturing, healthcare & more
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sectorTrends.map((sector, i) => (
            <div key={i} className="flex items-center gap-4">
              <span
                className="w-28 text-sm font-medium text-right flex-shrink-0"
                style={{ color: "var(--text-secondary)" }}
              >
                {sector.sector}
              </span>
              <div className="flex-1 relative h-7 rounded-lg overflow-hidden" style={{ background: "#f1f5f9" }}>
                <div
                  className="absolute inset-y-0 left-0 rounded-lg animate-progress flex items-center justify-end pr-2"
                  style={{
                    width: `${sector.demand}%`,
                    background:
                      sector.hiring === "Strong"
                        ? "var(--gradient-primary)"
                        : sector.hiring === "Growing"
                          ? "linear-gradient(90deg, #10b981, #34d399)"
                          : sector.hiring === "Moderate"
                            ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                            : "linear-gradient(90deg, #ef4444, #f87171)",
                  }}
                >
                  <span className="text-[10px] font-bold text-white">{sector.demand}%</span>
                </div>
              </div>
              <div className="flex items-center gap-1 w-20">
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: sector.change > 0 ? "var(--emerald-600)" : "var(--rose-500)",
                  }}
                >
                  {sector.change > 0 ? "+" : ""}
                  {sector.change}%
                </span>
              </div>
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full w-16 text-center"
                style={{
                  background:
                    sector.hiring === "Strong"
                      ? "var(--indigo-50)"
                      : sector.hiring === "Growing"
                        ? "#ecfdf5"
                        : sector.hiring === "Moderate"
                          ? "#fffbeb"
                          : "#fef2f2",
                  color:
                    sector.hiring === "Strong"
                      ? "var(--indigo-600)"
                      : sector.hiring === "Growing"
                        ? "var(--emerald-600)"
                        : sector.hiring === "Moderate"
                          ? "var(--amber-500)"
                          : "var(--rose-500)",
                }}
              >
                {sector.hiring}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Job Density */}
      <div className="card-premium p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "var(--gradient-card-purple)" }}
          >
            <MapPin size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Regional Job Density
            </h2>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Job availability by region for your field
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {regionData.map((region, i) => (
            <div
              key={i}
              className="p-4 rounded-xl transition-all hover:shadow-md cursor-pointer"
              style={{
                background: i === 0 ? "var(--indigo-50)" : "#f8fafc",
                border: i === 0 ? "1px solid var(--indigo-200)" : "1px solid var(--card-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} style={{ color: i === 0 ? "var(--indigo-600)" : "var(--text-tertiary)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {region.region}
                  {i === 0 && (
                    <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
                      Your City
                    </span>
                  )}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--text-tertiary)" }}>Job Density</span>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{region.density}/100</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--text-tertiary)" }}>Avg Salary</span>
                  <span className="font-semibold" style={{ color: "var(--emerald-600)" }}>{region.avgSalary}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--text-tertiary)" }}>Top Sector</span>
                  <span className="font-semibold" style={{ color: "var(--indigo-600)" }}>{region.topSector}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
