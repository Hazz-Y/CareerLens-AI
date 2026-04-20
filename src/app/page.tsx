"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProfileHeader from "@/components/ProfileHeader";
import KPIGrid from "@/components/KPIGrid";
import AIRiskAnalysis from "@/components/AIRiskAnalysis";
import RecommendationsPanel from "@/components/RecommendationsPanel";
import JobMatching from "@/components/JobMatching";
import PlacementTimeline from "@/components/PlacementTimeline";
import CoursePerformance from "@/components/CoursePerformance";
import ResumeScoreCard from "@/components/ResumeScoreCard";
import AIChatWidget from "@/components/AIChatWidget";
import LaborMarketPanel from "@/components/LaborMarketPanel";
import LenderDashboard from "@/components/LenderDashboard";
import EditableProfile from "@/components/EditableProfile";
import type { StudentProfileData } from "@/components/EditableProfile";

import {
  studentProfile as initialProfile,
  kpiCards,
  riskAnalysis,
  recommendations,
  jobMatches,
  placementTimeline,
  coursePerformanceData,
  departmentComparison,
  skillRadarData,
  sidebarItems,
  notifications,
} from "@/lib/mockData";

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState<StudentProfileData>(initialProfile as StudentProfileData);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "academic", label: "Academic" },
    { id: "skills", label: "Skills" },
    { id: "jobs", label: "Jobs" },
    { id: "risk", label: "Risk" },
    { id: "reports", label: "Reports" },
  ];

  const filteredJobs = jobMatches.filter(job => 
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredRecommendations = recommendations.filter(rec => 
    rec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rec.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen" style={{ background: "var(--background)" }}>
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeItem={activeNav}
        onItemClick={setActiveNav}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col lg:ml-[240px] transition-all">
        {/* Navbar */}
        <Navbar
          notifications={notifications}
          studentName={profile.name}
          avatarInitials={profile.avatarInitials}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Content */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 pb-24 lg:pb-8">
          {activeNav === "dashboard" && (
            <>
              {/* Profile Header */}
              <section className="mb-6">
                <ProfileHeader
                  name={profile.name}
                  registrationId={profile.registrationId}
                  department={profile.department}
                  batch={profile.batch}
                  campus={profile.campus}
                  status={profile.status}
                  lastUpdated={profile.lastUpdated}
                  avatarInitials={profile.avatarInitials}
                  cgpa={profile.cgpa}
                />
              </section>

              {/* Tabs */}
              <section className="mb-6">
                <div
                  className="flex items-center gap-1 overflow-x-auto pb-1 border-b"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
                        activeTab === tab.id
                          ? "tab-active"
                          : "border-transparent"
                      }`}
                      style={{
                        color:
                          activeTab === tab.id
                            ? "var(--indigo-600)"
                            : "var(--text-tertiary)",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Overview Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <section>
                    <KPIGrid cards={kpiCards} />
                  </section>

                  {/* AI Risk Analysis */}
                  <section>
                    <AIRiskAnalysis data={riskAnalysis} />
                  </section>

                  {/* Two Column — Recommendations + Timeline */}
                  <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <RecommendationsPanel recommendations={filteredRecommendations} />
                    </div>
                    <div className="space-y-6">
                      <PlacementTimeline steps={placementTimeline} />
                    </div>
                  </section>

                  {/* Two Column — Charts + Resume */}
                  <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <CoursePerformance
                        courseData={coursePerformanceData}
                        deptData={departmentComparison}
                        skillData={skillRadarData}
                      />
                    </div>
                    <div>
                      <ResumeScoreCard score={profile.resumeScore} />
                    </div>
                  </section>

                  {/* Job Matching */}
                  <section>
                    <JobMatching jobs={filteredJobs} />
                  </section>
                </div>
              )}

              {/* Academic Tab */}
              {activeTab === "academic" && (
                <div className="space-y-6">
                  <CoursePerformance
                    courseData={coursePerformanceData}
                    deptData={departmentComparison}
                    skillData={skillRadarData}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AcademicInfoCard
                      title="Academic Progress"
                      items={[
                        { label: "CGPA", value: `${profile.cgpa} / 10` },
                        { label: "Credits Completed", value: `${profile.completedCredits} / ${profile.totalCredits}` },
                        { label: "Department Rank", value: "Top 15%" },
                        { label: "Attendance", value: "92%" },
                        { label: "Active Backlogs", value: "0" },
                      ]}
                    />
                    <AcademicInfoCard
                      title="Certifications & Achievements"
                      items={[
                        { label: "Google Data Analytics", value: "Completed" },
                        { label: "HackerRank Gold (Problem Solving)", value: "Earned" },
                        { label: "Dean's List", value: "Semester 5, 6" },
                        { label: "Paper Published", value: "IEEE 2025" },
                        { label: "Hackathon", value: "Runner-up, CodeFest 2025" },
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <div className="card-premium p-6 animate-fade-in">
                    <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Skill Profile vs Industry Benchmark</h2>
                    <div className="space-y-4">
                      {skillRadarData.map((skill, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <span className="w-28 text-sm font-medium text-right" style={{ color: "var(--text-secondary)" }}>
                            {skill.skill}
                          </span>
                          <div className="flex-1 relative h-7 rounded-lg overflow-hidden" style={{ background: "#f1f5f9" }}>
                            {/* Benchmark */}
                            <div
                              className="absolute top-0 h-full w-0.5 z-10"
                              style={{ left: `${skill.benchmark}%`, background: "#94a3b8" }}
                            />
                            {/* Score bar */}
                            <div
                              className="absolute inset-y-0 left-0 rounded-lg animate-progress flex items-center justify-end pr-2"
                              style={{
                                width: `${skill.score}%`,
                                background: skill.score >= skill.benchmark
                                  ? "var(--gradient-primary)"
                                  : "linear-gradient(90deg, #f59e0b, #fbbf24)",
                              }}
                            >
                              <span className="text-[10px] font-bold text-white">{skill.score}</span>
                            </div>
                          </div>
                          <span className="w-12 text-xs text-right" style={{ color: "var(--text-tertiary)" }}>
                            Avg: {skill.benchmark}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ResumeScoreCard score={profile.resumeScore} />
                </div>
              )}

              {/* Jobs Tab */}
              {activeTab === "jobs" && (
                <div className="space-y-6">
                  <JobMatching jobs={filteredJobs} />
                </div>
              )}

              {/* Risk Tab */}
              {activeTab === "risk" && (
                <div className="space-y-6">
                  <AIRiskAnalysis data={riskAnalysis} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PlacementTimeline steps={placementTimeline} />
                    <RecommendationsPanel recommendations={filteredRecommendations} />
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === "reports" && (
                <div className="space-y-6">
                  <ReportSummaryCard profile={profile} riskData={riskAnalysis} />
                </div>
              )}
            </>
          )}

          {activeNav === "profile" && (
            <EditableProfile profile={profile} onSave={setProfile} />
          )}

          {activeNav === "skills" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Skills & Competencies</h2>
              <div className="card-premium p-6 animate-fade-in">
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Skill Profile vs Industry Benchmark</h2>
                <div className="space-y-4">
                  {skillRadarData.map((skill, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-28 text-sm font-medium text-right" style={{ color: "var(--text-secondary)" }}>
                        {skill.skill}
                      </span>
                      <div className="flex-1 relative h-7 rounded-lg overflow-hidden" style={{ background: "#f1f5f9" }}>
                        {/* Benchmark */}
                        <div
                          className="absolute top-0 h-full w-0.5 z-10"
                          style={{ left: `${skill.benchmark}%`, background: "#94a3b8" }}
                        />
                        {/* Score bar */}
                        <div
                          className="absolute inset-y-0 left-0 rounded-lg animate-progress flex items-center justify-end pr-2"
                          style={{
                            width: `${skill.score}%`,
                            background: skill.score >= skill.benchmark
                              ? "var(--gradient-primary)"
                              : "linear-gradient(90deg, #f59e0b, #fbbf24)",
                          }}
                        >
                          <span className="text-[10px] font-bold text-white">{skill.score}</span>
                        </div>
                      </div>
                      <span className="w-12 text-xs text-right" style={{ color: "var(--text-tertiary)" }}>
                        Avg: {skill.benchmark}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <ResumeScoreCard score={profile.resumeScore} />
            </div>
          )}

          {activeNav === "courses" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Course Analytics</h2>
              <CoursePerformance
                courseData={coursePerformanceData}
                deptData={departmentComparison}
                skillData={skillRadarData}
              />
            </div>
          )}

          {activeNav === "jobs" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Job Opportunities</h2>
              <JobMatching jobs={filteredJobs} />
            </div>
          )}

          {activeNav === "internships" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Internships</h2>
              <JobMatching jobs={filteredJobs} />
            </div>
          )}

          {activeNav === "assessments" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Assessments & Timeline</h2>
              <PlacementTimeline steps={placementTimeline} />
            </div>
          )}

          {activeNav === "risk" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Placement Risk Analysis</h2>
              <AIRiskAnalysis data={riskAnalysis} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PlacementTimeline steps={placementTimeline} />
                <RecommendationsPanel recommendations={filteredRecommendations} />
              </div>
            </div>
          )}

          {activeNav === "recommendations" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Next Best Actions</h2>
              <RecommendationsPanel recommendations={filteredRecommendations} />
            </div>
          )}

          {activeNav === "reports" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Reports</h2>
              <ReportSummaryCard profile={profile} riskData={riskAnalysis} />
            </div>
          )}

          {activeNav === "market" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Industry & Labor Market</h2>
              <LaborMarketPanel />
            </div>
          )}

          {activeNav === "lender" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Lender Intelligence View</h2>
              <LenderDashboard />
            </div>
          )}

          {activeNav === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Settings</h2>
              <div className="card-premium p-6">
                <p style={{ color: "var(--text-secondary)" }}>User preferences and account settings would go here.</p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}

/* ─── Sub-components for specific tabs ─────────────── */

function AcademicInfoCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="card-premium p-6 animate-fade-in">
      <h3 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
            style={{ borderColor: "var(--card-border)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {item.label}
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportSummaryCard({
  profile,
  riskData,
}: {
  profile: { name: string; registrationId: string; department: string; batch: string; campus: string; cgpa: number; resumeScore: number; status: string; [key: string]: unknown };
  riskData: typeof riskAnalysis;
}) {
  return (
    <div className="card-premium overflow-hidden animate-fade-in">
      {/* Report Header */}
      <div
        className="px-6 py-5"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Career Intelligence Report</h2>
            <p className="text-xs text-indigo-200 mt-0.5">
              Generated on {profile.lastUpdated}
            </p>
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-white/20 text-white transition-colors hover:bg-white/30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Student Summary */}
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            Student Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Name", value: profile.name },
              { label: "Department", value: profile.department },
              { label: "CGPA", value: String(profile.cgpa) },
              { label: "Status", value: profile.status },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>{item.label}</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Outputs */}
        <div className="border-t pt-5" style={{ borderColor: "var(--card-border)" }}>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            Prediction Model Outputs
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "3-Month Placement", value: "72%", color: "var(--blue-600)" },
              { label: "6-Month Placement", value: "88%", color: "var(--emerald-600)" },
              { label: "12-Month Placement", value: "95%", color: "var(--purple-500)" },
              { label: "Risk Score", value: `${riskData.score}/100`, color: "var(--amber-500)" },
              { label: "Expected Salary", value: "₹8.5 LPA", color: "var(--cyan-500)" },
              { label: "Model Confidence", value: `${riskData.confidence}%`, color: "var(--indigo-600)" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{item.label}</p>
                <p className="text-xl font-bold mt-0.5 number-display" style={{ color: item.color }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Drivers */}
        <div className="border-t pt-5" style={{ borderColor: "var(--card-border)" }}>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            Risk Drivers & Feature Importance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: "var(--emerald-600)" }}>Positive Factors</p>
              {riskData.positiveFactors.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>{f.label}</span>
                  <span className="font-semibold" style={{ color: "var(--emerald-600)" }}>+{f.impact}%</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: "var(--rose-500)" }}>Negative Factors</p>
              {riskData.negativeFactors.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>{f.label}</span>
                  <span className="font-semibold" style={{ color: "var(--rose-500)" }}>{f.impact}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div
          className="rounded-xl p-4 border-t"
          style={{ background: "var(--indigo-50)", borderColor: "var(--card-border)" }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--indigo-600)" }}>
            AI Summary
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {riskData.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
