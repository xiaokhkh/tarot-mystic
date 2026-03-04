// ========== AI API 配置 ==========
const AI_CONFIG = {
    apiUrl: 'https://api.siliconflow.cn/v1/chat/completions',
    apiKey: 'sk-iwpdzrsirmvqgcvgqqfczpblpzfjflgcpehflhyvlchwsefz',
    model: 'Qwen/Qwen2.5-7B-Instruct'
};

// ========== 游戏状态 ==========
let gameState = {
    currentSpread: null,
    cardsToDraw: 0,
    drawnCards: [],
    deck: [],
    userThought: ''
};

// ========== DOM 元素 ==========
const screens = {
    home: document.getElementById('home-screen'),
    draw: document.getElementById('draw-screen'),
    result: document.getElementById('result-screen')
};

const elements = {
    cardDeck: document.getElementById('card-deck'),
    cardsDisplay: document.getElementById('cards-display'),
    remainingCount: document.getElementById('remaining-count'),
    userThought: document.getElementById('user-thought'),
    aiAnalyzeBtn: document.getElementById('ai-analyze-btn'),
    aiResult: document.getElementById('ai-result'),
    restartBtn: document.getElementById('restart-btn')
};

// ========== 初始化 ==========
function init() {
    // 绑定占卜方式选择
    document.querySelectorAll('.spread-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const spreadType = btn.dataset.spread;
            startReading(spreadType);
        });
    });

    // 绑定 AI 分析按钮
    elements.aiAnalyzeBtn.addEventListener('click', handleAIAnalysis);

    // 绑定重新占卜按钮
    elements.restartBtn.addEventListener('click', resetGame);
}

// ========== 开始占卜 ==========
function startReading(spreadType) {
    const spread = SPREADS[spreadType];
    
    gameState.currentSpread = spread;
    gameState.cardsToDraw = spread.count;
    gameState.drawnCards = [];
    gameState.deck = shuffleDeck([...TAROT_CARDS]);
    
    showScreen('draw');
    renderCardDeck();
    updateRemainingCount();
}

// ========== 洗牌 ==========
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// ========== 渲染牌背 ==========
function renderCardDeck() {
    elements.cardDeck.innerHTML = '';
    
    // 渲染 22 张牌背供选择
    for (let i = 0; i < 22; i++) {
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.dataset.index = i;
        cardBack.addEventListener('click', () => drawCard(i, cardBack));
        elements.cardDeck.appendChild(cardBack);
    }
}

// ========== 抽牌 ==========
function drawCard(deckIndex, cardElement) {
    if (gameState.cardsToDraw <= 0) return;
    if (cardElement.classList.contains('selected')) return;

    // 标记已选
    cardElement.classList.add('selected');

    // 随机抽取一张牌
    const randomIndex = Math.floor(Math.random() * gameState.deck.length);
    const card = gameState.deck.splice(randomIndex, 1)[0];
    
    // 随机决定正逆位
    const isReversed = Math.random() > 0.5;
    
    // 记录抽到的牌
    const drawnCard = {
        ...card,
        isReversed,
        position: gameState.currentSpread.positions[gameState.drawnCards.length]
    };
    
    gameState.drawnCards.push(drawnCard);
    gameState.cardsToDraw--;
    
    updateRemainingCount();

    // 抽完所有牌后显示结果
    if (gameState.cardsToDraw === 0) {
        setTimeout(() => showResults(), 500);
    }
}

// ========== 更新剩余牌数 ==========
function updateRemainingCount() {
    elements.remainingCount.textContent = gameState.cardsToDraw;
}

// ========== 显示结果 ==========
function showResults() {
    showScreen('result');
    renderCards();
    elements.aiResult.classList.add('hidden');
    elements.userThought.value = '';
}

// ========== 渲染牌面 ==========
function renderCards() {
    elements.cardsDisplay.innerHTML = '';
    
    gameState.drawnCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card-result';
        cardEl.style.animationDelay = `${index * 0.1}s`;
        
        cardEl.innerHTML = `
            <div class="card-front ${card.isReversed ? 'reversed' : ''}">
                <span class="card-number">${card.english}</span>
                <span class="card-emoji">${card.emoji}</span>
                <span class="card-name">${card.name}</span>
                <span class="card-position">${card.isReversed ? '逆位' : '正位'}</span>
            </div>
            <div class="card-label">${card.position}</div>
            <div class="card-meaning">${card.isReversed ? card.reversed : card.upright}</div>
        `;
        
        elements.cardsDisplay.appendChild(cardEl);
    });
}

