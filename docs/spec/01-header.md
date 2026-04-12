# 공통 > 헤더 FE 스펙

> 기획서: [docs/planning/01-header.md](../planning/01-header.md)
> 작성일: 2026-04-13
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
| results | Stock[] | O | 검색 결과 목록 |
| isLoading | boolean | O | 로딩 상태 |
| isError | boolean | O | 에러 상태 |
| onSelect | (stock: Stock) => void | O | 항목 선택 콜백 |

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

### GET /api/stocks/search

**요청:**
```typescript
interface SearchRequest {
  query: string;
}
```

**응답:**
```typescript
interface Stock {
  id: string;
  name: string;
}

interface SearchResponse {
  stocks: Stock[];
}
```

**에러 처리:**
- 네트워크/서버 에러: 드롭다운에 `검색 중 문제가 발생했습니다.` 표시
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
├── components/
│   └── Header/
│       ├── Header.tsx
│       ├── Logo.tsx
│       ├── GNB.tsx
│       ├── GNBTab.tsx
│       ├── SearchBar.tsx
│       ├── SearchDropdown.tsx
│       └── SearchResultItem.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── FeedPage.tsx
│   └── ScreenerPage.tsx
└── apis/
    └── stocks.ts          # 검색 API 함수
```

## 체크리스트

- [ ] 컴포넌트 구조 확정
- [ ] API 명세 확정
- [ ] 상태 관리 설계 확정
- [ ] 민서 승인 완료
