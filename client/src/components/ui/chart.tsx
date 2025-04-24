import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Legend,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  Sector,
  RadialBarChart,
  RadialBar,
} from "recharts";

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  xAxisDataKey?: string;
  series: {
    dataKey: string;
    name: string;
    color: string;
  }[];
  type?: "area" | "bar" | "line" | "pie" | "radialBar";
  height?: number | string;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  stackId?: string;
  renderCustomTooltip?: (props: TooltipProps<any, any>) => React.ReactNode;
}

export const Chart = ({
  data,
  xAxisDataKey = "name",
  series,
  type = "line",
  height = 300,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  stackId,
  className,
  renderCustomTooltip,
  ...props
}: ChartProps) => {
  // Determine chart type and render appropriate component
  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <AreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            {showTooltip && (
              <Tooltip
                content={
                  renderCustomTooltip as React.FC<TooltipProps<any, any>>
                }
              />
            )}
            {showLegend && <Legend />}
            {series.map((item, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={item.dataKey}
                name={item.name}
                stackId={stackId}
                stroke={item.color}
                fill={item.color}
                fillOpacity={0.2}
              />
            ))}
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            {showTooltip && (
              <Tooltip
                content={
                  renderCustomTooltip as React.FC<TooltipProps<any, any>>
                }
              />
            )}
            {showLegend && <Legend />}
            {series.map((item, index) => (
              <Bar
                key={index}
                dataKey={item.dataKey}
                name={item.name}
                stackId={stackId}
                fill={item.color}
              />
            ))}
          </BarChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey={series[0].dataKey}
              nameKey={xAxisDataKey}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    series.length > 1
                      ? series[index % series.length].color
                      : series[0].color
                  }
                />
              ))}
            </Pie>
            {showTooltip && (
              <Tooltip
                content={
                  renderCustomTooltip as React.FC<TooltipProps<any, any>>
                }
              />
            )}
            {showLegend && <Legend />}
          </PieChart>
        );
      case "radialBar":
        return (
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={data}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey={series[0].dataKey}
            />
            {showTooltip && (
              <Tooltip
                content={
                  renderCustomTooltip as React.FC<TooltipProps<any, any>>
                }
              />
            )}
            {showLegend && <Legend />}
          </RadialBarChart>
        );
      case "line":
      default:
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            {showTooltip && (
              <Tooltip
                content={
                  renderCustomTooltip as React.FC<TooltipProps<any, any>>
                }
              />
            )}
            {showLegend && <Legend />}
            {series.map((item, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={item.dataKey}
                name={item.name}
                stroke={item.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

// Custom tooltip component
export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm">
        <p className="text-sm font-medium text-slate-800 dark:text-white">{`${label}`}</p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center text-xs mt-1">
            <div
              className="w-2 h-2 rounded-full mr-1"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-600 dark:text-slate-400">
              {item.name}:
            </span>
            <span className="font-medium ml-1 text-slate-800 dark:text-white">
              {typeof item.value === "number"
                ? item.value.toLocaleString()
                : item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
