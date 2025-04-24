import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from "recharts";

type PeriodType = "weekly" | "monthly" | "yearly";

interface PLChartCardProps {
  data: {
    name: string;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
  totals: {
    revenue: number;
    expenses: number;
    profit: number;
  };
}

export function PLChartCard({ data, totals }: PLChartCardProps) {
  const [period, setPeriod] = useState<PeriodType>("weekly");

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Profit & Loss Overview</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={period === "weekly" ? "secondary" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setPeriod("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={period === "monthly" ? "secondary" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setPeriod("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={period === "yearly" ? "secondary" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setPeriod("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">Revenue</div>
            <div className="text-base font-medium text-emerald-600 dark:text-emerald-400">
              ${totals.revenue.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">Expenses</div>
            <div className="text-base font-medium text-red-500 dark:text-red-400">
              ${totals.expenses.toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">Profit</div>
            <div className="text-base font-medium text-secondary-600 dark:text-secondary-400">
              ${totals.profit.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
