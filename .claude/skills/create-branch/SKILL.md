---
name: create-branch
description: 이슈 번호와 연결된 일관된 이름의 작업 브랜치를 생성한다
---

# 브랜치 생성 스킬

## 트리거

민서가 새 작업 브랜치 생성을 요청했을 때 사용한다.

## 브랜치 이름 규칙

- 형식: `issues/<이슈번호>` (예: GitHub 이슈 #8 → `issues/8`)
- `<이슈번호>`는 **개발 대상 GitHub 이슈 번호와 반드시 일치**시킨다
  - 브랜치 번호 ↔ 이슈 번호 ↔ 커밋 접두사 `[ISSUE-N]`의 번호가 **모두 같아야 한다**
  - 이는 추후 **커스텀 오토링크**(`ISSUE-` 프리픽스 → 이슈 링크)를 쓰기 위한 사전 정렬이다
- 모든 브랜치는 **항상 동일한 형식**을 쓴다
  - `issue/N`(단수), `feature/...` 등 다른 형식과 섞지 않는다 (일관성 유지)

## 베이스 브랜치 규칙

- 새 브랜치는 **항상 `main`에서 분리**한다 (PR base도 항상 `main`과 일치 → pull-request 스킬 참고)
- GitHub 설정상 기본 브랜치가 `main`이 아닐 수 있으므로, **설정값을 맹신하지 말고** 최신 통합 브랜치(`main`)를 베이스로 둔다
- 분리 전 `git fetch` 후 로컬 `main`이 `origin/main`과 동기화됐는지 확인한다

## 절차

1. 개발 대상 이슈 번호를 확인한다 (`gh issue view <번호>`)
2. **브랜치 이름과 베이스 브랜치를 민서에게 보여주고 컨펌받는다** (바로 만들지 않는다)
3. `git fetch` 후 `git checkout -b issues/<번호> main`
4. 민서가 푸시를 요청하면 `git push -u origin issues/<번호>`로 추적까지 설정한다
   - GCM 인증 창에서 멈추면, 설정 변경 없이 일회성으로 우회한다:
     `git -c credential.helper= -c credential.helper='!gh auth git-credential' push -u origin issues/<번호>`

## 규칙

- 한 이슈당 하나의 브랜치만 만든다
- 민서 컨펌 없이 브랜치를 생성하지 않는다
- 기본 브랜치 변경 등 **admin 권한이 필요한 작업**은 권한이 없으면 무리하게 시도하지 말고 민서에게 보고한다
