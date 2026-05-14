document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('analyze-form');
    const input = document.getElementById('text-input');
    const submitBtn = document.getElementById('submit-btn');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('result-container');
    const errorMessage = document.getElementById('error-message');
    
    const sentimentBadge = document.getElementById('sentiment-badge');
    const confidenceValue = document.getElementById('confidence-value');
    const reasonText = document.getElementById('reason-text');
    
    const exampleBtns = document.querySelectorAll('.example-btn');

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = input.value.trim();

        // Validation
        if (!text || text.length < 2) {
            showError('최소 2자 이상 입력해주세요.');
            return;
        }
        if (text.length > 500) {
            showError('최대 500자까지 입력 가능합니다.');
            return;
        }

        analyzeSentiment(text);
    });

    // Handle example buttons
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            input.value = btn.textContent;
            analyzeSentiment(btn.textContent);
        });
    });

    async function analyzeSentiment(text) {
        // UI Reset
        errorMessage.classList.add('hidden');
        resultContainer.classList.add('hidden');
        loading.classList.remove('hidden');
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '분석 중 오류가 발생했습니다.');
            }

            // Update UI with results
            displayResult(data);
        } catch (error) {
            showError(error.message);
        } finally {
            loading.classList.add('hidden');
            submitBtn.disabled = false;
        }
    }

    function displayResult(data) {
        sentimentBadge.textContent = data.sentiment;
        sentimentBadge.className = `badge ${data.sentiment}`;
        confidenceValue.textContent = `${data.confidence}%`;
        reasonText.textContent = data.reason;

        resultContainer.classList.remove('hidden');
        
        // Smooth scroll to result on mobile
        if (window.innerWidth <= 768) {
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function showError(message) {
        errorMessage.querySelector('p').textContent = message;
        errorMessage.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        loading.classList.add('hidden');
    }
});
