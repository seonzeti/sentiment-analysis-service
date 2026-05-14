require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Routes
app.post('/api/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text || text.length < 2 || text.length > 500) {
    return res.status(400).json({ error: '텍스트는 2자 이상 500자 이하로 입력해주세요.' });
  }

  try {
    // 1. OpenAI Sentiment Analysis
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using a fast and capable model
      messages: [
        {
          role: 'system',
          content: '문장의 감성을 분석하여 결과를 JSON 형식으로 응답하세요. 결과는 긍정, 부정, 중립 중 하나여야 하며, 신뢰도(0-100)와 분석 이유(한국어)를 포함해야 합니다. JSON 형식: {"sentiment": "긍정/부정/중립", "confidence": number, "reason": "문자열"}',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content);

    // 2. Log to Supabase
    const { error: supabaseError } = await supabase
      .from('sentiment_logs')
      .insert([
        {
          input_text: text,
          sentiment: result.sentiment,
          confidence: result.confidence,
          reason: result.reason,
        },
      ]);

    if (supabaseError) {
      console.error('Supabase Error:', supabaseError);
      // We still return the result even if logging fails, but maybe log it.
    }

    res.json(result);
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ error: '감성 분석 중 오류가 발생했습니다.' });
  }
});

// Serve frontend
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
