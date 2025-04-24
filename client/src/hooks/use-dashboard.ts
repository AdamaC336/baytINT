import { useQuery } from '@tanstack/react-query';
import { AdCampaign, AiAgent, Financial, Meeting, ProductMarketFit, Task } from '@shared/schema';
import { useDashboard } from '@/context/dashboard-context';

export const useDashboardData = (brandCode: string) => {
  // Get brand ID from active brand
  const getBrandId = async (): Promise<number> => {
    const response = await fetch(`/api/brands/${brandCode}`);
    if (!response.ok) throw new Error('Failed to fetch brand');
    const brand = await response.json();
    return brand.id;
  };

  // Get brand ID query
  const brandIdQuery = useQuery<number, Error>({
    queryKey: [`/api/brands/${brandCode}/id`],
    queryFn: getBrandId,
    enabled: Boolean(brandCode),
  });

  const brandId = brandIdQuery.data;

  // Financial data
  const financialsQuery = useQuery<Financial[], Error>({
    queryKey: [`/api/financials/${brandId}`],
    enabled: Boolean(brandId),
  });

  // Ad campaigns
  const adCampaignsQuery = useQuery<AdCampaign[], Error>({
    queryKey: [`/api/ad-campaigns/${brandId}`],
    enabled: Boolean(brandId),
  });

  // AI agents
  const aiAgentsQuery = useQuery<AiAgent[], Error>({
    queryKey: [`/api/ai-agents/${brandId}`],
    enabled: Boolean(brandId),
  });

  // Product market fit
  const productMarketFitQuery = useQuery<ProductMarketFit, Error>({
    queryKey: [`/api/product-market-fit/${brandId}`],
    enabled: Boolean(brandId),
  });

  // Tasks
  const tasksQuery = useQuery<Task[], Error>({
    queryKey: [`/api/tasks/${brandId}`],
    enabled: Boolean(brandId),
  });

  // Meetings
  const meetingsQuery = useQuery<Meeting[], Error>({
    queryKey: [`/api/meetings/${brandId}`],
    enabled: Boolean(brandId),
  });

  // Loading state
  const isLoading = 
    brandIdQuery.isLoading || 
    financialsQuery.isLoading || 
    adCampaignsQuery.isLoading || 
    aiAgentsQuery.isLoading || 
    productMarketFitQuery.isLoading || 
    tasksQuery.isLoading || 
    meetingsQuery.isLoading;

  // Error state
  const error = 
    brandIdQuery.error || 
    financialsQuery.error || 
    adCampaignsQuery.error || 
    aiAgentsQuery.error || 
    productMarketFitQuery.error || 
    tasksQuery.error || 
    meetingsQuery.error;

  return {
    brandId,
    financials: financialsQuery.data || [],
    adCampaigns: adCampaignsQuery.data || [],
    aiAgents: aiAgentsQuery.data || [],
    productMarketFit: productMarketFitQuery.data,
    tasks: tasksQuery.data || [],
    meetings: meetingsQuery.data || [],
    isLoading,
    error,
  };
};
