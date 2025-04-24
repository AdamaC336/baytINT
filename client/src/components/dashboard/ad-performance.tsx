import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DownloadIcon, MoreHorizontal, Pause, Play, Scale, Square } from "lucide-react";
import { AdCampaign } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AdPerformanceProps {
  campaigns: AdCampaign[];
  refetch: () => void;
}

export function AdPerformance({ campaigns, refetch }: AdPerformanceProps) {
  const { toast } = useToast();
  
  const updateCampaignMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: 'Active' | 'Paused' | 'Stopped' | 'Warning' }) => {
      const res = await apiRequest('PATCH', `/api/ad-campaigns/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Campaign updated",
        description: "Ad campaign status updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update campaign: ${error}`,
      });
    },
  });

  const handleStatusToggle = (campaign: AdCampaign) => {
    const newStatus = campaign.status === 'Active' ? 'Paused' : 'Active';
    updateCampaignMutation.mutate({ id: campaign.id, status: newStatus });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Ad Performance</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-secondary-600 dark:hover:text-secondary-400">
              <DownloadIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">Export</span>
            </Button>
            <Button variant="ghost" size="sm" className="p-1 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-4 px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase">Campaign</TableHead>
                <TableHead className="text-xs uppercase">Platform</TableHead>
                <TableHead className="text-xs uppercase">Spend</TableHead>
                <TableHead className="text-xs uppercase">CTR</TableHead>
                <TableHead className="text-xs uppercase">ROAS</TableHead>
                <TableHead className="text-xs uppercase">Status</TableHead>
                <TableHead className="text-xs uppercase">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <TableCell className="py-3 text-sm text-slate-800 dark:text-slate-200">
                    {campaign.name}
                  </TableCell>
                  <TableCell className="py-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center">
                      {campaign.platform === 'Meta' ? (
                        <span className="inline-flex items-center">
                          <svg className="h-4 w-4 mr-1 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                          </svg>
                          Meta
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <svg className="h-4 w-4 mr-1 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                          </svg>
                          TikTok
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-slate-600 dark:text-slate-400">
                    ${campaign.spend.toLocaleString()}
                  </TableCell>
                  <TableCell className="py-3 text-sm">
                    <span className={cn(
                      campaign.ctr < 1.5 ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
                    )}>
                      {campaign.ctr}%
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-sm">
                    <span className={cn(
                      campaign.roas < 2.5 ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
                    )}>
                      {campaign.roas}x
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-sm">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "inline-flex items-center rounded text-xs font-medium",
                        campaign.status === 'Active' && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400",
                        campaign.status === 'Warning' && "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400",
                        campaign.status === 'Paused' && "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
                        campaign.status === 'Stopped' && "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                      )}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-sm">
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 text-slate-600 dark:text-slate-400 hover:text-secondary-600 dark:hover:text-secondary-400"
                      >
                        <Scale className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 text-slate-600 dark:text-slate-400 hover:text-secondary-600 dark:hover:text-secondary-400"
                        onClick={() => handleStatusToggle(campaign)}
                      >
                        {campaign.status === 'Active' ? (
                          <Pause className="h-4 w-4" />
                        ) : campaign.status === 'Warning' ? (
                          <Square className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing {campaigns.length} of {campaigns.length} campaigns
          </span>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" className="px-2 py-1 text-xs">
              Previous
            </Button>
            <Button variant="secondary" size="sm" className="px-2 py-1 text-xs">
              1
            </Button>
            <Button variant="outline" size="sm" className="px-2 py-1 text-xs">
              2
            </Button>
            <Button variant="outline" size="sm" className="px-2 py-1 text-xs">
              3
            </Button>
            <Button variant="outline" size="sm" className="px-2 py-1 text-xs">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
