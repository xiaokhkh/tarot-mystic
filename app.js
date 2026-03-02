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

// ========== AI 分析（模拟） ==========
async function handleAIAnalysis() {
    const userThought = elements.userThought.value.trim();
    
    if (!userThought) {
        alert('请输入你的想法，AI才能为你解读 ✨');
        return;
    }

    // 显示加载状态
    elements.aiAnalyzeBtn.disabled = true;
    elements.aiAnalyzeBtn.innerHTML = '<span class="loading"></span> 正在解读...';
    
    // 模拟 AI 响应（后续接入真实 API）
    await simulateDelay(2000);
    
    // 生成分析结果
    const analysis = generateAIAnalysis(userThought);
    
    // 显示结果
    elements.aiResult.innerHTML = `
        <h4>🔮 AI 深度解读</h4>
        <div>${analysis}</div>
    `;
    elements.aiResult.classList.remove('hidden');
    
    // 恢复按钮
    elements.aiAnalyzeBtn.disabled = false;
    elements.aiAnalyzeBtn.textContent = '🔮 AI深度解读';
}

// ========== 生成模拟 AI 分析 ==========
function generateAIAnalysis(userThought) {
    const cards = gameState.drawnCards;
    
    // 构建牌面信息
    const cardSummary = cards.map(c => 
        `${c.position}: ${c.name}(${c.isReversed ? '逆位' : '正位'})`
    ).join('、');
    
    // 模拟分析（后续接入真实 AI API）
    let analysis = `<p><strong>牌面：</strong>${cardSummary}</p>`;
    analysis += `<p><strong>你的问题：</strong>${userThought}</p>`;
    analysis += `<p><strong>解读：</strong></p>`;
    
    // 根据牌阵生成解读
    if (cards.length === 1) {
        const card = cards[0];
        analysis += `<p>${card.name}${card.isReversed ? '逆位' : '正位'}提醒你：${card.isReversed ? card.reversed : card.upright}。这是一个重要的指引，特别是在你提到的"${userThought}"方面。请倾听内心的声音。</p>`;
    } else if (cards.length === 3) {
        analysis += `<p><strong>过去</strong>的影响：${cards[0].name}显示${cards[0].isReversed ? cards[0].reversed : cards[0].upright}。</p>`;
        analysis += `<p><strong>现在</strong>的状态：${cards[1].name}提示${cards[1].isReversed ? cards[1].reversed : cards[1].upright}。</p>`;
        analysis += `<p><strong>未来</strong>的可能：${cards[2].name}预示${cards[2].isReversed ? cards[2].reversed : cards[2].upright}。</p>`;
        analysis += `<p>综合来看，关于"${userThought}"，牌面提示你需要关注当下的选择，未来是可以改变的。</p>`;
    } else if (cards.length === 10) {
        analysis += `<p><strong>现状</strong>：${cards[0].name} - ${cards[0].isReversed ? cards[0].reversed : cards[0].upright}</p>`;
        analysis += `<p><strong>挑战</strong>：${cards[1].name} - ${cards[1].isReversed ? cards[1].reversed : cards[1].upright}</p>`;
        analysis += `<p><strong>结果</strong>：${cards[9].name} - ${cards[9].isReversed ? cards[9].reversed : cards[9].upright}</p>`;
        analysis += `<p>关于"${userThought}"，凯尔特十字展现了完整的时间线和影响因素。建议你重点关注挑战牌和结果牌，它们揭示了解决问题的关键。</p>`;
    }
    
    analysis += `<p style="margin-top:15px;color:#888;font-size:0.9rem;">💡 提示：这是模拟分析，后续将接入真实AI解读。</p>`;
    
    return analysis;
}

// ========== 模拟延迟 ==========
function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
