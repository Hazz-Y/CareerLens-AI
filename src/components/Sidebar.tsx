"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  UserCircle,
  Sparkles,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardCheck,
  ShieldAlert,
  Lightbulb,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Landmark,
  Activity,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; color?: string; style?: React.CSSProperties }>> = {
  LayoutDashboard,
  UserCircle,
  Sparkles,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardCheck,
  ShieldAlert,
  Lightbulb,
  BarChart3,
  Settings,
  Landmark,
  Activity,
};

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
}

export default function Sidebar({ items, activeItem, onItemClick }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen z-40 transition-all ${collapsed ? "w-[72px]" : "w-[240px]"}`}
        style={{
          background: "var(--sidebar-bg)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center px-4 h-16 border-b border-white/5">
          <img
            src="/logo_xy.png"
            alt="CareerLens AI Logo"
            className={`object-contain bg-white rounded-xl transition-all duration-300 ${collapsed ? "w-10 h-10 p-1" : "h-10 w-auto py-1 px-2"}`}
          />
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`flex items-center gap-3 w-full rounded-xl transition-all ${collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5"}`}
                style={{
                  background: isActive
                    ? "rgba(99, 102, 241, 0.15)"
                    : "transparent",
                  color: isActive ? "#a5b4fc" : "var(--sidebar-text)",
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  size={20}
                  className="flex-shrink-0"
                  color={isActive ? "#818cf8" : "currentColor"}
                />
                {!collapsed && (
                  <span
                    className="text-sm font-medium truncate"
                    style={{ fontWeight: isActive ? 600 : 400 }}
                  >
                    {item.label}
                  </span>
                )}
                {isActive && !collapsed && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: "#818cf8" }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-12 border-t border-white/5 transition-colors hover:bg-white/5"
          style={{ color: "var(--sidebar-text)" }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2 px-1 border-t"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--card-border)",
        }}
      >
        {items.slice(0, 5).map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors"
              style={{
                color: isActive ? "var(--indigo-600)" : "var(--text-tertiary)",
              }}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
