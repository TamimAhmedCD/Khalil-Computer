"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function SimpleNavMain({ items }) {
  const pathName = usePathname();
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="space-y-1">
      <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Management
      </div>
      {items.map((item) => {
        const isActive = pathName === item.url || item.items?.some((sub) => pathName === sub.url);
        const isOpen = openGroups[item.title] || isActive;

        return (
          <div key={item.title} className="group">
            <button
              onClick={() => toggleGroup(item.title)}
              className={cn(
                "w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon && (
                <item.icon className="h-4 w-4 flex-shrink-0" />
              )}
              <span className="flex-1 text-left">{item.title}</span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform duration-200 flex-shrink-0",
                  isOpen && "rotate-90"
                )}
              />
            </button>

            {isOpen && item.items && (
              <div className="mt-1 ml-4 space-y-0.5 border-l pl-4">
                {item.items.map((subItem) => {
                  const isSubActive = pathName === subItem.url;
                  return (
                    <Link
                      key={subItem.title}
                      href={subItem.url}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                        isSubActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60"></span>
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
