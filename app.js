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

// ========== 预加载所有塔罗牌图片并转换为 base64 ==========
function preloadImages() {
    TAROT_CARDS.forEach(card => {
        if (card.image) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = card.image;
            img.onload = () => {
                // 将图片转换为 base64 避免跨域问题
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const base64Img = new Image();
                    base64Img.src = canvas.toDataURL('image/jpeg', 0.9);
                    imageCache[card.id] = base64Img;
                } catch (e) {
                    console.warn('图片转换失败:', card.name, e);
                    imageCache[card.id] = img;
                }
            };
            img.onerror = () => {
                console.warn('图片加载失败:', card.image);
            };
        }
    });
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
    shareCanvas: document.getElementById('share-canvas'),
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
    elements.shareBtn.textContent = '⏳ 生成图片中...';
    
    try {
        const imageUrl = await generateShareImage();
        downloadImage(imageUrl, '塔罗解读_' + new Date().toLocaleDateString('zh-CN').replace(/\//g, '-') + '.png');
        elements.shareBtn.textContent = '✅ 已保存图片';
        setTimeout(() => {
            elements.shareBtn.textContent = '📤 分享我的塔罗解读';
            elements.shareBtn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('生成分享图片失败:', error);
        alert('生成分享图片失败，请重试');
        elements.shareBtn.textContent = '📤 分享我的塔罗解读';
        elements.shareBtn.disabled = false;
    }
}

// ========== 生成分享图片 ==========
async function generateShareImage() {
    const canvas = elements.shareCanvas;
    const ctx = canvas.getContext('2d');
    
    const cards = gameState.drawnCards;
    const spreadName = gameState.currentSpread.name;
    const userThought = elements.userThought.value.trim();
    const aiContent = elements.aiResult.innerText;
    
    // 提取 AI 解读关键词
    let aiSummary = aiContent;
    const startIdx = aiContent.indexOf('AI 深度解读');
    const endIdx = aiContent.indexOf('AI解读由');
    if (startIdx !== -1 && endIdx !== -1) {
        aiSummary = aiContent.substring(startIdx + 8, endIdx).trim();
    }
    aiSummary = aiSummary.substring(0, 300) + '...';
    
    // 设置画布尺寸
    const width = 800;
    const cardHeight = 280;
    const headerHeight = 120;
    const footerHeight = 60;
    const contentHeight = Math.max(300, Math.ceil(cards.length / 3) * (cardHeight + 20) + 200);
    const height = headerHeight + contentHeight + footerHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    // 绘制渐变背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 绘制装饰边框
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    
    // 绘制标题
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ 神秘塔罗牌 ✨', width / 2, 60);
    
    ctx.font = '20px Georgia, serif';
    ctx.fillStyle = '#a8a8a8';
    ctx.fillText(`${spreadName} · ${new Date().toLocaleDateString('zh-CN')}`, width / 2, 95);
    
    // 绘制卡牌
    const cardWidth = 150;
    const cardSpacing = 20;
    const startX = (width - Math.min(cards.length, 3) * (cardWidth + cardSpacing) + cardSpacing) / 2;
    let cardX = startX;
    let cardY = headerHeight + 30;
    
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // 绘制卡牌背景
        ctx.fillStyle = '#2a2a4a';
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 10);
        ctx.fill();
        ctx.stroke();
        
        // 绘制卡牌图片
        try {
            // 使用缓存的图片
            const cachedImg = imageCache[card.id];
            
            if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
                ctx.save();
                if (card.isReversed) {
                    ctx.translate(cardX + cardWidth / 2, cardY + cardHeight / 2);
                    ctx.rotate(Math.PI);
                    ctx.translate(-(cardX + cardWidth / 2), -(cardY + cardHeight / 2));
                }
                ctx.drawImage(cachedImg, cardX + 10, cardY + 10, cardWidth - 20, cardHeight - 80);
                ctx.restore();
            } else {
                // 如果缓存图片不可用，尝试实时加载
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.src = card.image + '?t=' + Date.now();
                
                await new Promise((resolve) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null);
                    setTimeout(() => resolve(img.complete ? img : null), 800);
                });
                
                if (img.complete && img.naturalWidth > 0) {
                    ctx.save();
                    if (card.isReversed) {
                        ctx.translate(cardX + cardWidth / 2, cardY + cardHeight / 2);
                        ctx.rotate(Math.PI);
                        ctx.translate(-(cardX + cardWidth / 2), -(cardY + cardHeight / 2));
                    }
                    ctx.drawImage(img, cardX + 10, cardY + 10, cardWidth - 20, cardHeight - 80);
                    ctx.restore();
                } else {
                    throw new Error('图片加载失败');
                }
            }
        } catch (e) {
            // 如果图片加载失败，绘制emoji和卡牌名称
            ctx.fillStyle = '#2a2a4a';
            ctx.fillRect(cardX + 10, cardY + 10, cardWidth - 20, cardHeight - 80);
            ctx.font = '50px serif';
            ctx.textAlign = 'center';
            ctx.fillText(card.emoji, cardX + cardWidth / 2, cardY + 80);
            ctx.font = '14px Georgia, serif';
            ctx.fillStyle = '#ffd700';
            ctx.fillText(card.english, cardX + cardWidth / 2, cardY + 120);
        }
        
        // 绘制卡牌名称
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 16px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText(card.name, cardX + cardWidth / 2, cardY + cardHeight - 45);
        
        // 绘制正逆位
        ctx.fillStyle = card.isReversed ? '#e74c3c' : '#4CAF50';
        ctx.font = '14px Georgia, serif';
        ctx.fillText(card.isReversed ? '逆位' : '正位', cardX + cardWidth / 2, cardY + cardHeight - 25);
        
        // 绘制位置标签
        ctx.fillStyle = '#888';
        ctx.font = '12px Georgia, serif';
        ctx.fillText(card.position, cardX + cardWidth / 2, cardY + cardHeight - 8);
        
        // 换行
        if ((i + 1) % 3 === 0) {
            cardX = startX;
            cardY += cardHeight + 40;
        } else {
            cardX += cardWidth + cardSpacing;
        }
    }
    
    // 绘制问题
    let textY = cardY + cardHeight + 50;
    ctx.fillStyle = '#e8d5b7';
    ctx.font = '16px Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText('🎯 我的问题：' + userThought, 40, textY);
    
    // 绘制 AI 解读
    textY += 40;
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 18px Georgia, serif';
    ctx.fillText('🔮 AI 解读', 40, textY);
    
    textY += 30;
    ctx.fillStyle = '#c8c8c8';
    ctx.font = '14px Georgia, serif';
    
    // 自动换行
    const maxWidth = width - 80;
    const lines = wrapText(ctx, aiSummary, maxWidth);
    lines.forEach((line, index) => {
        ctx.fillText(line, 40, textY + index * 22);
    });
    
    // 绘制底部
    const footerY = height - 45;
    ctx.fillStyle = '#666';
    ctx.font = '14px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('塔罗解读 · AI Qwen2.5-7B', width / 2, footerY);
    
    // 返回图片 URL
    return canvas.toDataURL('image/png');
}

// ========== 辅助函数：圆角矩形 ==========
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// ========== 辅助函数：文本换行 ==========
function wrapText(ctx, text, maxWidth) {
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < text.length; i++) {
        const testLine = currentLine + text[i];
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = text[i];
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    return lines;
}

// ========== 辅助函数：绘制圆角矩形 ==========
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
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
