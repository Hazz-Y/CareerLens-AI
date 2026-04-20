"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CourseData {
  month: string;
  placementRate: number;
  salaryAvg: number;
  recruiterCount: number;
}

interface DeptData {
  dept: string;
  rate: number;
  avgSalary: number;
}

interface SkillData {
  skill: string;
  score: number;
  benchmark: number;
}

interface CoursePerformanceProps {
  courseData: CourseData[];
  deptData: DeptData[];
  skillData: SkillData[];
}

export default function CoursePerformance({
  courseData,
  deptData,
  skillData,
}: CoursePerformanceProps) {
  const [activeChart, setActiveChart] = useState<"trend" | "dept" | "skills">("trend");

  const tabs = [
    { id: "trend" as const, label: "Placement Trend", icon: TrendingUp },
    { id: "dept" as const, label: "By Department", icon: BarChart3 },
    { id: "skills" as const, label: "Skill Profile", icon: BarChart3 },
  ];

  return (
    <div className="card-premium p-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "var(--gradient-card-purple)" }}
          >
            <BarChart3 size={18} className="text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Institute Performance
            </h2>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Course & campus analytics
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-xl p-1"
          style={{ background: "#f1f5f9" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: activeChart === tab.id ? "white" : "transparent",
                color:
                  activeChart === tab.id
                    ? "var(--indigo-600)"
                    : "var(--text-tertiary)",
                boxShadow:
                  activeChart === tab.id
                    ? "0 1px 3px rgba(0,0,0,0.08)"
                    : "none",
              }}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-64">
        {activeChart === "trend" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={courseData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPlacement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf4" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #e8ecf4",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="placementRate"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#colorPlacement)"
                name="Placement Rate %"
                dot={{ fill: "#6366f1", r: 3 }}
                activeDot={{ r: 5, fill: "#6366f1" }}
              />
              <Area
                type="monotone"
                dataKey="salaryAvg"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#colorSalary)"
                name="Avg Salary (LPA)"
                dot={{ fill: "#10b981", r: 3 }}
                activeDot={{ r: 5, fill: "#10b981" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeChart === "dept" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf4" vertical={false} />
              <XAxis
                dataKey="dept"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #e8ecf4",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="rate"
                name="Placement Rate %"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              >
                {deptData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.dept === "CSE"
                        ? "#6366f1"
                        : entry.rate >= 80
                          ? "#818cf8"
                          : entry.rate >= 70
                            ? "#a5b4fc"
                            : "#c7d2fe"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeChart === "skills" && (
          <div className="h-full flex flex-col justify-center gap-3 px-2">
            {skillData.map((skill, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="w-20 text-xs font-medium text-right flex-shrink-0"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {skill.skill}
                </span>
                <div className="flex-1 relative h-5">
                  {/* Benchmark line */}
                  <div
                    className="absolute top-0 h-full w-0.5 z-10"
                    style={{
                      left: `${skill.benchmark}%`,
                      background: "var(--text-tertiary)",
                      opacity: 0.4,
                    }}
                  />
                  {/* Bar bg */}
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{ background: "#f1f5f9" }}
                  />
                  {/* Bar fill */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-md animate-progress"
                    style={{
                      width: `${skill.score}%`,
                      background:
                        skill.score >= skill.benchmark
                          ? "var(--gradient-primary)"
                          : "linear-gradient(90deg, #f59e0b, #fbbf24)",
                    }}
                  />
                </div>
                <span
                  className="w-8 text-xs font-bold text-right"
                  style={{
                    color:
                      skill.score >= skill.benchmark
                        ? "var(--indigo-600)"
                        : "var(--amber-500)",
                  }}
                >
                  {skill.score}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-4 mt-2 ml-20 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm" style={{ background: "var(--indigo-500)" }} /> Your score
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5" style={{ background: "var(--text-tertiary)", opacity: 0.4 }} /> Benchmark
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div
        className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t"
        style={{ borderColor: "var(--card-border)" }}
      >
        {[
          { label: "Avg Placement Rate", value: "85%", color: "var(--indigo-600)" },
          { label: "Recruiter Participation", value: "30+", color: "var(--emerald-600)" },
          { label: "Avg Package (CSE)", value: "₹8.5 LPA", color: "var(--purple-500)" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-lg font-bold number-display" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
