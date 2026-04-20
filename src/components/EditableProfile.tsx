"use client";

import { useState } from "react";
import {
  Save,
  X,
  Pencil,
  User,
  GraduationCap,
  Mail,
  Phone,
  Building2,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  FileText,
  CheckCircle2,
} from "lucide-react";

export interface StudentProfileData {
  name: string;
  registrationId: string;
  department: string;
  batch: string;
  campus: string;
  email: string;
  phone: string;
  cgpa: number;
  status: string;
  lastUpdated: string;
  avatarInitials: string;
  completedCredits: number;
  totalCredits: number;
  resumeScore: number;
}

interface EditableProfileProps {
  profile: StudentProfileData;
  onSave: (updated: StudentProfileData) => void;
}

const fieldGroups = [
  {
    title: "Personal Information",
    icon: User,
    fields: [
      { key: "name", label: "Full Name", type: "text", icon: User },
      { key: "email", label: "Email Address", type: "email", icon: Mail },
      { key: "phone", label: "Phone Number", type: "tel", icon: Phone },
      { key: "registrationId", label: "Registration ID", type: "text", icon: FileText },
    ],
  },
  {
    title: "Academic Details",
    icon: GraduationCap,
    fields: [
      { key: "department", label: "Department", type: "select", icon: BookOpen, options: [
        "Computer Science & Engineering",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering",
        "Information Technology",
        "MBA",
        "Nursing",
        "Data Science",
      ]},
      { key: "batch", label: "Batch", type: "text", icon: Calendar },
      { key: "campus", label: "Campus", type: "text", icon: MapPin },
      { key: "cgpa", label: "CGPA", type: "number", icon: Award, step: "0.01", min: "0", max: "10" },
      { key: "completedCredits", label: "Completed Credits", type: "number", icon: CheckCircle2 },
      { key: "totalCredits", label: "Total Credits", type: "number", icon: BookOpen },
    ],
  },
  {
    title: "Status & Scores",
    icon: Award,
    fields: [
      { key: "status", label: "Placement Status", type: "select", icon: Award, options: [
        "Placement Ready",
        "Needs Improvement",
        "High Risk",
        "Placed",
        "Interview Stage",
      ]},
      { key: "resumeScore", label: "Resume Score", type: "number", icon: FileText, min: "0", max: "100" },
    ],
  },
];

export default function EditableProfile({ profile, onSave }: EditableProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<StudentProfileData>({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string | number) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const initials = draft.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const now = new Date();
    const updated = {
      ...draft,
      avatarInitials: initials,
      lastUpdated: now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + ", " + now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    onSave(updated);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Edit/Save buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          My Profile
        </h2>
        <div className="flex items-center gap-2">
          {saved && (
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium animate-fade-in"
              style={{ background: "#ecfdf5", color: "var(--emerald-600)" }}
            >
              <CheckCircle2 size={14} />
              Profile saved successfully!
            </span>
          )}
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-gray-100"
                style={{ color: "var(--text-secondary)", border: "1px solid var(--card-border)" }}
              >
                <X size={15} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Save size={15} />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Pencil size={15} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Avatar Card */}
      <div className="card-premium overflow-hidden animate-fade-in">
        <div
          className="h-28 relative"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute -bottom-10 left-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white border-4 border-white"
              style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}
            >
              {draft.avatarInitials}
            </div>
          </div>
        </div>
        <div className="pt-14 px-6 pb-5">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {draft.name}
            </h3>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                background:
                  draft.status === "Placement Ready" ? "#ecfdf5" :
                  draft.status === "Placed" ? "var(--indigo-50)" :
                  draft.status === "Needs Improvement" ? "#fffbeb" : "#fef2f2",
                color:
                  draft.status === "Placement Ready" ? "var(--emerald-600)" :
                  draft.status === "Placed" ? "var(--indigo-600)" :
                  draft.status === "Needs Improvement" ? "var(--amber-500)" : "var(--rose-500)",
              }}
            >
              {draft.status}
            </span>
          </div>
          <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
            {draft.department} · {draft.batch} · {draft.campus}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
            Last updated: {draft.lastUpdated}
          </p>
        </div>
      </div>

      {/* Field Groups */}
      {fieldGroups.map((group, gi) => (
        <div key={gi} className="card-premium p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: gi === 0 ? "var(--gradient-card-blue)" : gi === 1 ? "var(--gradient-card-purple)" : "var(--gradient-card-emerald)" }}
            >
              <group.icon size={16} className="text-white" />
            </div>
            <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              {group.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.fields.map((field) => {
              const value = draft[field.key as keyof StudentProfileData];
              const FieldIcon = field.icon;
              return (
                <div key={field.key}>
                  <label
                    className="flex items-center gap-1.5 text-xs font-medium mb-1.5"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <FieldIcon size={12} />
                    {field.label}
                  </label>
                  {isEditing ? (
                    field.type === "select" ? (
                      <select
                        value={String(value)}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "white",
                          border: "1px solid var(--indigo-200)",
                          color: "var(--text-primary)",
                          boxShadow: "0 0 0 3px rgba(99,102,241,0.06)",
                        }}
                      >
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={value}
                        onChange={(e) =>
                          handleChange(
                            field.key,
                            field.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value
                          )
                        }
                        step={field.step}
                        min={field.min}
                        max={field.max}
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "white",
                          border: "1px solid var(--indigo-200)",
                          color: "var(--text-primary)",
                          boxShadow: "0 0 0 3px rgba(99,102,241,0.06)",
                        }}
                      />
                    )
                  ) : (
                    <div
                      className="w-full px-3 py-2.5 rounded-xl text-sm"
                      style={{
                        background: "#f8fafc",
                        border: "1px solid var(--card-border)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {String(value)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
