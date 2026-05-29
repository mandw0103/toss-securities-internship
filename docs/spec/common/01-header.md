# 공통 > 헤더 FE 스펙

> 기획서: [docs/planning/common/01-header.md](../../planning/common/01-header.md)
> 작성일: 2026-04-13
> 갱신일: 2026-05-10 (Stock 타입을 [common/02-주식데이터.md](./02-주식데이터.md)와 통합)
> 상태: 리뷰 중

## 컴포넌트 구조

```
Header (sticky 컨테이너)
├── Logo (홈 링크)
├── GNB
│   └── GNBTab × 4
└── SearchBar
    └── SearchDropdown
        └── SearchResultItem × N
```

## 컴포넌트 명세

### Header

- 최상위 레이아웃 컴포넌트
- `position: sticky; top: 0`으로 상단 고정
- 내부 배치: 좌측 Logo → 중앙 GNB → 우측 SearchBar

### Logo

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| - | - | - | props 없음 (정적 컴포넌트) |

**동작:**
- 클릭 시 `/`로 이동 (`<Link to="/">`)
- 토스증권 로고 이미지(심볼 + 텍스트) 렌더링

### GNB

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| - | - | - | props 없음 (내부에서 라우트 상태 참조) |

**동작:**
- 4개 탭을 수평 나열한다
- 현재 URL과 일치하는 탭을 볼드 처리한다 (`useLocation` 활용)

### GNBTab

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| label | string | O | 탭에 표시할 텍스트 |
| to | string \| null | O | 이동할 경로. `null`이면 클릭 비활성화 |
| isActive | boolean | O | 현재 활성 탭 여부 |

**동작:**
- `to`가 `null`이면 클릭 시 아무 반응 없음 (내 계좌)
- `isActive`가 `true`이면 `font-weight: bold` 적용

**탭 데이터:**

```typescript
const NAV_ITEMS = [
  { label: '홈', to: '/' },
  { label: '피드', to: '/feed/recommended' },
  { label: '주식 골라보기', to: '/screener' },
  { label: '내 계좌', to: null },
] as const;
```

### SearchBar

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| - | - | - | props 없음 (내부 상태로 관리) |

**내부 상태:**
- `query: string` — 검색 입력값
- `isOpen: boolean` — 드롭다운 표시 여부

**동작:**
- 플레이스홀더: `/ 를 눌러 검색하세요`
- 클릭 시 입력 활성화
- 전역 키보드 이벤트로 `/` 키 입력 시 검색창 포커스 (단, 다른 input에 포커스 중이면 무시)
- 입력값 변경 시 실시간으로 검색 API 호출 → 드롭다운 표시
- `Esc` 키: 드롭다운 닫기 + 검색 결과 초기화 (포커스는 유지)
- 바깥 영역 클릭: 드롭다운 닫기 + 포커스 해제

### SearchDropdown

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| results | StockSearchResult[] | O | 검색 결과 목록 |
| isLoading | boolean | O | 로딩 상태 |
| isError | boolean | O | 에러 상태 |
| onSelect | (stock: StockSearchResult) => void | O | 항목 선택 콜백 |

> `StockSearchResult = Pick<Stock, 'stockId' | 'name'>`. `Stock` 타입은 [common/02-주식데이터.md](./02-주식데이터.md)에서 정의된 `src/types/stock.ts`를 import 한다.

**동작:**
- `isLoading`이 `true`이면 로딩 표시
- `isError`가 `true`이면 `검색 중 문제가 발생했습니다.` 표시
- `results`가 빈 배열이면 `검색 결과 없음` 표시
- 항목 클릭 시 `onSelect` 호출

### SearchResultItem

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|
| name | string | O | 종목명 |
| onClick | () => void | O | 클릭 콜백 |

**동작:**
- 종목명만 표시 (현재가/등락률은 추후 확장)
- 클릭 시 해당 종목 페이지로 이동

## API 연동

### `searchStocks(query: string): Promise<StockSearchResult[]>`

