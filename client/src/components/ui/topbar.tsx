import { Bell, Menu, Moon, Bot, Search, Sun } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Avatar, AvatarFallback } from './avatar';
import { useDashboard } from '@/context/dashboard-context';

interface TopbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Topbar({ sidebarOpen, setSidebarOpen }: TopbarProps) {
  const { activeBrand, isDarkMode, toggleDarkMode } = useDashboard();

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white mr-3"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
              {activeBrand} Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="w-64 rounded-md bg-slate-100 dark:bg-slate-800 border-0 py-2 pl-10 pr-3 text-sm focus:ring-1 focus:ring-secondary-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
            </div>
            
            {/* AI Assistant Button */}
            <Button size="sm" variant="outline" className="bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/30">
              <Bot className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Ask Ops AI</span>
            </Button>
            
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                  3
                </span>
              </Button>
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="p-0">
                <Avatar className="h-8 w-8 bg-secondary-600">
                  <AvatarFallback className="text-white text-sm font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
