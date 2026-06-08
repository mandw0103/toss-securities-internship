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
4. `docs/spec/00-template.md`를 복사해 그 구조에 맞춰 스펙을 작성한다
5. 상태는 `초안`으로 설정한다
6. 작성 완료 후 민서에게 리뷰를 요청한다

## 문서 구조

FE 스펙 구조의 **단일 원천**은 `docs/spec/00-template.md`다. 이 파일을 복사해 작성하며, 구조(섹션·표·`변경 이력` 양식)를 이 스킬에 중복 정의하지 않는다 (ADR-002 단일 원천).

## 규칙

- 기획서에 정의된 요구사항만 스펙에 반영한다
- 기획서에 없는 기술적 판단이 필요한 경우 `[TODO: 민서 확인 필요]`로 표시한다
- 기술 스택은 프로젝트 표준을 따른다 (React, TanStack Query, Zustand, React Router)
- 스펙 상태는 반드시 `초안`으로 시작하며, 민서가 승인해야 `승인됨`으로 변경한다
- 스펙 번호와 분류 위치는 기획서와 동일하게 맞춘다 (기획서 `planning/common/01-header.md` → 스펙 `spec/common/01-header.md`)
- 기획서 링크의 상대경로는 분류 폴더 깊이를 반영한다 (`common/`, `<페이지명>/` 안에서는 `../../planning/<위치>/...` 형태)
