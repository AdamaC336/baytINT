import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterIcon, Star, StarIcon } from "lucide-react";
import { ProductMarketFit } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProductMarketFitCardProps {
  data: ProductMarketFit;
}

export function ProductMarketFitCard({ data }: ProductMarketFitCardProps) {
  const objections = data.objections.items as { name: string; percentage: number }[];
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Product Market Fit</CardTitle>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              <FilterIcon className="h-3 w-3 mr-1" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PMF Score Card */}
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">PMF Score</h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">Last 30 days</span>
            </div>
            
            {/* Gauge Chart */}
            <div className="flex justify-center my-2">
              <div className="relative w-32 h-16">
                <svg viewBox="0 0 120 60" className="w-full h-full">
                  {/* Background arc */}
                  <path d="M10,60 A60,60 0 0,1 110,60" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                  {/* Value arc (dynamic based on PMF score) */}
                  <path 
                    d={`M10,60 A60,60 0 0,1 ${10 + 100 * (data.pmfScore / 100)},${60 - Math.sin(Math.PI * (data.pmfScore / 100)) * 60}`} 
                    stroke="#4f46e5" 
                    strokeWidth="8" 
                    fill="none" 
                  />
                  {/* Center point */}
                  <circle cx="60" cy="60" r="4" fill="#4f46e5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-slate-800 dark:text-white">{data.pmfScore}%</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Current Rating</div>
              <div className="flex justify-center mt-1 space-x-0.5">
                <StarIcon className="h-4 w-4 text-amber-400 fill-current" />
                <StarIcon className="h-4 w-4 text-amber-400 fill-current" />
                <StarIcon className="h-4 w-4 text-amber-400 fill-current" />
                <StarIcon className="h-4 w-4 text-amber-400 fill-current" />
                <Star className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                <span className="ml-1 text-xs font-medium text-slate-700 dark:text-slate-300">4.2/5</span>
              </div>
            </div>
          </div>
          
          {/* Customer Objections */}
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Top Customer Objections</h4>
            <div className="space-y-2">
              {objections.map((objection, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{objection.name}</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{objection.percentage}%</span>
                  </div>
                  <Progress
                    value={objection.percentage}
                    className={cn(
                      "h-2",
                      objection.percentage > 30 ? "bg-red-500" : 
                      objection.percentage > 15 ? "bg-amber-500" : "bg-emerald-500"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Return Rate Metrics */}
        <div className="mt-5 border-t border-slate-200 dark:border-slate-700 pt-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Return Rate Analysis</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard 
              title="Return Rate" 
              value={`${data.returnRate}%`} 
              change={-1.3} 
            />
            <MetricCard 
              title="Review Sentiment" 
              value={`${data.reviewSentiment}%`} 
              change={3.5} 
            />
            <MetricCard 
              title="Repeat Purchase" 
              value={`${data.repeatPurchaseRate}%`} 
              change={2.1} 
            />
            <MetricCard 
              title="NPS Score" 
              value={data.npsScore.toString()} 
              change={4} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
}

function MetricCard({ title, value, change }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="text-center">
      <div className="text-xs text-slate-500 dark:text-slate-400">{title}</div>
      <div className="text-lg font-semibold text-slate-800 dark:text-white">{value}</div>
      <div className="flex items-center justify-center text-xs text-emerald-600 dark:text-emerald-400">
        {isPositive ? (
          <ArrowUpIndicator className="mr-1" />
        ) : (
          <ArrowDownIndicator className="mr-1" />
        )}
        <span>{isPositive ? '+' : ''}{change}</span>
      </div>
    </div>
  );
}

function ArrowUpIndicator({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cn("h-3 w-3", className)}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>;
}

function ArrowDownIndicator({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cn("h-3 w-3", className)}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>;
}
