import { useQuery } from '@tanstack/react-query';
import { fetchTossRankingStocks } from '../apis/tossRanking';
import { fetchStocks } from '../mocks/stocks';
import type { Stock } from '../types/stock';

async function fetchStocksWithFallback(): Promise<Stock[]> {
  try {
    return await fetchTossRankingStocks();
  } catch (error) {
    console.warn('Failed to fetch toss ranking stocks. Falling back to mock data.', error);
    return fetchStocks();
  }
}

export function useStocks() {
  return useQuery<Stock[]>({
    queryKey: ['stocks'],
    queryFn: fetchStocksWithFallback,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}
