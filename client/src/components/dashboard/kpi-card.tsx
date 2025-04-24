import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  previousValue: string;
  type: "revenue" | "profit" | "roas" | "customers";
}

export function KPICard({ title, value, change, previousValue, type }: KPICardProps) {
  const isPositive = change >= 0;
  
  // Color schemes for different card types
  const barColors = {
    revenue: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      highlight: "bg-emerald-500 dark:bg-emerald-500",
    },
    profit: {
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      highlight: "bg-indigo-500 dark:bg-indigo-500",
    },
    roas: {
      bg: "bg-sky-100 dark:bg-sky-900/30",
      highlight: "bg-sky-500 dark:bg-sky-500",
    },
    customers: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      highlight: "bg-purple-500 dark:bg-purple-500",
    },
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
        <span className={cn(
          "flex items-center text-xs font-medium",
          isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
        )}>
          {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
          {Math.abs(change)}%
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">{value}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">vs {previousValue} last month</div>
        </div>
        <div className="h-12 w-24 flex items-end">
          <div className={cn("h-6 w-3 rounded-sm mx-0.5", barColors[type].bg)}></div>
          <div className={cn("h-8 w-3 rounded-sm mx-0.5", barColors[type].bg)}></div>
          <div className={cn("h-5 w-3 rounded-sm mx-0.5", barColors[type].bg)}></div>
          <div className={cn("h-9 w-3 rounded-sm mx-0.5", barColors[type].bg)}></div>
          <div className={cn("h-7 w-3 rounded-sm mx-0.5", barColors[type].bg)}></div>
          <div className={cn("h-12 w-3 rounded-sm mx-0.5", barColors[type].highlight)}></div>
        </div>
      </div>
    </div>
  );
}
