import { cn } from "@/lib/utils";
import { type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/30 transition-all duration-200 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/30 resize-y min-h-[100px]",
        className
      )}
      {...props}
    />
  );
}
