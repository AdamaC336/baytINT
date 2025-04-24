import { useEffect } from 'react';
import { useLocation } from 'wouter';
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
  const [location] = useLocation();
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
    let title = `${activeBrand}`;
    
    // Update title based on current route
    if (location === '/pl-tracker') {
      title += " | P&L Tracker";
    } else if (location === '/ai-agents') {
      title += " | AI Agents";
    } else if (location === '/ad-optimizer') {
      title += " | Ad Optimizer";
    } else if (location === '/pmf-tracker') {
      title += " | Product-Market Fit";
    } else if (location === '/project-tracker') {
      title += " | Project Tracker";
    } else if (location === '/meeting-panel') {
      title += " | Meeting Panel";
    } else {
      title += " | Dashboard";
    }
    
    document.title = `${title} | BaytBrands`;
  }, [activeBrand, location]);
  
  // Function to render page title based on current route
  const getPageTitle = () => {
    if (location === '/pl-tracker') {
      return "P&L Tracker";
    } else if (location === '/ai-agents') {
      return "AI Agents";
    } else if (location === '/ad-optimizer') {
      return "Ad Optimizer";
    } else if (location === '/pmf-tracker') {
      return "Product-Market Fit Tracker";
    } else if (location === '/customer-memory') {
      return "Customer Memory System";
    } else if (location === '/support-monitoring') {
      return "Support & Sentiment Monitoring";
    } else if (location === '/content-seo') {
      return "Content & SEO Automation";
    } else if (location === '/project-tracker') {
      return "Project & Task Tracker";
    } else if (location === '/meeting-panel') {
      return "Meeting Panel";
    } else if (location === '/kpi-scorecard') {
      return "KPI Scorecard";
    } else {
      return "Overview Dashboard";
    }
  };
  
  // Function to render page content based on current route
  const renderContent = () => {
    console.log("Current location:", location); // For debugging

    // Render P&L Tracker content
    const renderPLTracker = () => (
      <div className="w-full">
        <div className="text-lg font-semibold mb-4 text-secondary-600">P&L Financial Data</div>
        {isLoading ? (
          <CardSkeleton height="lg" />
        ) : financials.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500">No financial data available for {activeBrand}</p>
          </div>
        ) : (
          <PLChartCard data={plChartData} totals={plTotals} />
        )}
      </div>
    );

    // Render AI Agents content
    const renderAIAgents = () => (
      <div className="w-full">
        <div className="text-lg font-semibold mb-4 text-secondary-600">AI Agent Performance</div>
        {isLoading ? (
          <CardSkeleton height="lg" />
        ) : aiAgents.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500">No AI agents configured for {activeBrand}</p>
          </div>
        ) : (
          <AIAgentCard agents={aiAgents} />
        )}
      </div>
    );

    // Render Ad Performance content
    const renderAdOptimizer = () => (
      <div className="w-full">
        <div className="text-lg font-semibold mb-4 text-secondary-600">Ad Campaign Performance</div>
        {isLoading ? (
          <CardSkeleton height="lg" />
        ) : adCampaigns.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500">No ad campaigns available for {activeBrand}</p>
          </div>
        ) : (
          <AdPerformance campaigns={adCampaigns} refetch={refetch} />
        )}
      </div>
    );

    // Render Product Market Fit content
    const renderPMF = () => (
      <div className="w-full">
        <div className="text-lg font-semibold mb-4 text-secondary-600">Product-Market Fit Metrics</div>
        {isLoading ? (
          <CardSkeleton height="lg" />
        ) : !productMarketFit ? (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500">No product-market fit data available for {activeBrand}</p>
          </div>
        ) : (
          <ProductMarketFitCard data={productMarketFit} />
        )}
      </div>
    );

    // Render Project Tracker content
    const renderProjectTracker = () => (
      <div className="w-full">
        <div className="text-lg font-semibold mb-4 text-secondary-600">Tasks & Projects</div>
        {isLoading ? (
          <CardSkeleton height="lg" />
        ) : tasks.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500">No tasks available for {activeBrand}</p>
          </div>
        ) : (
          <TaskManagement tasks={tasks} refetch={refetch} />
        )}
      </div>
    );

    // Render Meeting Panel content 
    const renderMeetings = () => (
      <div className="w-full">
        <div className="text-lg font-semibold mb-4 text-secondary-600">Upcoming Meetings</div>
        {isLoading ? (
          <CardSkeleton height="lg" />
        ) : meetings.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500">No meetings scheduled for {activeBrand}</p>
          </div>
        ) : (
          <MeetingsCard meetings={meetings} />
        )}
      </div>
    );

    // First check for dashboard routes - both '/' and '/dashboard' should show full overview
    if (location === '/' || location === '/dashboard') {
      // Full dashboard overview with all components
      return (
        <>
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
                  value={`$${financials.length > 0 ? financials[0].revenue.toLocaleString() : '0'}`} 
                  change={12.5} 
                  previousValue={`$${financials.length > 0 ? Math.round(financials[0].revenue * 0.9).toLocaleString() : '0'}`}
                  type="revenue"
                />
                <KPICard 
                  title="Net Profit" 
                  value={`$${financials.length > 0 ? financials[0].profit.toLocaleString() : '0'}`} 
                  change={8.2} 
                  previousValue={`$${financials.length > 0 ? Math.round(financials[0].profit * 0.92).toLocaleString() : '0'}`}
                  type="profit"
                />
                <KPICard 
                  title="Average ROAS" 
                  value={`${financials.length > 0 ? financials[0].roas.toFixed(1) : '0.0'}x`} 
                  change={-2.1} 
                  previousValue={`${financials.length > 0 ? (financials[0].roas * 1.02).toFixed(1) : '0.0'}x`}
                  type="roas"
                />
                <KPICard 
                  title="New Customers" 
                  value={`${adCampaigns.length > 0 ? '1,243' : '0'}`} 
                  change={15.3} 
                  previousValue={`${adCampaigns.length > 0 ? '1,078' : '0'}`}
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
              {renderPLTracker()}
              
              {/* Ad Performance */}
              {renderAdOptimizer()}
              
              {/* Product Market Fit */}
              {renderPMF()}
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              
              {/* AI Agent Performance Card */}
              {renderAIAgents()}
              
              {/* Task Management Card */}
              {renderProjectTracker()}
              
              {/* Upcoming Meetings */}
              {renderMeetings()}
            </div>
          </div>
        </>
      );
    } 
    
    // Handle individual section pages
    else if (location === '/pl-tracker') {
      return renderPLTracker();
    } else if (location === '/ai-agents') {
      return renderAIAgents();
    } else if (location === '/ad-optimizer') {
      return renderAdOptimizer();
    } else if (location === '/pmf-tracker') {
      return renderPMF();
    } else if (location === '/project-tracker') {
      return renderProjectTracker();
    } else if (location === '/meeting-panel') {
      return renderMeetings();
    } else if (location === '/customer-memory') {
      return (
        <div className="w-full">
          <div className="text-lg font-semibold mb-4 text-secondary-600">Customer Memory System</div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500 mb-4">Customer data for {activeBrand}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiAgents.length > 0 ? (
                <>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">Customer Insights</h3>
                    <p className="text-slate-500 text-sm">AI-powered customer analytics and segmentation based on purchase behavior and engagement metrics.</p>
                  </div>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">Personalization Engine</h3>
                    <p className="text-slate-500 text-sm">Custom experiences generated from 1,243 customer profiles tracked across multiple touchpoints.</p>
                  </div>
                </>
              ) : (
                <div className="col-span-2">
                  <p className="text-center text-slate-500">No customer data available for {activeBrand}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (location === '/support-monitoring') {
      return (
        <div className="w-full">
          <div className="text-lg font-semibold mb-4 text-secondary-600">Support & Sentiment Monitoring</div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500 mb-4">Support metrics for {activeBrand}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tasks.length > 0 ? (
                <>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">Sentiment Score</h3>
                    <div className="text-xl font-semibold">92%</div>
                    <p className="text-green-500 text-sm">+4.2% from last month</p>
                  </div>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">Response Time</h3>
                    <div className="text-xl font-semibold">1.4h</div>
                    <p className="text-green-500 text-sm">-0.3h from last month</p>
                  </div>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">Resolution Rate</h3>
                    <div className="text-xl font-semibold">94.8%</div>
                    <p className="text-green-500 text-sm">+2.1% from last month</p>
                  </div>
                </>
              ) : (
                <div className="col-span-3">
                  <p className="text-center text-slate-500">No support data available for {activeBrand}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (location === '/content-seo') {
      return (
        <div className="w-full">
          <div className="text-lg font-semibold mb-4 text-secondary-600">Content & SEO Automation</div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500 mb-4">Content metrics for {activeBrand}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiAgents.length > 0 ? (
                <>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">Content Performance</h3>
                    <p className="text-slate-500 text-sm">AI-generated content has driven 42% more traffic than manual content over the last 30 days.</p>
                  </div>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">SEO Rankings</h3>
                    <p className="text-slate-500 text-sm">15 keywords now ranking in top 10 positions, up from 8 last month.</p>
                  </div>
                </>
              ) : (
                <div className="col-span-2">
                  <p className="text-center text-slate-500">No content data available for {activeBrand}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (location === '/kpi-scorecard') {
      return (
        <div className="w-full">
          <div className="text-lg font-semibold mb-4 text-secondary-600">KPI Scorecard</div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-500 mb-4">Performance metrics for {activeBrand}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financials.length > 0 ? (
                <>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">Overall Performance</h3>
                    <div className="flex items-center">
                      <div className="h-2 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="ml-2 font-semibold">78%</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-2">8 of 10 KPIs on track for quarterly targets</p>
                  </div>
                  <div className="p-4 border rounded-md border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-2">Areas for Improvement</h3>
                    <ul className="text-slate-500 text-sm list-disc ml-4">
                      <li>Customer acquisition cost (CAC) is 12% above target</li>
                      <li>Email open rates below 22% benchmark</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="col-span-2">
                  <p className="text-center text-slate-500">No KPI data available for {activeBrand}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } 
    
    // Default - fallback to showing dashboard view
    else {
      return (
        <>
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
                  value={`$${financials.length > 0 ? financials[0].revenue.toLocaleString() : '0'}`} 
                  change={12.5} 
                  previousValue={`$${financials.length > 0 ? Math.round(financials[0].revenue * 0.9).toLocaleString() : '0'}`}
                  type="revenue"
                />
                <KPICard 
                  title="Net Profit" 
                  value={`$${financials.length > 0 ? financials[0].profit.toLocaleString() : '0'}`} 
                  change={8.2} 
                  previousValue={`$${financials.length > 0 ? Math.round(financials[0].profit * 0.92).toLocaleString() : '0'}`}
                  type="profit"
                />
                <KPICard 
                  title="Average ROAS" 
                  value={`${financials.length > 0 ? financials[0].roas.toFixed(1) : '0.0'}x`} 
                  change={-2.1} 
                  previousValue={`${financials.length > 0 ? (financials[0].roas * 1.02).toFixed(1) : '0.0'}x`}
                  type="roas"
                />
                <KPICard 
                  title="New Customers" 
                  value={`${adCampaigns.length > 0 ? '1,243' : '0'}`} 
                  change={15.3} 
                  previousValue={`${adCampaigns.length > 0 ? '1,078' : '0'}`}
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
              {renderPLTracker()}
              
              {/* Ad Performance */}
              {renderAdOptimizer()}
              
              {/* Product Market Fit */}
              {renderPMF()}
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              
              {/* AI Agent Performance Card */}
              {renderAIAgents()}
              
              {/* Task Management Card */}
              {renderProjectTracker()}
              
              {/* Upcoming Meetings */}
              {renderMeetings()}
            </div>
          </div>
        </>
      );
    }
  };
  
  return (
    <DashboardLayout>
      {/* Page Title and Date */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">{getPageTitle()}</h2>
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
      
      {/* Render content based on route */}
      {renderContent()}
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
