"use client";

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Clock,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  IndianRupee,
  CalendarClock,
  PieChart,
  ArrowUpRight,
} from "lucide-react";

const loanData = {
  loanAmount: "₹12,00,000",
  disbursedDate: "Aug 2021",
  repaymentStarts: "Dec 2025",
  tenure: "7 years",
  interestRate: "9.5%",
  emi: "₹19,850",
  totalPayable: "₹16,67,400",
  moratoriumEnds: "Jun 2026",
};

const repaymentRisk = {
  score: 18,
  level: "Low" as const,
  delinquencyProbability: 8,
  earlyRepaymentProbability: 35,
};

const portfolioMetrics = [
  { label: "Placement Probability (6M)", value: "88%", trend: "+2.8%", color: "var(--emerald-600)", icon: TrendingUp },
  { label: "Expected Starting Salary", value: "₹8.5 LPA", trend: "+12%", color: "var(--indigo-600)", icon: IndianRupee },
  { label: "EMI-to-Income Ratio", value: "23%", trend: "-2%", color: "var(--emerald-600)", icon: PieChart },
  { label: "Loan Default Risk", value: "8%", trend: "-3%", color: "var(--emerald-600)", icon: ShieldAlert },
  { label: "Time to First Paycheck", value: "~3 months", trend: "Improving", color: "var(--blue-600)", icon: Clock },
  { label: "Career ROI Score", value: "4.2x", trend: "+0.3", color: "var(--purple-500)", icon: ArrowUpRight },
];

const riskAlerts = [
  {
    type: "info" as const,
    title: "Strong Placement Outlook",
    detail: "88% probability of placement within 6 months — well above portfolio average of 72%.",
  },
  {
    type: "warning" as const,
    title: "Cloud Skills Gap Detected",
    detail: "Student lacks cloud computing skills. 35% of job matches require cloud expertise. Recommend skill-up intervention.",
  },
  {
    type: "success" as const,
    title: "Internship Drive Active",
    detail: "Student's institute has 18% more recruiter participation this quarter. Positive placement signal.",
  },
  {
    type: "info" as const,
    title: "EMI Affordability Safe",
    detail: "Projected EMI-to-income ratio of 23% is well within the safe threshold of 40%.",
  },
];

export default function LenderDashboard() {
  return (
    <div className="space-y-6">
      {/* Loan Overview */}
      <div className="card-premium overflow-hidden animate-fade-in">
        <div
          className="px-6 py-4"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <DollarSign size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Loan & Repayment Overview</h2>
                <p className="text-xs text-slate-300">Education loan linked to placement outcomes</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background:
                      repaymentRisk.level === "Low"
                        ? "rgba(16,185,129,0.2)"
                        : "rgba(245,158,11,0.2)",
                    color:
                      repaymentRisk.level === "Low"
                        ? "#34d399"
                        : "#fbbf24",
                  }}
                >
                  {repaymentRisk.level} Repayment Risk
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Loan Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Loan Amount", value: loanData.loanAmount, icon: IndianRupee },
              { label: "Monthly EMI", value: loanData.emi, icon: CalendarClock },
              { label: "Interest Rate", value: loanData.interestRate, icon: TrendingUp },
              { label: "Moratorium Ends", value: loanData.moratoriumEnds, icon: Clock },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                <div className="flex items-center gap-2 mb-1">
                  <item.icon size={12} style={{ color: "var(--text-tertiary)" }} />
                  <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                    {item.label}
                  </span>
                </div>
                <p className="text-base font-bold number-display" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Portfolio Metrics */}
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            AI-Powered Lender Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {portfolioMetrics.map((metric, i) => (
              <div
                key={i}
                className="p-3 rounded-xl transition-all hover:shadow-sm"
                style={{ background: "#f8fafc", border: "1px solid var(--card-border)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <metric.icon size={12} style={{ color: metric.color }} />
                  <span className="text-[10px] font-medium" style={{ color: "var(--text-tertiary)" }}>
                    {metric.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-bold number-display" style={{ color: metric.color }}>
                    {metric.value}
                  </p>
                  <span className="text-[10px] font-medium" style={{ color: "var(--emerald-600)" }}>
                    {metric.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Repayment Risk Gauge */}
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            Repayment Risk Assessment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl text-center" style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
              <p className="text-3xl font-bold number-display" style={{ color: "var(--emerald-600)" }}>
                {repaymentRisk.score}/100
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--emerald-600)" }}>
                Repayment Risk Score
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                Lower is better
              </p>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
              <p className="text-3xl font-bold number-display" style={{ color: "var(--emerald-600)" }}>
                {repaymentRisk.delinquencyProbability}%
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--emerald-600)" }}>
                Delinquency Probability
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                30-day past due risk
              </p>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ background: "var(--indigo-50)", border: "1px solid var(--indigo-200)" }}>
              <p className="text-3xl font-bold number-display" style={{ color: "var(--indigo-600)" }}>
                {repaymentRisk.earlyRepaymentProbability}%
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--indigo-600)" }}>
                Early Repayment Probability
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                Based on salary projections
              </p>
            </div>
          </div>

          {/* Lender Alerts */}
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            AI Alerts for Lenders
          </h3>
          <div className="space-y-2">
            {riskAlerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{
                  background:
                    alert.type === "warning"
                      ? "#fffbeb"
                      : alert.type === "success"
                        ? "#ecfdf5"
                        : "var(--indigo-50)",
                  border: `1px solid ${
                    alert.type === "warning"
                      ? "#fde68a"
                      : alert.type === "success"
                        ? "#a7f3d0"
                        : "var(--indigo-200)"
                  }`,
                }}
              >
                {alert.type === "warning" ? (
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--amber-500)" }} />
                ) : alert.type === "success" ? (
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--emerald-600)" }} />
                ) : (
                  <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--indigo-600)" }} />
                )}
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {alert.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {alert.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
