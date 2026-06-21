const TOSS_RANKING_API_URL =
  'https://wts-cert-api.tossinvest.com/api/v2/dashboard/wts/overview/ranking';

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

const TOSS_INVEST_ORIGIN = 'https://www.tossinvest.com';

interface VercelRequest {
  method?: string;
}

interface VercelResponse {
  status(statusCode: number): VercelResponse;
  setHeader(name: string, value: string): void;
  json(body: unknown): void;
  end(): void;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
    return;
  }

  try {
    const tossResponse = await fetch(TOSS_RANKING_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: TOSS_INVEST_ORIGIN,
        Referer: `${TOSS_INVEST_ORIGIN}/`,
      },
      body: JSON.stringify(TOSS_RANKING_PAYLOAD),
    });

    const responseText = await tossResponse.text();

    response.setHeader('Cache-Control', 'no-store');
    response.status(tossResponse.status);

    if (!responseText) {
      response.end();
      return;
    }

    try {
      response.json(JSON.parse(responseText));
    } catch {
      response.json({ error: 'TOSS_RANKING_RESPONSE_MISMATCH' });
    }
  } catch {
    response.status(502).json({ error: 'TOSS_RANKING_REQUEST_FAILED' });
  }
}
