# [피처명] FE 스펙

> 기획서: [docs/planning/XX-피처명.md](../planning/)
> 작성일: YYYY-MM-DD
> 상태: 초안 | 리뷰 중 | **승인됨**

## 컴포넌트 구조

```
PageComponent
├── HeaderSection
│   └── ...
├── ContentSection
│   └── ...
└── FooterSection
    └── ...
```

## 컴포넌트 명세

### ComponentName

| 속성 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| prop1 | string | O | - | 설명 |
| prop2 | number | X | 0 | 설명 |

**동작:**
- 클릭 시 ~한다
- ~일 때 ~를 표시한다

## API 연동

### GET /api/example

**요청:**
```typescript
interface Request {
  param: string;
}
```

**응답:**
```typescript
interface Response {
  data: {
    id: number;
    name: string;
  }[];
}
```

**에러 처리:**
- 404: 빈 화면 표시
- 500: 에러 토스트 표시

## 상태 관리

### 서버 상태 (TanStack Query)
- Query Key: `['example', param]`
- Stale Time: 5분

### 클라이언트 상태 (Zustand)
- `selectedTab`: 현재 선택된 탭

## 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| /example | ExamplePage | 예시 페이지 |

## 스타일 가이드

- 반응형 기준: 모바일 퍼스트 (360px 기준)
- 색상: 토스증권 디자인 시스템 참조

## 체크리스트

- [ ] 컴포넌트 구조 확정
- [ ] API 명세 확정
- [ ] 상태 관리 설계 확정
- [ ] 민서 승인 완료
