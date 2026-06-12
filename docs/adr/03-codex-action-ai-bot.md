# ADR-003: Codex GitHub Action 기반 AI 리뷰 봇

> 작성일: 2026-06-12
> 상태: 제안됨 | **채택됨** | 폐기됨
> 관련 이슈: #22 (AI 코드 리뷰 봇 연동)
> 참고: [OpenAI Codex GitHub Action](https://developers.openai.com/codex/github-action), [openai/codex-action](https://github.com/openai/codex-action), [Anthropic Claude Code Action](https://github.com/anthropics/claude-code-action)

## 맥락

- PR이나 이슈에서 AI를 멘션하면 코드 리뷰, 구현 보조, Q&A를 처리하는 자동화가 필요하다.
- Claude에는 `anthropics/claude-code-action` 기반 사례가 있지만, 현재 프로젝트의 작업 주체와 운영 규칙은 Codex 중심이다.
- OpenAI는 GitHub Actions에서 Codex를 실행하는 공식 액션 `openai/codex-action@v1`을 제공한다. 이 액션은 Codex CLI 설치, OpenAI Responses API 프록시 실행, `codex exec` 실행, 최종 응답 출력 기능을 제공한다.
- 이 작업은 FE 피처가 아니라 도구/CI 자동화이므로 `docs/planning`·`docs/spec`가 아니라 ADR로 결정과 범위를 기록한다.

## 고려한 선택지

### 선택지 1: Claude Code Action 사용
- 장점: 멘션 기반 봇 사례와 문서가 풍부하다
- 단점: 프로젝트 운영 주체가 Codex이고, Codex 규칙·스킬·ADR 흐름과 맞지 않는다

### 선택지 2: Codex GitHub Action을 댓글 멘션 기반으로 구성
- 장점: 공식 OpenAI 액션을 사용하고, 기존 `AGENTS.md`와 `.codex/codex.md` 규칙을 그대로 반영할 수 있다
- 단점: Claude 예시처럼 완성된 멘션 봇을 그대로 가져오는 방식은 아니므로 워크플로우에서 트리거·권한·댓글 게시를 직접 설계해야 한다

### 선택지 3: 직접 OpenAI API 호출 스크립트 작성
- 장점: 응답 포맷과 라우팅을 세밀하게 제어할 수 있다
- 단점: 인증, 프롬프트 실행, 샌드박스, 결과 수집을 직접 관리해야 하므로 유지보수 비용이 크다

## 결정

**선택지 2를 채택한다.** `.github/workflows/codex-mention.yml`에서 `@codex` 멘션을 감지해 `openai/codex-action@v1`을 실행하고, 최종 응답을 이슈 또는 PR 댓글로 게시한다.

- **트리거**
  - `issue_comment.created`: 이슈 본문 댓글 및 PR 대화 탭 댓글
  - `pull_request_review_comment.created`: PR 파일 변경사항의 인라인 댓글
- **호출 문구**
  - Claude의 `@claude` 대신 Codex 기준으로 `@codex`를 사용한다.
- **권한 제한**
  - 댓글 작성자가 bot이면 실행하지 않는다.
  - `OWNER`, `MEMBER`, `COLLABORATOR` 작성자만 실행한다.
  - `openai/codex-action`의 기본 실행자 제한도 유지한다. 기본적으로 저장소 write 권한이 있는 사용자만 액션 실행이 허용된다.
  - `safety-strategy: drop-sudo`를 명시해 GitHub-hosted Linux runner에서 Codex 실행 전 `sudo` 권한을 제거한다.
- **API 키**
  - GitHub Actions secret `OPENAI_API_KEY`를 사용한다.
  - 민서는 저장소 Settings > Secrets and variables > Actions에 `OPENAI_API_KEY`를 등록해야 한다.
- **동작 범위**
  - Codex는 저장소를 읽고, 필요 시 워크스페이스 안에서 패치 초안을 만들 수 있다.
  - 첫 버전에서는 결과를 댓글로 게시한다.
  - 자동 커밋·자동 push·자동 PR 생성은 보안 권한과 책임 범위가 커서 이번 사이클에서 제외한다.
- **운영 규칙**
  - Codex는 `AGENTS.md`와 `.codex/codex.md`를 우선 준수한다.
  - FE 피처 구현 요청은 승인된 기획서·스펙 없이는 코드 작성을 진행하지 않고, 민서 확인이 필요한 항목을 댓글에 명시한다.
  - 도구/CI 자동화 요청은 ADR에 기록해야 한다.

## 결과

- 이슈나 PR에서 신뢰 사용자가 `@codex`를 멘션하면 Codex가 질문 답변, 코드 리뷰, 구현 방향 제안을 댓글로 남길 수 있다.
- `OPENAI_API_KEY` secret이 없거나 유효하지 않으면 액션은 실패한다.
- 자동 커밋을 하지 않으므로 의도치 않은 코드 변경이 원격 브랜치에 바로 반영되는 위험을 줄인다.
- 이후 필요하면 별도 ADR에서 `contents: write` 권한, 브랜치 push, PR 생성까지 확장할 수 있다.
