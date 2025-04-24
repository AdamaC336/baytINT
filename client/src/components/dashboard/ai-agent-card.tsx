import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiAgent } from "@shared/schema";
import { MoreHorizontal, Bot, HeadphonesIcon, ShoppingCartIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AIAgentCardProps {
  agents: AiAgent[];
}

export function AIAgentCard({ agents }: AIAgentCardProps) {
  // Calculate totals
  const totalCost = agents.reduce((sum, agent) => sum + agent.cost, 0);
  const totalUsage = agents.reduce((sum, agent) => sum + agent.usageCount, 0);
  const avgCostPerConversion = totalCost / totalUsage || 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">AI Agent Performance</CardTitle>
          <Button variant="ghost" size="sm" className="p-1 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {agents.map((agent) => {
            const metrics = agent.metrics as Record<string, number>;
            const metricKey = Object.keys(metrics)[0];
            const metricValue = metrics[metricKey] || 0;
            
            return (
              <div key={agent.id} className="bg-slate-50 dark:bg-slate-700/30 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      agent.type === 'CX' && "bg-blue-100 dark:bg-blue-900/30",
                      agent.type === 'CMO' && "bg-purple-100 dark:bg-purple-900/30",
                      agent.type === 'CartRecovery' && "bg-amber-100 dark:bg-amber-900/30"
                    )}>
                      {agent.type === 'CX' && <HeadphonesIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                      {agent.type === 'CMO' && <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                      {agent.type === 'CartRecovery' && <ShoppingCartIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800 dark:text-white">{agent.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {agent.type === 'CX' && 'Customer Support'}
                        {agent.type === 'CMO' && 'Marketing'}
                        {agent.type === 'CartRecovery' && 'Sales'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{agent.successRate}% Success</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{agent.usageCount} calls today</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400">
                      {metricKey === 'resolutionRate' && 'Resolution Rate'}
                      {metricKey === 'roasImprovement' && 'ROAS Improvement'}
                      {metricKey === 'recoveryRate' && 'Recovery Rate'}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{metricValue}%</span>
                  </div>
                  <Progress value={metricValue} className={cn(
                    "h-1.5 bg-slate-200 dark:bg-slate-700",
                    agent.type === 'CX' && "text-emerald-500",
                    agent.type === 'CMO' && "text-purple-500",
                    agent.type === 'CartRecovery' && "text-amber-500"
                  )} />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-3">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Cost Today</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">${totalCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>Avg. Cost per Conversion</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">${avgCostPerConversion.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-3 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900/30"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
