import { cn } from "@/lib/utils";
import { type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ className, options, placeholder, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white transition-all duration-200 focus:border-blue-400/50 focus:outline-none focus:ring-1 focus:ring-blue-400/30 appearance-none cursor-pointer",
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" className="bg-black text-white/50">
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-black text-white">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
