export interface Stock {
  id: string;
  name: string;
}

interface SearchResponse {
  stocks: Stock[];
}

export async function searchStocks(query: string): Promise<SearchResponse> {
  const res = await fetch(`/api/stocks/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error('검색 중 문제가 발생했습니다.');
  }
  return res.json();
}
