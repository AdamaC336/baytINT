import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import HomePage from "@/pages/index";
import { DashboardProvider } from "@/context/dashboard-context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/dashboard" component={Dashboard} />
      {/* Additional dashboard routes */}
      <Route path="/pl-tracker" component={Dashboard} />
      <Route path="/ai-agents" component={Dashboard} />
      <Route path="/ad-optimizer" component={Dashboard} />
      <Route path="/pmf-tracker" component={Dashboard} />
      <Route path="/customer-memory" component={Dashboard} />
      <Route path="/support-monitoring" component={Dashboard} />
      <Route path="/content-seo" component={Dashboard} />
      <Route path="/project-tracker" component={Dashboard} />
      <Route path="/meeting-panel" component={Dashboard} />
      <Route path="/kpi-scorecard" component={Dashboard} />
      <Route path="/settings" component={Dashboard} />
      <Route path="/logout" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DashboardProvider>
          <Toaster />
          <Router />
        </DashboardProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
