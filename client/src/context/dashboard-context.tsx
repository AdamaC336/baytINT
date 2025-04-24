import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Brand, Financial, AdCampaign, AiAgent, ProductMarketFit, Task, Meeting } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

interface DashboardContextType {
  activeBrand: string;
  setActiveBrand: (brand: string) => void;
  brands: Brand[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isLoading: boolean;
  error: Error | null;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeBrand, setActiveBrand] = useState<string>('HydraBark');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Fetch brands
  const { data: brands = [], isLoading, error } = useQuery<Brand[], Error>({
    queryKey: ['/api/brands'],
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Set default brand if not set
  useEffect(() => {
    if (brands.length > 0 && !activeBrand) {
      setActiveBrand(brands[0].code);
    }
  }, [brands, activeBrand]);

  // Apply dark mode from user preference
  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <DashboardContext.Provider value={{
      activeBrand,
      setActiveBrand,
      brands,
      isDarkMode,
      toggleDarkMode,
      isLoading,
      error: error || null,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
