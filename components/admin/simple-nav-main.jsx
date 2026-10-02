"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useSidebar } from "@/components/ui/simple-sidebar";

export function SimpleNavMain({ items }) {
  const pathName = usePathname();
  const { isCollapsed } = useSidebar();
  const [openGroups, setOpenGroups] = useState({});

  // Close all groups when sidebar collapses
  useEffect(() => {
    if (isCollapsed) {
      setOpenGroups({});
    }
  }, [isCollapsed]);

  const toggleGroup = (title) => {
    if (isCollapsed) return;
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Auto-open group if a child is active
  useEffect(() => {
    const newOpenGroups = {};
    items.forEach((item) => {
      if (item.items?.some((sub) => pathName === sub.url)) {
        newOpenGroups[item.title] = true;
      }
    });
    setOpenGroups(newOpenGroups);
  }, [pathName, items]);

  return (
    <div className="space-y-1">
      {!isCollapsed && (
        <div className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Management
        </div>
      )}
      {items.map((item) => {
        const isActive = pathName === item.url || item.items?.some((sub) => pathName === sub.url);
        const isOpen = openGroups[item.title] || (isActive && !isCollapsed);

        // For collapsed state, show just the icon as a button
        if (isCollapsed) {
          const hasActiveSub = item.items?.some((sub) => pathName === sub.url);
          return (
            <div key={item.title} className="relative">
              <button
                onClick={() => toggleGroup(item.title)}
                className={cn(
                  "w-full flex items-center justify-center rounded-lg p-2.5 transition-all duration-200",
                  isActive || hasActiveSub
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                )}
                title={item.title}
              >
                {item.icon && (
                  <item.icon className="h-4 w-4" />
                )}
              </button>

              {/* Tooltip for collapsed state */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.title}
              </div>
            </div>
          );
        }

        // Expanded state
        return (
          <div key={item.title} className="group">
            <button
              onClick={() => toggleGroup(item.title)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {item.icon && (
                <item.icon className="h-4 w-4 flex-shrink-0" />
              )}
              <span className="flex-1 text-left">{item.title}</span>
              {item.items && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 flex-shrink-0",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </button>

            {isOpen && item.items && (
              <div className="mt-1 ml-2 space-y-0.5 pl-1 border-l border-slate-200 dark:border-slate-700">
                {item.items.map((subItem) => {
                  const isSubActive = pathName === subItem.url;
                  return (
                    <Link
                      key={subItem.title}
                      href={subItem.url}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200",
                        isSubActive
                          ? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 font-medium pl-3"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:pl-3"
                      )}
                    >
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full transition-all duration-200",
                        isSubActive
                          ? "bg-primary-500 scale-125"
                          : "bg-slate-400 dark:bg-slate-500 opacity-60 group-hover:bg-slate-500 group-hover:scale-125"
                      )}></span>
                      <span>{subItem.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
