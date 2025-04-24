import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Database, 
  Bot, 
  LineChart, 
  CircleDollarSign, 
  Users, 
  Headphones, 
  FileText, 
  ListTodo, 
  Users2, 
  Settings, 
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useDashboard } from '@/context/dashboard-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [location] = useLocation();
  const { activeBrand, setActiveBrand, brands } = useDashboard();

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 w-64 transition-all duration-300 transform bg-white dark:bg-slate-900 shadow-md overflow-y-auto z-10",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Brand Logo */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-secondary-600">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-lg font-semibold dark:text-white">BaytBrands</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Brand Selector */}
        <div className="mt-4">
          <Select value={activeBrand} onValueChange={setActiveBrand}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.code}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="px-4 py-2">
        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 py-2">
          Overview
        </div>
        <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" active={location === "/"} />
        <NavItem to="/pl-tracker" icon={<Database size={18} />} label="P&L Tracker" active={location === "/pl-tracker"} />
        <NavItem to="/ai-agents" icon={<Bot size={18} />} label="AI Agents" active={location === "/ai-agents"} />
        <NavItem to="/ad-optimizer" icon={<LineChart size={18} />} label="Ad Optimizer" active={location === "/ad-optimizer"} />
        <NavItem to="/pmf-tracker" icon={<CircleDollarSign size={18} />} label="PMF Tracker" active={location === "/pmf-tracker"} />
        
        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pt-4 pb-2">
          Operations
        </div>
        <NavItem to="/customer-memory" icon={<Users size={18} />} label="Customer Memory" active={location === "/customer-memory"} />
        <NavItem to="/support-monitoring" icon={<Headphones size={18} />} label="Support Monitoring" active={location === "/support-monitoring"} />
        <NavItem to="/content-seo" icon={<FileText size={18} />} label="Content & SEO" active={location === "/content-seo"} />
        <NavItem to="/project-tracker" icon={<ListTodo size={18} />} label="Project Tracker" active={location === "/project-tracker"} />
        <NavItem to="/meeting-panel" icon={<Users2 size={18} />} label="Meeting Panel" active={location === "/meeting-panel"} />
        <NavItem to="/kpi-scorecard" icon={<LineChart size={18} />} label="KPI Scorecard" active={location === "/kpi-scorecard"} />
        
        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 pt-4 pb-2">
          Settings
        </div>
        <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" active={location === "/settings"} />
        <NavItem to="/logout" icon={<LogOut size={18} />} label="Logout" active={location === "/logout"} />
      </nav>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function NavItem({ to, icon, label, active }: NavItemProps) {
  return (
    <Link href={to}>
      <div
        className={cn(
          "flex items-center space-x-2 py-2 px-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
          active && "text-secondary-600 font-medium bg-secondary-50 dark:bg-secondary-900/20 dark:text-secondary-400"
        )}
      >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  );
}
