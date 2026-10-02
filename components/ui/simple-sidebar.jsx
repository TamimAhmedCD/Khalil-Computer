"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

// Simple Context for Sidebar
const SidebarContext = createContext({});

export function useSidebar() {
  return useContext(SidebarContext) || {};
}

// Main Provider
export function SidebarProvider({ children }) {
  return (
    <SidebarContext.Provider value={{}}>
      {children}
    </SidebarContext.Provider>
  );
}

// Main Sidebar Component
export function SimpleSidebar({ children, className }) {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen border-r bg-white z-10 w-64",
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
  return (
    <div className={cn("p-4 border-b", className)}>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}

// Sidebar Content
export function SidebarContent({ children, className }) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-2", className)}>{children}</div>
  );
}

// Sidebar Footer
export function SidebarFooter({ children, className }) {
  return (
    <div className={cn("p-2 border-t", className)}>
      <div>{children}</div>
    </div>
  );
}

// Sidebar Trigger Button (placeholder for compatibility)
export function SidebarTrigger({ className }) {
  return null;
}

// Menu Button Component
export function SidebarMenuButton({
  children,
  className,
  icon,
  href,
  active = false,
  onClick,
}) {
  const buttonClasses = cn(
    "w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
    active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
    className
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
      </a>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
}
