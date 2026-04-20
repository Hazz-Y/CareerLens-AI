"use client";

import { FileText, ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react";

interface ResumeScoreCardProps {
  score: number;
}

export default function ResumeScoreCard({ score }: ResumeScoreCardProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const scoreColor =
    score >= 80 ? "var(--emerald-500)" : score >= 60 ? "var(--indigo-500)" : "var(--amber-500)";

  const checklist = [
    { label: "Contact information complete", done: true },
    { label: "Professional summary added", done: true },
    { label: "Skills section present", done: true },
    { label: "Projects with quantified impact", done: false },
    { label: "Certifications listed", done: true },
    { label: "GitHub/Portfolio link", done: false },
  ];

  return (
    <div className="card-premium p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ background: "var(--gradient-card-rose)" }}
        >
          <FileText size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Resume Score
          </h2>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            AI-powered analysis
          </p>
        </div>
      </div>

      {/* Score Ring */}
      <div className="flex items-center gap-6 mb-5">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e8ecf4"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold number-display" style={{ color: "var(--text-primary)" }}>
              {score}
            </span>
            <span className="text-[10px] font-medium" style={{ color: "var(--text-tertiary)" }}>
              out of 100
            </span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>
            {score >= 80 ? "Excellent" : score >= 60 ? "Good, room for improvement" : "Needs attention"}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your resume is {score >= 80 ? "well-optimized" : "missing some key elements"} for ATS and recruiter scanning.
            {score < 80 && " Adding quantified achievements and a portfolio link can significantly boost your score."}
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {checklist.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-sm"
            style={{ color: item.done ? "var(--text-secondary)" : "var(--text-primary)" }}
          >
            {item.done ? (
              <CheckCircle size={16} style={{ color: "var(--emerald-500)" }} />
            ) : (
              <AlertCircle size={16} style={{ color: "var(--amber-400)" }} />
            )}
            <span className={item.done ? "line-through opacity-60" : "font-medium"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        className="flex items-center justify-center gap-2 w-full mt-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
        style={{ background: "var(--gradient-primary)" }}
      >
        Improve Resume
        <ArrowUpRight size={15} />
      </button>
    </div>
  );
}
