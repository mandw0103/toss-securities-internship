# 토스증권 클론 프로젝트 - Claude Code 운영 규칙

## 역할 정의

- **민서** = 기획자 + 스펙 작성자 + 리뷰어 (코드 직접 작성 금지)
- **Claude Code** = 구현자 (스펙에 명시된 것만 구현)

## 기술 스택

- Vite + React + TypeScript
- TanStack Query (서버 상태 관리)
- Zustand (클라이언트 상태 관리)
- React Router v6 (라우팅)

## 핵심 원칙

- FE 스펙 문서가 승인되기 전에는 코드를 한 줄도 작성하지 않는다
- 스펙에 없는 내용은 구현하지 않고, 반드시 민서에게 질문한다
- 스펙에 모호한 부분이 있으면 임의 해석하지 않고 질문한다
- 민서 승인 없이 라이브러리 추가 금지
- 여러 피처 동시 구현 금지 (한 번에 하나씩)

## 작업 사이클

모든 피처는 아래 순서를 따르며, 단계를 건너뛸 수 없다:

1. **기획서 작성** (write-planning) → 민서 확정 후 다음 단계
2. **FE 스펙 작성** (write-spec) → 민서 승인 후 다음 단계
3. **구현** (implement) → 구현 보고서 출력 후 다음 단계
4. **리뷰** (review) → 리뷰 보고서 출력 후 필요 시 문서/코드 수정
5. **커밋** (commit) → 커밋 스킬의 순서·분리 규칙에 따라 커밋

## 스킬 규칙

- 스킬은 `.claude/skills/<스킬명>/SKILL.md` 형태로 관리한다
- 스킬 파일에는 반드시 YAML frontmatter 메타 정보(name, description 등)를 포함한다

## 디렉토리 구조

```
/
├── .claude/
│   ├── claude.md        # 이 파일 (운영 규칙)
│   └── skills/          # 스킬 정의
│       └── <스킬명>/SKILL.md
├── docs/
│   ├── planning/                # 기획서 (Confluence 동기화)
│   │   ├── 00-template.md
│   │   ├── common/              # 여러 페이지에서 공통으로 쓰이는 요소 (예: header)
│   │   └── <페이지명>/           # 특정 페이지 전용 요소 (예: home/filter, home/list)
│   ├── spec/                    # FE 스펙 문서 (planning과 동일한 분류 구조)
│   │   ├── 00-template.md
│   │   ├── common/
│   │   └── <페이지명>/
│   └── adr/                     # 아키텍처 결정 기록
└── src/                 # 소스 코드
```
