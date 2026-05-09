---
name: write-spec
description: 승인된 기획서를 기반으로 docs/spec/ FE 스펙 문서를 작성한다
---

# FE 스펙 문서 작성 스킬

## 트리거

기획서가 확정된 후, 민서가 FE 스펙 작성을 요청했을 때 사용한다.

## 전제 조건

- 대상 피처의 기획서(`docs/planning/<공통 또는 페이지>/XX-피처명.md`)가 존재하고 내용이 확정되어 있어야 한다

## 작성 절차

1. 해당 기획서를 읽고 요구사항을 파악한다
2. 스펙 파일을 **기획서와 동일한 분류 위치**에 둔다
   - 기획서가 `docs/planning/common/01-header.md`이면 스펙은 `docs/spec/common/01-header.md`
   - 기획서가 `docs/planning/home/03-filter.md`이면 스펙은 `docs/spec/home/03-filter.md`
3. 파일 번호와 파일명은 기획서와 동일하게 맞춘다
4. 아래 **문서 구조**에 맞춰 스펙을 작성한다
5. 상태는 `초안`으로 설정한다
6. 작성 완료 후 민서에게 리뷰를 요청한다

## 문서 구조

```markdown
# [피처명] FE 스펙

> 기획서: [docs/planning/<위치>/XX-피처명.md](../../planning/<위치>/XX-피처명.md)
> 작성일: YYYY-MM-DD
> 상태: 초안 | 리뷰 중 | **승인됨**

## 컴포넌트 구조

트리 형태로 컴포넌트 계층을 표현한다.

## 컴포넌트 명세

### ComponentName

| 속성 | 타입 | 필수 | 설명 |
|------|------|------|------|

**동작:**
- ...

## API 연동

### METHOD /api/endpoint

**요청:**
TypeScript interface 정의

**응답:**
TypeScript interface 정의

**에러 처리:**
- 상태코드별 처리 방식

## 상태 관리

### 서버 상태 (TanStack Query)
- Query Key, Stale Time, enabled 조건 등

### 클라이언트 상태 (Zustand 또는 useState)
- 상태 항목과 용도

## 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|

## 파일 구조

해당 피처에서 생성/수정할 파일 목록을 트리로 표현한다.

## 체크리스트

- [ ] 컴포넌트 구조 확정
- [ ] API 명세 확정
- [ ] 상태 관리 설계 확정
- [ ] 민서 승인 완료
```

## 규칙

- 기획서에 정의된 요구사항만 스펙에 반영한다
- 기획서에 없는 기술적 판단이 필요한 경우 `[TODO: 민서 확인 필요]`로 표시한다
- 기술 스택은 프로젝트 표준을 따른다 (React, TanStack Query, Zustand, React Router)
- 스펙 상태는 반드시 `초안`으로 시작하며, 민서가 승인해야 `승인됨`으로 변경한다
- 스펙 번호와 분류 위치는 기획서와 동일하게 맞춘다 (기획서 `planning/common/01-header.md` → 스펙 `spec/common/01-header.md`)
- 기획서 링크의 상대경로는 분류 폴더 깊이를 반영한다 (`common/`, `<페이지명>/` 안에서는 `../../planning/<위치>/...` 형태)
