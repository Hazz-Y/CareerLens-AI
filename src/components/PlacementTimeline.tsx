"use client";

import {
  CheckCircle2,
  Circle,
  AlertCircle,
  ClipboardList,
} from "lucide-react";

interface TimelineStep {
  step: string;
  completed: boolean;
  date: string | null;
}

interface PlacementTimelineProps {
  steps: TimelineStep[];
}

export default function PlacementTimeline({ steps }: PlacementTimelineProps) {
  const completedCount = steps.filter((s) => s.completed).length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="card-premium p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: "var(--gradient-card-emerald)" }}
          >
            <ClipboardList size={18} className="text-white" />
          </div>
          <div>
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Placement Progress
            </h2>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {completedCount} of {steps.length} milestones completed
            </p>
          </div>
        </div>
        <span
          className="text-sm font-bold number-display"
          style={{ color: "var(--indigo-600)" }}
        >
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-2 rounded-full mb-6 overflow-hidden"
        style={{ background: "#e8ecf4" }}
      >
        <div
          className="h-full rounded-full animate-progress"
          style={{
            width: `${progress}%`,
            background: "var(--gradient-primary)",
          }}
        />
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const nextCompleted = index < steps.length - 1 && steps[index + 1].completed;

          return (
            <div key={index} className="flex gap-4">
              {/* Line & dot */}
              <div className="flex flex-col items-center">
                {step.completed ? (
                  <CheckCircle2
                    size={22}
                    className="flex-shrink-0"
                    style={{ color: "var(--emerald-500)" }}
                    fill="var(--emerald-50)"
                  />
                ) : (
                  <div className="relative">
                    <Circle
                      size={22}
                      className="flex-shrink-0"
                      style={{ color: "var(--card-border)" }}
                    />
                    {!step.completed && index === completedCount && (
                      <AlertCircle
                        size={22}
                        className="absolute inset-0 flex-shrink-0"
                        style={{ color: "var(--amber-400)" }}
                      />
                    )}
                  </div>
                )}
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 min-h-[28px]"
                    style={{
                      background:
                        step.completed && nextCompleted
                          ? "var(--emerald-400)"
                          : step.completed
                            ? "linear-gradient(to bottom, var(--emerald-400), var(--card-border))"
                            : "var(--card-border)",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                <p
                  className="text-sm font-medium leading-snug"
                  style={{
                    color: step.completed
                      ? "var(--text-primary)"
                      : "var(--text-tertiary)",
                  }}
                >
                  {step.step}
                </p>
                {step.date ? (
                  <p
                    className="text-[11px] mt-0.5"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Completed {step.date}
                  </p>
                ) : (
                  <p
                    className="text-[11px] mt-0.5 font-medium"
                    style={{
                      color:
                        index === completedCount
                          ? "var(--amber-500)"
                          : "var(--text-tertiary)",
                    }}
                  >
                    {index === completedCount ? "Action needed" : "Pending"}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
