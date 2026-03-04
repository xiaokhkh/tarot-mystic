// ========== 二维码图片（Base64内嵌）==========
const QRCODE_BASE64 = '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';

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

// ========== 图片缓存 ==========
const imageCache = {};

// ========== 预加载所有塔罗牌图片（使用Base64数据） ==========
function preloadImages() {
    if (typeof CARD_IMAGES_BASE64 !== 'undefined') {
        // 使用预先生成的Base64图片数据
        TAROT_CARDS.forEach(card => {
            const base64Data = CARD_IMAGES_BASE64[card.id];
            if (base64Data) {
                const img = new Image();
                img.src = base64Data;
                img.onload = () => {
                    imageCache[card.id] = img;
                };
            }
        });
    }
}

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
    shareBtn: document.getElementById('share-btn'),
    restartBtn: document.getElementById('restart-btn')
};

// ========== 初始化 ==========
function init() {
    // 预加载所有塔罗牌图片
    preloadImages();
    
    // 绑定占卜方式选择
    document.querySelectorAll('.spread-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const spreadType = btn.dataset.spread;
            startReading(spreadType);
        });
    });

    // 绑定 AI 分析按钮
    elements.aiAnalyzeBtn.addEventListener('click', handleAIAnalysis);

    // 绑定分享按钮
    elements.shareBtn.addEventListener('click', handleShare);

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
        
        // 使用真实塔罗牌图片，图片占据主视觉
        const cardImage = card.image 
            ? `<img src="${card.image}" alt="${card.name}" class="card-img">` 
            : `<span class="card-emoji">${card.emoji}</span>`;
        
        cardEl.innerHTML = `
            <div class="card-front ${card.isReversed ? 'reversed' : ''}">
                ${cardImage}
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
        
        // 显示分享按钮
        elements.shareBtn.classList.remove('hidden');
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

// ========== 分享功能 ==========
async function handleShare() {
    elements.shareBtn.disabled = true;
    elements.shareBtn.textContent = '⏳ 生成长截图...';
    
    try {
        const imageUrl = await generateShareImage();
        downloadImage(imageUrl, '塔罗解读_' + new Date().toLocaleDateString('zh-CN').replace(/\//g, '-') + '.png');
        elements.shareBtn.textContent = '✅ 已保存图片';
        setTimeout(() => {
            elements.shareBtn.textContent = '📤 分享我的塔罗解读';
            elements.shareBtn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('生成长截图失败:', error);
        alert('生成长截图失败: ' + (error.message || error));
        elements.shareBtn.textContent = '📤 分享我的塔罗解读';
        elements.shareBtn.disabled = false;
    }
}

// ========== 生成长截图（html2canvas）==========
async function generateShareImage() {
    // 检查必要的库是否加载
    if (typeof html2canvas === 'undefined') {
        throw new Error('html2canvas 库未加载，请刷新页面重试');
    }
    
    // 1. 创建临时分享容器（用于截图）
    const shareContainer = document.createElement('div');
    shareContainer.id = 'share-container';
    shareContainer.style.cssText = `
        position: absolute;
        left: -10000px;
        top: 0;
        width: 375px;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        padding: 20px;
        font-family: 'Georgia', serif;
        box-sizing: border-box;
    `;
    
    // 2. 标题区域
    const header = document.createElement('div');
    header.style.cssText = 'text-align: center; padding: 20px 0; border-bottom: 1px solid rgba(255,215,0,0.3); margin-bottom: 20px;';
    header.innerHTML = `
        <h1 style="color: #ffd700; font-size: 24px; margin: 0;">✨ 神秘塔罗牌 ✨</h1>
        <p style="color: #a8a8a8; font-size: 14px; margin-top: 8px;">${gameState.currentSpread.name} · ${new Date().toLocaleDateString('zh-CN')}</p>
    `;
    shareContainer.appendChild(header);
    
    // 3. 卡牌展示区域
    const cardsSection = document.createElement('div');
    cardsSection.style.cssText = 'display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; padding: 10px 0;';
    
    gameState.drawnCards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.style.cssText = 'width: 100px; text-align: center;';
        
        // 尝试使用缓存的图片
        const cachedImg = imageCache[card.id];
        const cardImageHtml = cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0
            ? `<img src="${cachedImg.src}" style="width: 100%; height: 130px; object-fit: cover; border-radius: 8px; border: 2px solid #ffd700; ${card.isReversed ? 'transform: rotate(180deg);' : ''}">`
            : `<div style="width: 100%; height: 130px; background: #2a2a4a; border-radius: 8px; border: 2px solid #ffd700; display: flex; align-items: center; justify-content: center; font-size: 40px; ${card.isReversed ? 'transform: rotate(180deg);' : ''}">${card.emoji}</div>`;
        
        cardEl.innerHTML = `
            ${cardImageHtml}
            <p style="color: #ffd700; font-size: 12px; margin: 6px 0 2px; font-weight: bold;">${card.name}</p>
            <p style="color: ${card.isReversed ? '#e74c3c' : '#4CAF50'}; font-size: 11px; margin: 0;">${card.isReversed ? '逆位' : '正位'}</p>
            <p style="color: #a8a8a8; font-size: 10px; margin: 4px 0;">${card.position}</p>
        `;
        cardsSection.appendChild(cardEl);
    });
    shareContainer.appendChild(cardsSection);
    
    // 4. AI 解读区域
    if (!elements.aiResult.classList.contains('hidden')) {
        const aiSection = document.createElement('div');
        aiSection.style.cssText = 'margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid #6b5b95;';
        aiSection.innerHTML = `
            <h4 style="color: #ffd700; font-size: 16px; margin: 0 0 10px;">🔮 AI 深度解读</h4>
            <div style="color: #d8d8d8; font-size: 13px; line-height: 1.8;">${elements.aiResult.innerHTML}</div>
        `;
        shareContainer.appendChild(aiSection);
    }
    
    // 5. 底部信息
    const footer = document.createElement('div');
    footer.style.cssText = `
        margin-top: 25px;
        padding: 15px;
        text-align: center;
        border-top: 1px solid rgba(255,215,0,0.2);
    `;
    footer.innerHTML = `
        <p style="color: #666; font-size: 12px;">塔罗解读 · AI Qwen2.5-7B</p>
    `;
    shareContainer.appendChild(footer);
    
    // 6. 添加到页面
    document.body.appendChild(shareContainer);
    
    try {
        // 等待 DOM 渲染完成
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // 强制重排以获取正确高度
        shareContainer.offsetHeight;
        
        // 获取实际内容高度
        const contentHeight = shareContainer.scrollHeight;
        
        // 使用 html2canvas 生成长截图
        const canvas = await html2canvas(shareContainer, {
            backgroundColor: '#1a1a2e',
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: 375,
            height: contentHeight,
            windowWidth: 375,
            windowHeight: contentHeight
        });
        
        return canvas.toDataURL('image/png');
    } finally {
        // 清理临时容器
        if (document.body.contains(shareContainer)) {
            document.body.removeChild(shareContainer);
        }
    }
}

// ========== 辅助函数：下载图片 ==========
function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
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
    elements.shareBtn.classList.add('hidden');
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
