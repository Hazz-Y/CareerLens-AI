"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  MessageSquare,
  Settings,
  ChevronDown,
  Plus,
  X,
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
}

interface NavbarProps {
  notifications: Notification[];
  studentName: string;
  avatarInitials: string;
  sidebarCollapsed?: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Navbar({
  notifications,
  studentName,
  avatarInitials,
  sidebarCollapsed,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 border-b"
      style={{
        background: "var(--navbar-bg)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--navbar-border)",
      }}
    >
      {/* Left — Breadcrumb */}
      <div className="flex items-center gap-2 lg:hidden">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ background: "var(--gradient-primary)" }}
        >
          <span className="text-white font-bold text-xs">CL</span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-1.5 text-sm">
        <span style={{ color: "var(--text-tertiary)" }}>Home</span>
        <span style={{ color: "var(--text-tertiary)" }}>/</span>
        <span className="font-medium" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </span>
      </div>

      {/* Center — Search */}
      <div className="flex-1 max-w-xl mx-4">
        <div
          className="relative flex items-center rounded-xl transition-all"
          style={{
            background: searchOpen ? "white" : "#f1f5f9",
            border: searchOpen ? "1px solid var(--indigo-300)" : "1px solid transparent",
            boxShadow: searchOpen ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
          }}
        >
          <Search
            size={16}
            className="absolute left-3"
            style={{ color: "var(--text-tertiary)" }}
          />
          <input
            type="text"
            placeholder="Search dashboard, reports, jobs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => {
              if (!searchQuery) setSearchOpen(false);
            }}
            className="w-full py-2.5 pl-10 pr-10 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange("");
                setSearchOpen(false);
              }}
              className="absolute right-3"
            >
              <X size={14} style={{ color: "var(--text-tertiary)" }} />
            </button>
          )}
          {!searchQuery && (
            <kbd
              className="absolute right-3 hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium"
              style={{
                background: "white",
                border: "1px solid var(--card-border)",
                color: "var(--text-tertiary)",
              }}
            >
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Quick Action */}
        <button
          className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Plus size={15} />
          <span>Quick Action</span>
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            className="relative p-2.5 rounded-xl transition-colors hover:bg-gray-100"
          >
            <Bell size={18} style={{ color: "var(--text-secondary)" }} />
            {unreadCount > 0 && (
              <span
                className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: "var(--rose-500)" }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-12 w-80 rounded-xl border overflow-hidden animate-scale-in"
              style={{
                background: "white",
                borderColor: "var(--card-border)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "var(--card-border)" }}>
                <span className="font-semibold text-sm">Notifications</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: "var(--indigo-50)", color: "var(--indigo-600)" }}
                >
                  {unreadCount} new
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 cursor-pointer"
                    style={{
                      background: n.read ? undefined : "var(--indigo-50)",
                    }}
                  >
                    <div
                      className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: n.read ? "transparent" : "var(--indigo-500)",
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                        {n.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full py-2.5 text-xs font-medium border-t transition-colors hover:bg-gray-50"
                style={{ color: "var(--indigo-600)", borderColor: "var(--card-border)" }}
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="hidden md:block p-2.5 rounded-xl transition-colors hover:bg-gray-100">
          <MessageSquare size={18} style={{ color: "var(--text-secondary)" }} />
        </button>

        {/* Settings */}
        <button className="hidden md:block p-2.5 rounded-xl transition-colors hover:bg-gray-100">
          <Settings size={18} style={{ color: "var(--text-secondary)" }} />
        </button>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 mx-1" style={{ background: "var(--card-border)" }} />

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl transition-colors hover:bg-gray-100"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              {avatarInitials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium leading-none" style={{ color: "var(--text-primary)" }}>
                {studentName}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                Student
              </p>
            </div>
            <ChevronDown size={14} className="hidden md:block" style={{ color: "var(--text-tertiary)" }} />
          </button>

          {profileOpen && (
            <div
              className="absolute right-0 top-12 w-48 rounded-xl border overflow-hidden animate-scale-in"
              style={{
                background: "white",
                borderColor: "var(--card-border)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
            >
              {["View Profile", "Account Settings", "Help Center", "Sign Out"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
                  style={{
                    color: item === "Sign Out" ? "var(--rose-500)" : "var(--text-primary)",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
