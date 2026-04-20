// ─── Student Profile ───────────────────────────────
export const studentProfile = {
  name: "Arjun Mehta",
  registrationId: "STU-2024-0847",
  department: "Computer Science & Engineering",
  batch: "2021–2025",
  campus: "Pune Main Campus",
  email: "arjun.mehta@university.edu",
  phone: "+91 98765 43210",
  cgpa: 8.42,
  status: "Placement Ready" as const, // "Placement Ready" | "Needs Improvement" | "High Risk"
  lastUpdated: "20 Apr 2026, 3:45 PM",
  avatarInitials: "AM",
  completedCredits: 156,
  totalCredits: 180,
  resumeScore: 78,
};

// ─── KPI Cards ─────────────────────────────────────
export const kpiCards = [
  {
    id: "prob-3m",
    title: "3-Month Placement",
    value: 72,
    suffix: "%",
    trend: +4.2,
    explanation: "Based on current skill profile and market demand",
    sparkline: [45, 52, 58, 60, 65, 68, 72],
    gradient: "var(--gradient-card-blue)",
    icon: "TrendingUp",
  },
  {
    id: "prob-6m",
    title: "6-Month Placement",
    value: 88,
    suffix: "%",
    trend: +2.8,
    explanation: "Strong probability with upcoming recruitment drives",
    sparkline: [60, 68, 72, 78, 82, 85, 88],
    gradient: "var(--gradient-card-emerald)",
    icon: "Target",
  },
  {
    id: "prob-12m",
    title: "12-Month Placement",
    value: 95,
    suffix: "%",
    trend: +1.1,
    explanation: "Near-certain with sustained effort and market trends",
    sparkline: [78, 82, 85, 88, 91, 93, 95],
    gradient: "var(--gradient-card-purple)",
    icon: "Award",
  },
  {
    id: "salary",
    title: "Expected Salary",
    value: 8.5,
    prefix: "₹",
    suffix: " LPA",
    trend: +12.5,
    explanation: "Median for CS graduates with similar profiles",
    sparkline: [5.2, 6.0, 6.8, 7.2, 7.8, 8.1, 8.5],
    gradient: "var(--gradient-card-cyan)",
    icon: "IndianRupee",
  },
  {
    id: "risk",
    title: "Risk Score",
    value: 24,
    suffix: "/100",
    trend: -6.3,
    explanation: "Lower is better — risk has decreased this month",
    sparkline: [45, 40, 38, 34, 30, 28, 24],
    gradient: "var(--gradient-card-amber)",
    icon: "ShieldAlert",
  },
  {
    id: "readiness",
    title: "Readiness Score",
    value: 82,
    suffix: "/100",
    trend: +5.7,
    explanation: "Composite of skills, projects, certifications & interviews",
    sparkline: [55, 60, 65, 70, 74, 78, 82],
    gradient: "var(--gradient-card-blue)",
    icon: "Gauge",
  },
];

// ─── AI Risk Analysis ──────────────────────────────
export const riskAnalysis = {
  level: "Low" as const,
  score: 24,
  confidence: 89,
  summary:
    "Arjun's profile shows strong placement readiness. Low internship exposure and weak recruiter activity in cloud computing are minor concerns, but strong fundamentals and project portfolio compensate well.",
  positiveFactors: [
    { label: "Strong CGPA (8.42)", impact: 92, icon: "GraduationCap" },
    { label: "3 completed projects", impact: 85, icon: "FolderGit2" },
    { label: "DSA proficiency rated high", impact: 88, icon: "Code2" },
    { label: "2 technical certifications", impact: 76, icon: "BadgeCheck" },
  ],
  negativeFactors: [
    { label: "No formal internship", impact: -65, icon: "Building2" },
    { label: "Low recruiter visibility", impact: -42, icon: "Eye" },
    { label: "Missing cloud skills", impact: -38, icon: "Cloud" },
  ],
  topReasons: [
    "Limited industry experience through internships",
    "Recruiter engagement in target domain is below average this quarter",
    "Cloud & DevOps skills are increasingly demanded but not reflected in profile",
  ],
};

// ─── Recommendations ───────────────────────────────
export const recommendations = [
  {
    id: 1,
    icon: "FileText",
    title: "Enhance Your Resume",
    reason: "Current resume score is 78/100 — adding quantified achievements can push it to 90+",
    impact: "High",
    time: "2 hours",
    category: "Resume",
  },
  {
    id: 2,
    icon: "Cloud",
    title: "Complete AWS Cloud Practitioner",
    reason: "85% of target companies require basic cloud knowledge",
    impact: "High",
    time: "3 weeks",
    category: "Certification",
  },
  {
    id: 3,
    icon: "Users",
    title: "Schedule Mock Interviews",
    reason: "Students with 3+ mock interviews have 40% higher placement rate",
    impact: "Medium",
    time: "1 week",
    category: "Interview",
  },
  {
    id: 4,
    icon: "Laptop",
    title: "Build a Full-Stack Project",
    reason: "Demonstrates end-to-end development ability — top recruiter preference",
    impact: "High",
    time: "4 weeks",
    category: "Project",
  },
  {
    id: 5,
    icon: "Building2",
    title: "Apply for Summer Internships",
    reason: "Internship experience is the strongest predictor of early placement",
    impact: "Critical",
    time: "Ongoing",
    category: "Internship",
  },
];

