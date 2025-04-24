import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const [_, setLocation] = useLocation();

  useEffect(() => {
    document.title = 'BaytBrands - AI Business Intelligence Dashboard';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      <header className="w-full bg-white dark:bg-slate-900 shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary-600">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-semibold text-slate-800 dark:text-white">BaytBrands</span>
          </div>
          <Button onClick={() => setLocation('/dashboard')} className="bg-secondary-600 hover:bg-secondary-700">
            Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            AI-Powered Business Intelligence Dashboard
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            A centralized AI-powered control panel integrating real-time metrics, automation, 
            AI agent collaboration, project management, and multi-brand scalability.
          </p>
          <Button 
            onClick={() => setLocation('/dashboard')} 
            size="lg" 
            className="bg-secondary-600 hover:bg-secondary-700 text-lg px-8"
          >
            Enter Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            title="Real-Time P&L Tracker" 
            description="Monitor revenue, ad spend, COGS, and profit in real-time with AI anomaly detection for cost spikes and margin alerts."
            icon={<DollarSignIcon />}
          />
          <FeatureCard 
            title="AI Agent Performance" 
            description="Track all AI agents including CX GPT, CMO GPT, and Cart Recovery GPT with detailed usage statistics and cost breakdown."
            icon={<BotIcon />}
          />
          <FeatureCard 
            title="Ad Optimizer Panel" 
            description="Pull ad performance data from multiple platforms, track KPIs, and automatically identify underperforming campaigns."
            icon={<LineChartIcon />}
          />
          <FeatureCard 
            title="Product-Market Fit" 
            description="Track return rates, review sentiment, and customer objections with an AI-generated PMF score trend."
            icon={<TargetIcon />}
          />
          <FeatureCard 
            title="Task Management" 
            description="Markdown-style Notion-like task list with statuses, role-based access, and multiple view options."
            icon={<ListIcon />}
          />
          <FeatureCard 
            title="Meeting Panel" 
            description="Auto-generate AI Meeting Briefs with business KPIs, AI logs, P&L summary, and highlights."
            icon={<UsersIcon />}
          />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Ready to optimize your business operations?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Access the dashboard now to start monitoring all aspects of your business in one place.
          </p>
          <Button 
            onClick={() => setLocation('/dashboard')} 
            className="bg-secondary-600 hover:bg-secondary-700"
          >
            Go to Dashboard
          </Button>
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          © 2023 BaytBrands. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center text-secondary-600 dark:text-secondary-400 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </CardContent>
    </Card>
  );
}

// Icons
function DollarSignIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

function BotIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
  );
}

function LineChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"></path>
      <path d="m19 9-5 5-4-4-3 3"></path>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );
}

function ListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}