[common/02-주식데이터.md](./02-주식데이터.md)의 `src/mocks/stocks.ts`에 정의된 mock 함수를 사용한다. 백엔드 미존재 — `STOCKS` 풀에서 `name`이 `query`를 포함(대소문자 무시)하는 종목을 필터링하여 `{ stockId, name }`만 반환한다.

```typescript
import type { StockSearchResult } from '../../types/stock';

// 응답: StockSearchResult[] (배열을 직접 반환, 래퍼 객체 없음)
```

> 검색 응답은 풀 `Stock`의 부분 집합. 향후 검색 결과에 `currentPrice`/`market` 등 컬럼이 추가되면 `Pick`에 필드를 더한다. 추후 실 API 교체 시 `searchStocks` 함수 본체만 바뀌고 호출부는 수정 없음.

**에러 처리:**
- mock 함수는 동기적 필터링을 `Promise.resolve`로 감싸므로 에러 발생 안 함. 단, 향후 실 API 전환을 대비해 `useQuery`의 `isError` 분기는 유지하고 드롭다운에서 `검색 중 문제가 발생했습니다.` 메시지를 노출한다.
- 결과 없음: 드롭다운에 `검색 결과 없음` 표시

## 상태 관리

### 서버 상태 (TanStack Query)

- Query Key: `['stocks', 'search', query]`
- `enabled`: `query.length > 0` (빈 문자열일 때는 호출하지 않음)
- debounce: 300ms (과도한 API 호출 방지)

### 클라이언트 상태

- SearchBar 내부 `useState`로 관리 (전역 상태 불필요)
  - `query` — 검색 입력값
  - `isOpen` — 드롭다운 표시 여부

## 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | HomePage | 홈 |
| `/feed/recommended` | FeedPage | 피드 (빈 화면) |
| `/screener` | ScreenerPage | 주식 골라보기 (빈 화면) |

> `/account`는 라우트 미등록 (내 계좌 탭 비활성화)

## 파일 구조

```
src/
├── types/
│   └── stock.ts           # Stock, StockSearchResult (common/02에서 정의)
├── mocks/
│   └── stocks.ts          # searchStocks (common/02에서 정의·관리)
├── components/
│   └── Header/
│       ├── Header.tsx
│       ├── Logo.tsx
│       ├── GNB.tsx
│       ├── GNBTab.tsx
│       ├── SearchBar.tsx
│       ├── SearchDropdown.tsx
│       └── SearchResultItem.tsx
└── pages/
    ├── HomePage.tsx
    ├── FeedPage.tsx
    └── ScreenerPage.tsx
```

> 기존 `src/apis/stocks.ts`는 본 갱신과 함께 제거된다 (mock 통합 후 별도 API 레이어 불필요).

## 변경 이력

| 날짜 | 내용 |
|------|------|
| 2026-04-13 | 초안 작성 (리뷰 중) |
| 2026-05-10 | `Stock` 타입을 [common/02-주식데이터.md](./02-주식데이터.md)와 통합. 기존 `{ id, name }`을 풀 `Stock`의 `Pick<'stockId' \| 'name'>`로 변경하여 도메인 일관성 확보. 기존 헤더 구현(`src/apis/stocks.ts`, `SearchDropdown.tsx`, `SearchBar.tsx`)도 `id` → `stockId`로 갱신 필요 |
| 2026-05-10 | 검색 API를 mock 데이터와 통합. `/api/stocks/search` fetch를 제거하고 [common/02-주식데이터.md](./02-주식데이터.md)에 정의된 `searchStocks(query)` 함수(`src/mocks/stocks.ts`)를 호출. 응답 형태도 `{ stocks: ... }` 래퍼에서 `StockSearchResult[]` 직접 반환으로 단순화. `src/apis/stocks.ts`는 제거. SearchBar의 `data?.stocks ?? []`는 `data ?? []`로 갱신 필요 |

## 체크리스트

- [ ] 컴포넌트 구조 확정
- [ ] API 명세 확정
- [ ] 상태 관리 설계 확정
- [ ] 민서 승인 완료
