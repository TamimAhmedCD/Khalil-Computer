"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

// Simple Context for Sidebar
const SidebarContext = createContext({
  isCollapsed: false,
  toggleSidebar: () => {},
});

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

// Main Provider
export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-collapsed");
      return saved === "true";
    }
    return false;
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar-collapsed", newState.toString());
      }
      return newState;
    });
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
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
        "hidden md:flex flex-col h-screen border-r bg-white z-10 transition-all duration-300 ease-in-out",
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
    <div className={cn("p-4 border-b", className)}>
      <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
        {children}
      </div>
    </div>
  );
}

// Sidebar Content
export function SidebarContent({ children, className }) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-2", className)}>
      {children}
    </div>
  );
}

// Sidebar Footer
export function SidebarFooter({ children, className }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className={cn("p-2 border-t", className)}>
      <div className={isCollapsed ? "flex justify-center" : ""}>
        {children}
      </div>
    </div>
  );
}

// Sidebar Trigger Button
export function SidebarTrigger({ className }) {
  const { toggleSidebar, isCollapsed } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "h-8 w-8 flex items-center justify-center rounded-md border bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
        className
      )}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
        className={isCollapsed ? "rotate-180" : ""}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </button>
  );
}

// Menu Button Component
export function SidebarMenuButton({
  children,
  className,
  icon,
  title,
  href,
  active = false,
  showText = true,
  onClick,
}) {
  const { isCollapsed } = useSidebar();

  const content = (
    <>
      {icon && (
        <span className={cn("flex-shrink-0", isCollapsed ? "" : "mr-3")}>
          {icon}
        </span>
      )}
      {!isCollapsed && showText && <span className="truncate">{children}</span>}
      {isCollapsed && (
        <div className="absolute left-full ml-2 hidden group-hover:block bg-popover text-popover-foreground rounded-md px-2 py-1 text-xs shadow-md border whitespace-nowrap z-50">
          {title || children}
        </div>
      )}
    </>
  );

  const buttonClasses = cn(
    "w-full flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors relative group",
    active
      ? "bg-accent text-accent-foreground"
      : "hover:bg-accent hover:text-accent-foreground",
    isCollapsed && "justify-center",
    className
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
