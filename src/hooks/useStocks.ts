import { useQuery } from '@tanstack/react-query';
import { fetchStocks } from '../mocks/stocks';
import type { Stock } from '../types/stock';

export function useStocks() {
  return useQuery<Stock[]>({
    queryKey: ['stocks'],
    queryFn: fetchStocks,
    staleTime: Infinity,
  });
}
