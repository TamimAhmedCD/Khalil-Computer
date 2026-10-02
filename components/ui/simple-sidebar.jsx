"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Sidebar Context with collapse state
const SidebarContext = createContext({
  isCollapsed: false,
  toggleCollapse: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

// Main Provider with collapse functionality
export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapse state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar-collapsed", String(newState));
      return newState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Main Sidebar Component
export function SimpleSidebar({ children, className }) {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen border-r bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-all duration-300 ease-in-out z-10",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      aria-label="Sidebar"
    >
      {children}
    </aside>
  );
}

// Sidebar Header
export function SidebarHeader({ children, className }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className={cn("p-4 border-b bg-white/50 dark:bg-slate-900/50", className)}>
      <div className={cn(
        "flex items-center transition-all duration-300",
        isCollapsed ? "justify-center" : "gap-3"
      )}>
        {children}
      </div>
    </div>
  );
}

// Sidebar Content
export function SidebarContent({ children, className }) {
  return (
    <div className={cn("flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1", className)}>
      {children}
    </div>
  );
}

// Sidebar Footer
export function SidebarFooter({ children, className }) {
  return (
    <div className={cn("p-2 border-t bg-white/50 dark:bg-slate-900/50", className)}>
      {children}
    </div>
  );
}

// Sidebar Trigger Button
export function SidebarTrigger({ className }) {
  const { isCollapsed, toggleCollapse } = useSidebar();

  return (
    <button
      onClick={toggleCollapse}
      className={cn(
        "p-2 rounded-md hover:bg-accent transition-colors",
        className
      )}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "transition-transform duration-300",
          isCollapsed && "rotate-180"
        )}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
        <path d="m14 9 3 3-3 3" />
      </svg>
    </button>
  );
}

// Menu Button Component with modern design
export function SidebarMenuButton({
  children,
  className,
  icon,
  href,
  active = false,
  onClick,
}) {
  const { isCollapsed } = useSidebar();

  const buttonClasses = cn(
    "w-full flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
    active
      ? "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 shadow-sm"
      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
    isCollapsed ? "justify-center" : "gap-3",
    className
  );

  const content = (
    <>
      {icon && (
        <span className="flex-shrink-0 text-current">
          {icon}
        </span>
      )}
      {!isCollapsed && (
        <span className="truncate flex-1 text-left">{children}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {content}
    </button>
  );
}
