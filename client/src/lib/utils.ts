import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getStatusColor(status: string, isDark: boolean = false): string {
  const colors = {
    'Active': isDark 
      ? 'bg-emerald-900/30 text-emerald-400' 
      : 'bg-emerald-100 text-emerald-800',
    'Warning': isDark 
      ? 'bg-amber-900/30 text-amber-400' 
      : 'bg-amber-100 text-amber-800',
    'Paused': isDark 
      ? 'bg-blue-900/30 text-blue-400' 
      : 'bg-blue-100 text-blue-800',
    'Stopped': isDark 
      ? 'bg-red-900/30 text-red-400' 
      : 'bg-red-100 text-red-800',
    'Completed': isDark 
      ? 'bg-emerald-900/30 text-emerald-400' 
      : 'bg-emerald-100 text-emerald-800',
    'Todo': isDark 
      ? 'bg-slate-900/30 text-slate-400' 
      : 'bg-slate-100 text-slate-800',
    'InProgress': isDark 
      ? 'bg-blue-900/30 text-blue-400' 
      : 'bg-blue-100 text-blue-800',
    'Review': isDark 
      ? 'bg-purple-900/30 text-purple-400' 
      : 'bg-purple-100 text-purple-800',
  };
  
  return colors[status as keyof typeof colors] || (isDark 
    ? 'bg-slate-900/30 text-slate-400' 
    : 'bg-slate-100 text-slate-800');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
}

export function isTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
}
