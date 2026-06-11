import { useQuery } from '@tanstack/react-query';
import { fetchTossRankingStocks } from '../apis/tossRanking';
import type { Stock } from '../types/stock';

export function useStocks() {
  return useQuery<Stock[]>({
    queryKey: ['stocks'],
    queryFn: fetchTossRankingStocks,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
