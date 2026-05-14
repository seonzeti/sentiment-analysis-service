# Back-end API 가이드

## 서버
- Node.js
- Express

## API
```text
POST /api/analyze
```

## 요청 예시
```json
{
  "text": "오늘 기분이 좋아요."
}
```

## 응답 예시
```json
{
  "sentiment": "긍정",
  "confidence": 92,
  "reason": "긍정 표현 포함"
}
```
