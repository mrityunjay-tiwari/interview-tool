// components/layout/container.tsx
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto px-4 md:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
