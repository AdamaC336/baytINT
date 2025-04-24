import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { PLChartCard } from '@/components/dashboard/pl-chart';
import { AdPerformance } from '@/components/dashboard/ad-performance';
import { ProductMarketFitCard } from '@/components/dashboard/product-market-fit';
import { AIAgentCard } from '@/components/dashboard/ai-agent-card';
import { TaskManagement } from '@/components/dashboard/task-management';
import { MeetingsCard } from '@/components/dashboard/meetings-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboard } from '@/context/dashboard-context';
import { useDashboardData } from '@/hooks/use-dashboard';
import { parseISO } from 'date-fns';

export default function Dashboard() {
  const { activeBrand } = useDashboard();
  const { 
    brandId,
    financials, 
    adCampaigns, 
    aiAgents, 
    productMarketFit, 
    tasks, 
    meetings, 
    isLoading, 
    error, 
    refetch 
  } = useDashboardData(activeBrand);
  
  // Generate P&L chart data
  const plChartData = [
    { name: 'Jan', revenue: 95000, expenses: 62000, profit: 33000 },
    { name: 'Feb', revenue: 85000, expenses: 59000, profit: 26000 },
    { name: 'Mar', revenue: 102000, expenses: 64000, profit: 38000 },
    { name: 'Apr', revenue: 110000, expenses: 68000, profit: 42000 },
    { name: 'May', revenue: 118000, expenses: 70000, profit: 48000 },
    { name: 'Jun', revenue: 124568, expenses: 71136, profit: 53432 },
  ];
  
  // Totals for P&L summary
  const plTotals = {
    revenue: financials.length > 0 ? financials[0].revenue : 124568,
    expenses: financials.length > 0 ? (financials[0].adSpend + financials[0].cogs + financials[0].otherExpenses) : 71136,
    profit: financials.length > 0 ? financials[0].profit : 53432
  };
  
  // Set document title
  useEffect(() => {
    document.title = `${activeBrand} Dashboard | BaytBrands`;
  }, [activeBrand]);
  
  return (
    <DashboardLayout>
      {/* Page Title and Date */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Overview Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Welcome back, Zach! Here's what's happening with {activeBrand} today.
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">Last updated:</span>
          <span className="text-sm font-medium">
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </span>
          <button onClick={() => refetch()} className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300">
            <RefreshIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoading ? (
          <>
            <KPISkeleton />
            <KPISkeleton />
            <KPISkeleton />
            <KPISkeleton />
          </>
        ) : (
          <>
            <KPICard 
              title="Total Revenue" 
              value={`$${financials.length > 0 ? financials[0].revenue.toLocaleString() : '124,568'}`} 
              change={12.5} 
              previousValue={`$${110742}`}
              type="revenue"
            />
            <KPICard 
              title="Net Profit" 
              value={`$${financials.length > 0 ? financials[0].profit.toLocaleString() : '53,432'}`} 
              change={8.2} 
              previousValue={`$${49382}`}
              type="profit"
            />
            <KPICard 
              title="Average ROAS" 
              value={`${financials.length > 0 ? financials[0].roas.toFixed(1) : '3.2'}x`} 
              change={-2.1} 
              previousValue={`3.3x`}
              type="roas"
            />
            <KPICard 
              title="New Customers" 
              value={`1,243`} 
              change={15.3} 
              previousValue={`1,078`}
              type="customers"
            />
          </>
        )}
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* P&L Chart */}
          {isLoading ? (
            <CardSkeleton height="md" />
          ) : (
            <PLChartCard data={plChartData} totals={plTotals} />
          )}
          
          {/* Ad Performance */}
          {isLoading ? (
            <CardSkeleton height="lg" />
          ) : (
            <AdPerformance campaigns={adCampaigns} refetch={refetch} />
          )}
          
          {/* Product Market Fit */}
          {isLoading || !productMarketFit ? (
            <CardSkeleton height="lg" />
          ) : (
            <ProductMarketFitCard data={productMarketFit} />
          )}
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          
          {/* AI Agent Performance Card */}
          {isLoading ? (
            <CardSkeleton height="md" />
          ) : (
            <AIAgentCard agents={aiAgents} />
          )}
          
          {/* Task Management Card */}
          {isLoading ? (
            <CardSkeleton height="md" />
          ) : (
            <TaskManagement tasks={tasks} refetch={refetch} />
          )}
          
          {/* Upcoming Meetings */}
          {isLoading ? (
            <CardSkeleton height="md" />
          ) : (
            <MeetingsCard meetings={meetings} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// Skeleton loading components
function KPISkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-12 w-24" />
      </div>
    </div>
  );
}

function CardSkeleton({ height }: { height: 'sm' | 'md' | 'lg' }) {
  const heightClass = {
    sm: 'h-32',
    md: 'h-64',
    lg: 'h-96',
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-5 w-40" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
      <Skeleton className={`w-full ${heightClass[height]}`} />
    </div>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}