// ========== AI 分析 ==========
async function handleAIAnalysis() {
    const userThought = elements.userThought.value.trim();
    
    if (!userThought) {
        alert('请输入你的想法，AI才能为你解读 ✨');
        return;
    }

    // 显示加载状态
    elements.aiAnalyzeBtn.disabled = true;
    elements.aiAnalyzeBtn.innerHTML = '<span class="loading"></span> 正在解读...';
    
    try {
        // 调用真实 AI API
        const analysis = await callAI(userThought);
        
        // 显示结果
        elements.aiResult.innerHTML = `
            <h4>🔮 AI 深度解读</h4>
            <div>${analysis}</div>
        `;
        elements.aiResult.classList.remove('hidden');
    } catch (error) {
        console.error('AI API 调用失败:', error);
        elements.aiResult.innerHTML = `
            <h4>❌ 解读失败</h4>
            <div>AI 服务暂时不可用，请稍后重试。<br>错误信息：${error.message}</div>
        `;
        elements.aiResult.classList.remove('hidden');
    }
    
    // 恢复按钮
    elements.aiAnalyzeBtn.disabled = false;
    elements.aiAnalyzeBtn.textContent = '🔮 AI深度解读';
}

// ========== 调用真实 AI API ==========
async function callAI(userThought) {
    const cards = gameState.drawnCards;
    const spreadName = gameState.currentSpread.name;
    
    // 构建牌面信息
    const cardDetails = cards.map(c => ({
        position: c.position,
        name: c.name,
        english: c.english,
        isReversed: c.isReversed,
        meaning: c.isReversed ? c.reversed : c.upright
    }));
    
    // 构建 prompt
    const systemPrompt = `你是一位专业的塔罗牌占卜师，拥有深厚的塔罗知识和灵性洞察力。你的解读风格温暖、富有启发性，能够给予求问者有价值的指引。请用中文回答。`;

    const userPrompt = `请为求问者解读以下塔罗牌阵：

牌阵类型：${spreadName}

抽到的牌：
${cardDetails.map(c => `- ${c.position}：${c.name}（${c.english}）${c.isReversed ? '逆位' : '正位'} - 含义：${c.meaning}`).join('\n')}

求问者的问题或想法：${userThought}

请提供：
1. 整体牌面能量分析
2. 每张牌在对应位置的解读
3. 综合建议和指引

请用温暖、专业、有启发性的语调回答，控制在300字以内。`;

    // 调用 API
    const response = await fetch(AI_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.8,
            max_tokens: 1000
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API请求失败 (${response.status})`);
    }

    const data = await response.json();
    const aiContent = data.choices[0]?.message?.content || '无法获取AI解读';
    
    // 格式化输出
    return formatAIResponse(aiContent, cardDetails, userThought);
}

// ========== 格式化 AI 响应 ==========
function formatAIResponse(aiContent, cardDetails, userThought) {
    // 将 AI 内容转换为 HTML 格式
    const formattedContent = aiContent
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 构建牌面摘要
    const cardSummary = cardDetails.map(c => 
        `${c.position}：${c.name}（${c.isReversed ? '逆位' : '正位'}）`
    ).join(' | ');
    
    return `
        <p><strong>🎯 你的问题：</strong>${userThought}</p>
        <p><strong>🎴 牌面：</strong>${cardSummary}</p>
        <hr style="border-color: rgba(255,255,255,0.2); margin: 15px 0;">
        <p>${formattedContent}</p>
        <p style="margin-top:15px;color:#888;font-size:0.9rem;">💡 AI解读由 Qwen2.5-7B 提供</p>
    `;
}

// ========== 重新占卜 ==========
function resetGame() {
    gameState = {
        currentSpread: null,
        cardsToDraw: 0,
        drawnCards: [],
        deck: [],
        userThought: ''
    };
    showScreen('home');
}

// ========== 屏幕切换 ==========
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// ========== 启动 ==========
document.addEventListener('DOMContentLoaded', init);
