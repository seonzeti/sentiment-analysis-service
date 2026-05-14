# OpenAI 및 Supabase 가이드

## OpenAI 규칙
- 결과는 긍정/부정/중립
- JSON 형식 유지
- reason은 한국어

## 프롬프트 예시
```text
문장의 감성을 분석하세요.
```

## Supabase
테이블:
```text
sentiment_logs
```

컬럼:
- input_text
- sentiment
- confidence
- reason
