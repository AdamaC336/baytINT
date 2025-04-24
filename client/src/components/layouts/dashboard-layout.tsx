import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Topbar } from '@/components/ui/topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 antialiased">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div 
        className="flex-1 transition-all duration-300 ml-0 md:ml-64" 
        style={{ marginLeft: sidebarOpen ? '' : '0' }}
      >
        <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              © 2023 BaytBrands. All rights reserved.
            </div>
            <div className="mt-2 md:mt-0 flex items-center space-x-4">
              <button className="text-sm text-slate-600 dark:text-slate-300 hover:text-secondary-600 dark:hover:text-secondary-400">
                Documentation
              </button>
              <button className="text-sm text-slate-600 dark:text-slate-300 hover:text-secondary-600 dark:hover:text-secondary-400">
                Support
              </button>
              <button className="text-sm text-slate-600 dark:text-slate-300 hover:text-secondary-600 dark:hover:text-secondary-400">
                Privacy Policy
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
