import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white/5 border border-white/10 p-6",
        className
      )}
      {...props}
    />
  );
}
