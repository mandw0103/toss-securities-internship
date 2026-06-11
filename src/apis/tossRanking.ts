import type { Market, PeriodMetrics, Stock } from '../types/stock';
import { PERIODS } from '../types/stock';

const TOSS_RANKING_ENDPOINT = '/toss-api/api/v2/dashboard/wts/overview/ranking';

const TOSS_RANKING_PAYLOAD = {
  id: 'biggest_total_amount',
  filters: [
    'KRX_MANAGEMENT_STOCK',
    'MARKET_CAP_GREATER_THAN_50M',
    'STOCKS_PRICE_GREATER_THAN_ONE_DOLLAR',
  ],
  duration: 'realtime',
  tag: 'all',
} as const;

export const TOSS_RANKING_ERROR = {
  REQUEST_FAILED: 'TOSS_RANKING_REQUEST_FAILED',
  RESPONSE_MISMATCH: 'TOSS_RANKING_RESPONSE_MISMATCH',
} as const;

interface TossRankingResponse {
  result: {
    products: TossRankingProduct[];
  };
}

interface TossRankingProduct {
  productCode: string;
  name: string;
  price: {
    baseKrw: number;
    closeKrw: number;
    tossSecuritiesVolume: number;
    tossSecuritiesAmount: number;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isTossRankingProduct(value: unknown): value is TossRankingProduct {
  if (!isRecord(value)) return false;
  if (typeof value.productCode !== 'string') return false;
  if (typeof value.name !== 'string') return false;
  if (!isRecord(value.price)) return false;

  return (
    isNumber(value.price.baseKrw) &&
    isNumber(value.price.closeKrw) &&
    isNumber(value.price.tossSecuritiesVolume) &&
    isNumber(value.price.tossSecuritiesAmount)
  );
}

function parseTossRankingResponse(value: unknown): TossRankingResponse {
  if (!isRecord(value) || !isRecord(value.result) || !Array.isArray(value.result.products)) {
    throw new Error(TOSS_RANKING_ERROR.RESPONSE_MISMATCH);
  }

  if (!value.result.products.every(isTossRankingProduct)) {
    throw new Error(TOSS_RANKING_ERROR.RESPONSE_MISMATCH);
  }

  return {
    result: {
      products: value.result.products,
    },
  };
}

function inferMarket(productCode: string): Market {
  if (
    productCode.startsWith('US') ||
    productCode.startsWith('NAS') ||
    productCode.startsWith('NYS') ||
    productCode.startsWith('AMX')
  ) {
    return '해외';
  }

  if (/^\d{6}$/.test(productCode)) {
    return '국내';
  }

  return '해외';
}

function calculateChangeRate(baseKrw: number, closeKrw: number): number {
  if (baseKrw === 0) return 0;
  return Math.round(((closeKrw - baseKrw) / baseKrw) * 10000) / 100;
}

function createMetrics(product: TossRankingProduct): Record<string, PeriodMetrics> {
  const metric: PeriodMetrics = {
    changeRate: calculateChangeRate(product.price.baseKrw, product.price.closeKrw),
    tossTradingValue: product.price.tossSecuritiesAmount,
    tossTradingVolume: product.price.tossSecuritiesVolume,
    totalTradingValue: product.price.tossSecuritiesAmount,
    totalTradingVolume: product.price.tossSecuritiesVolume,
  };

  return Object.fromEntries(PERIODS.map((period) => [period, metric])) as Record<
    (typeof PERIODS)[number],
    PeriodMetrics
  >;
}

function mapTossRankingProduct(product: TossRankingProduct): Stock {
  return {
    stockId: product.productCode,
    name: product.name,
    market: inferMarket(product.productCode),
    logoSeed: product.name.slice(0, 1),
    currentPrice: product.price.closeKrw,
    tossSharePercent: null,
    aiSummary: '',
    metricsByPeriod: createMetrics(product),
  };
}

export async function fetchTossRankingStocks(): Promise<Stock[]> {
  const response = await fetch(TOSS_RANKING_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(TOSS_RANKING_PAYLOAD),
  });

  if (!response.ok) {
    throw new Error(TOSS_RANKING_ERROR.REQUEST_FAILED);
  }

  const data: unknown = await response.json();
  const parsed = parseTossRankingResponse(data);
  return parsed.result.products.map(mapTossRankingProduct);
}
