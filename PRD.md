
# PRD.md

# 감성 분석 서비스 PRD (Antigravity AI 최적화 버전)

---

# 1. 프로젝트 개요

## 프로젝트명
Sentiment Analysis Service

## 프로젝트 목적

사용자가 입력한 문장의 감성을 AI가 분석하여 아래 정보를 제공하는 웹 서비스를 만든다.

- 긍정 / 부정 / 중립 감성 결과
- 신뢰도 백분율
- 감성 분석 이유
- 오류 메시지

본 프로젝트는 비전공자도 이해 가능한 구조와 코드 품질을 유지해야 한다.

---

# 2. 프로젝트 목표

이 프로젝트의 목표는 아래 기술을 활용한 최소 기능(MVP) 감성 분석 서비스를 구현하는 것이다.

- HTML
- CSS
- JavaScript
- Node.js
- OpenAI API
- Supabase
- Vercel

UI는 Dribbble 스타일의 감성적인 랜딩 페이지 디자인을 참고한다.

---

# 3. 핵심 기능 요구사항

## 3.1 텍스트 입력

사용자는 감성 분석을 원하는 문장을 입력할 수 있어야 한다.

### 입력 조건

- 최소 2자 이상
- 최대 500자 이하
- 빈 문자열 불가

### 오류 메시지

| 상황 | 메시지 |
|---|---|
| 빈 값 | 분석할 문장을 입력해주세요. |
| 너무 짧음 | 2자 이상 입력해주세요. |
| 너무 김 | 500자 이하로 입력해주세요. |

---

## 3.2 감성 분석 요청

사용자가 분석 버튼을 누르면 아래 흐름으로 처리한다.

```text
사용자 입력
→ Front-end fetch 요청
→ Node.js API
→ OpenAI API
→ 결과 반환
→ UI 렌더링
```

---

## 3.3 분석 결과 출력

반드시 아래 항목을 출력해야 한다.

| 항목 | 설명 |
|---|---|
| sentiment | 긍정 / 부정 / 중립 |
| confidence | 0~100 숫자 |
| reason | 분석 이유 |
| originalText | 사용자가 입력한 원문 |

응답 예시:

```json
{
  "sentiment": "긍정",
  "confidence": 92,
  "reason": "긍정 표현이 포함되어 있습니다."
}
```

---

## 3.4 오류 처리

반드시 사용자 친화적인 오류 메시지를 출력한다.

오류 상황:

- API 실패
- 서버 오류
- 환경 변수 누락
- 네트워크 실패
- 잘못된 입력값

---

# 4. UI/UX 요구사항

## 4.1 디자인 방향성

Dribbble 스타일 참고.

디자인 키워드:

- 미니멀
- 넓은 여백
- 둥근 모서리
- 큰 타이포그래피
- 핑크 포인트 컬러
- 부드러운 회색 배경
- 진한 남색 텍스트

---

## 4.2 레이아웃 구조

```text
Navbar
↓
Hero Section
↓
설명 문구
↓
검색형 입력창
↓
예시 버튼
↓
결과 카드
```

---

## 4.3 입력창 요구사항

- 알약 형태 입력창
- 둥근 버튼
- 핑크 포인트 컬러
- Enter 키 지원
- 글자 수 표시

---

## 4.4 결과 카드 요구사항

- 둥근 모서리
- 그림자 적용
- 감성별 배지 색상 구분
- 모바일 대응

배지 컬러:

| 감성 | 색상 |
|---|---|
| 긍정 | Green |
| 부정 | Red |
| 중립 | Gray |

---

# 5. 기술 스택

| 영역 | 기술 |
|---|---|
| Front-end | HTML, CSS, JavaScript |
| Back-end | Node.js + Express |
| AI | OpenAI API |
| DB | Supabase |
| Deploy | Vercel |

---

# 6. 폴더 구조

```text
project/
├─ public/
│  ├─ index.html
│  ├─ style.css
│  └─ app.js
│
├─ server/
│  └─ index.js
│
├─ docs/
│
├─ AGENTS.md
├─ PRD.md
├─ package.json
└─ vercel.json
```

---

# 7. API 요구사항

## Endpoint

```text
POST /api/analyze
```

## Request

```json
{
  "text": "오늘 정말 행복하다."
}
```

## Response

```json
{
  "sentiment": "긍정",
  "confidence": 95,
  "reason": "긍정 표현 포함"
}
```

---

# 8. OpenAI 구현 규칙

OpenAI 응답은 반드시 아래 규칙을 따른다.

- JSON 형식만 반환
- 한국어 사용
- 감성 결과는:
  - 긍정
  - 부정
  - 중립
  중 하나만 허용

---

# 9. Supabase 요구사항

## 테이블명

```text
sentiment_logs
```

## 필수 컬럼

| 컬럼명 | 타입 |
|---|---|
| id | uuid |
| input_text | text |
| sentiment | text |
| confidence | integer |
| reason | text |
| created_at | timestamp |

---

# 10. 환경 변수

```env
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

주의사항:

- API Key는 Front-end에 작성 금지
- .env 파일 Git 업로드 금지
- 서버 환경 변수만 사용

---

# 11. 비기능 요구사항

## 성능

- 감성 분석 응답은 수 초 내 완료되어야 한다.

## 보안

- API Key는 서버에서만 사용한다.
- 민감 정보는 브라우저에 노출하지 않는다.

## 반응형

아래 환경 지원:

- Desktop
- Tablet
- Mobile

---

# 12. 구현 제외 범위

AI 에이전트는 아래 기능을 구현하지 않는다.

- 로그인
- 회원가입
- 관리자 페이지
- 결제
- 차트
- 소셜 공유
- 이미지 업로드
- 음성 분석
- 다국어 지원

추가 기능을 추론하여 구현하지 않는다.

---

# 13. 완료 기준

아래 조건 충족 시 완료로 판단한다.

- 텍스트 입력 가능
- API 요청 가능
- 감성 분석 결과 출력 가능
- 오류 처리 가능
- Supabase 저장 가능
- 모바일 UI 정상 동작
- Vercel 배포 가능

---

# 14. 검증 체크리스트

| 테스트 | 기대 결과 |
|---|---|
| 빈 입력 | 오류 메시지 |
| 행복 문장 | 긍정 |
| 화난 문장 | 부정 |
| 평범한 문장 | 중립 |

---

# 15. Antigravity AI 작업 규칙

AI 에이전트는 반드시:

- AGENTS.md 규칙 준수
- docs 문서 참조
- 요청되지 않은 기능 추가 금지
- 폴더 구조 임의 변경 금지
- 불필요한 프레임워크 추가 금지
- 초보자 친화 코드 유지
- 이해 가능한 변수명 사용
- 명확한 주석 작성

---

# 16. 향후 확장 가능성 (현재 범위 제외)

현재 범위에는 포함되지 않지만 추후 확장 가능한 기능:

- 사용자 분석 기록
- 감정 차트
- AI 채팅 분석
- 사용자 계정
- 다국어 감성 분석
- 대시보드
