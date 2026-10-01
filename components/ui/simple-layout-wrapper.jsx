import { cn } from "@/lib/utils";

export function SimpleLayoutWrapper({ children, className }) {
  return (
    <div className={cn("flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto", className)}>
      {children}
    </div>
  );
}