// ─── Job Matches ───────────────────────────────────
export const jobMatches = [
  {
    id: 1,
    company: "Infosys",
    role: "Software Engineer",
    match: 92,
    salary: "₹6.5–8.2 LPA",
    location: "Pune, Bangalore",
    urgency: "Hiring Now",
    logo: "I",
    color: "#0066cc",
  },
  {
    id: 2,
    company: "TCS Digital",
    role: "Full Stack Developer",
    match: 87,
    salary: "₹7.0–9.5 LPA",
    location: "Mumbai, Hyderabad",
    urgency: "Closing Soon",
    logo: "T",
    color: "#1a1a2e",
  },
  {
    id: 3,
    company: "Wipro Elite",
    role: "Cloud Engineer",
    match: 74,
    salary: "₹5.5–7.0 LPA",
    location: "Bangalore",
    urgency: "Open",
    logo: "W",
    color: "#5c2d91",
  },
  {
    id: 4,
    company: "Accenture",
    role: "Associate Software Engineer",
    match: 89,
    salary: "₹6.0–8.0 LPA",
    location: "Pune, Chennai",
    urgency: "Hiring Now",
    logo: "A",
    color: "#a100ff",
  },
  {
    id: 5,
    company: "Cognizant GenC",
    role: "Programmer Analyst",
    match: 81,
    salary: "₹5.8–7.5 LPA",
    location: "Chennai, Coimbatore",
    urgency: "Open",
    logo: "C",
    color: "#0033a0",
  },
];

// ─── Timeline / Placement Progress ─────────────────
export const placementTimeline = [
  { step: "Resume Updated", completed: true, date: "12 Mar 2026" },
  { step: "Skill Assessment Completed", completed: true, date: "28 Mar 2026" },
  { step: "Internship Completed", completed: false, date: null },
  { step: "Mock Interview Done", completed: true, date: "15 Apr 2026" },
  { step: "Shortlisted by Recruiter", completed: false, date: null },
  { step: "Placed", completed: false, date: null },
];

// ─── Course / Institute Performance ────────────────
export const coursePerformanceData = [
  { month: "Oct", placementRate: 62, salaryAvg: 5.8, recruiterCount: 12 },
  { month: "Nov", placementRate: 65, salaryAvg: 6.1, recruiterCount: 15 },
  { month: "Dec", placementRate: 70, salaryAvg: 6.4, recruiterCount: 18 },
  { month: "Jan", placementRate: 74, salaryAvg: 6.8, recruiterCount: 22 },
  { month: "Feb", placementRate: 78, salaryAvg: 7.2, recruiterCount: 25 },
  { month: "Mar", placementRate: 82, salaryAvg: 7.6, recruiterCount: 28 },
  { month: "Apr", placementRate: 85, salaryAvg: 8.0, recruiterCount: 30 },
];

export const departmentComparison = [
  { dept: "CSE", rate: 92, avgSalary: 8.5 },
  { dept: "ECE", rate: 78, avgSalary: 6.8 },
  { dept: "ME", rate: 65, avgSalary: 5.4 },
  { dept: "EE", rate: 72, avgSalary: 6.2 },
  { dept: "Civil", rate: 58, avgSalary: 4.8 },
  { dept: "IT", rate: 88, avgSalary: 7.9 },
];

export const skillRadarData = [
  { skill: "DSA", score: 88, benchmark: 70 },
  { skill: "System Design", score: 62, benchmark: 65 },
  { skill: "Web Dev", score: 80, benchmark: 72 },
  { skill: "Database", score: 75, benchmark: 68 },
  { skill: "Cloud", score: 40, benchmark: 60 },
  { skill: "ML/AI", score: 55, benchmark: 50 },
  { skill: "Communication", score: 72, benchmark: 70 },
];

// ─── Sidebar Navigation Items ──────────────────────
export const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "profile", label: "Profile", icon: "UserCircle" },
  { id: "skills", label: "Skills", icon: "Sparkles" },
  { id: "courses", label: "Courses", icon: "BookOpen" },
  { id: "jobs", label: "Jobs", icon: "Briefcase" },
  { id: "internships", label: "Internships", icon: "Building2" },
  { id: "assessments", label: "Assessments", icon: "ClipboardCheck" },
  { id: "risk", label: "Placement Risk", icon: "ShieldAlert" },
  { id: "recommendations", label: "Recommendations", icon: "Lightbulb" },
  { id: "market", label: "Labor Market", icon: "Activity" },
  { id: "lender", label: "Lender View", icon: "Landmark" },
  { id: "reports", label: "Reports", icon: "BarChart3" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

// ─── Notification data ─────────────────────────────
export const notifications = [
  { id: 1, title: "New job match: TCS Digital", time: "2h ago", read: false },
  { id: 2, title: "Risk score decreased by 6 points", time: "5h ago", read: false },
  { id: 3, title: "Mock interview feedback ready", time: "1d ago", read: true },
  { id: 4, title: "AWS certification deadline approaching", time: "2d ago", read: true },
];
