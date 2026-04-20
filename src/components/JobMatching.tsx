"use client";

import {
  MapPin,
  Banknote,
  Bookmark,
  ExternalLink,
  Zap,
  Clock,
  Briefcase,
} from "lucide-react";

interface JobMatch {
  id: number;
  company: string;
  role: string;
  match: number;
  salary: string;
  location: string;
  urgency: string;
  logo: string;
  color: string;
}

interface JobMatchingProps {
  jobs: JobMatch[];
}

export default function JobMatching({ jobs }: JobMatchingProps) {
  const urgencyStyle: Record<string, { bg: string; text: string }> = {
    "Hiring Now": { bg: "var(--emerald-50)", text: "var(--emerald-600)" },
    "Closing Soon": { bg: "var(--rose-50)", text: "#be123c" },
    Open: { bg: "var(--blue-50)", text: "var(--blue-600)" },
  };

  return (
    <div className="card-premium p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "var(--gradient-card-cyan)" }}
          >
            <Briefcase size={18} className="text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Job Matches
            </h2>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Based on your skills & profile
            </p>
          </div>
        </div>
        <button
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-100"
          style={{ color: "var(--indigo-600)" }}
        >
          Browse All Jobs
        </button>
      </div>

      {/* Job Cards */}
      <div className="space-y-3 stagger-children">
        {jobs.map((job) => {
          const urgency = urgencyStyle[job.urgency] || urgencyStyle.Open;
          return (
            <div
              key={job.id}
              className="group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:border-indigo-200 hover:shadow-sm"
              style={{ borderColor: "var(--card-border)" }}
            >
              {/* Company Logo */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white transition-transform group-hover:scale-105"
                style={{ background: job.color }}
              >
                {job.logo}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3
                    className="text-sm font-semibold truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {job.company}
                  </h3>
                  <span
                    className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold"
                    style={{
                      background: urgency.bg,
                      color: urgency.text,
                    }}
                  >
                    {job.urgency === "Hiring Now" && <Zap size={9} />}
                    {job.urgency === "Closing Soon" && <Clock size={9} />}
                    {job.urgency}
                  </span>
                </div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {job.role}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span
                    className="flex items-center gap-1 text-[11px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <Banknote size={11} />
                    {job.salary}
                  </span>
                  <span
                    className="flex items-center gap-1 text-[11px]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <MapPin size={11} />
                    {job.location}
                  </span>
                </div>
              </div>

              {/* Match & Actions */}
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                {/* Match percentage */}
                <div className="relative w-12 h-12">
                  <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="#e8ecf4"
                      strokeWidth="3"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke={job.match >= 85 ? "#10b981" : job.match >= 70 ? "#6366f1" : "#f59e0b"}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${(job.match / 100) * 100.5} 100.5`}
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {job.match}%
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5">
                  <button
                    className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                    title="Save"
                  >
                    <Bookmark size={14} style={{ color: "var(--text-tertiary)" }} />
                  </button>
                  <button
                    className="p-1.5 rounded-lg transition-colors hover:bg-indigo-50"
                    title="Apply"
                  >
                    <ExternalLink size={14} style={{ color: "var(--indigo-500)" }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
