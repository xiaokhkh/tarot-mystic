// 塔罗牌数据 - 大阿卡纳 22张
const TAROT_CARDS = [
    {
        id: 0,
        name: "愚者",
        english: "The Fool",
        emoji: "🃏",
        upright: "新的开始、自由、冒险、天真、自发",
        reversed: "鲁莽、不负责任、冒险过度、缺乏计划"
    },
    {
        id: 1,
        name: "魔术师",
        english: "The Magician",
        emoji: "🎭",
        upright: "创造力、技能、意志力、自信、新机会",
        reversed: "欺骗、操纵、才能浪费、缺乏方向"
    },
    {
        id: 2,
        name: "女祭司",
        english: "The High Priestess",
        emoji: "🌙",
        upright: "直觉、神秘、潜意识、内在智慧",
        reversed: "隐藏的议程、信息被隐瞒、脱离内在"
    },
    {
        id: 3,
        name: "女皇",
        english: "The Empress",
        emoji: "👑",
        upright: "丰饶、母性、自然、创造、养育",
        reversed: "依赖他人、创造力受阻、缺乏成长"
    },
    {
        id: 4,
        name: "皇帝",
        english: "The Emperor",
        emoji: "🏛️",
        upright: "权威、结构、控制、父亲形象、领导力",
        reversed: "专制、僵化、控制欲过强、缺乏纪律"
    },
    {
        id: 5,
        name: "教皇",
        english: "The Hierophant",
        emoji: "⛪",
        upright: "传统、精神指导、信仰、教育、婚姻",
        reversed: "打破传统、挑战权威、个人信念"
    },
    {
        id: 6,
        name: "恋人",
        english: "The Lovers",
        emoji: "💕",
        upright: "爱情、和谐、关系、价值观一致、选择",
        reversed: "不和谐、失衡、价值观冲突、错误选择"
    },
    {
        id: 7,
        name: "战车",
        english: "The Chariot",
        emoji: "🏇",
        upright: "胜利、意志力、决心、控制、进取",
        reversed: "失控、侵略性、缺乏方向、挫败"
    },
    {
        id: 8,
        name: "力量",
        english: "Strength",
        emoji: "🦁",
        upright: "勇气、内在力量、耐心、温柔的控制",
        reversed: "自我怀疑、软弱、缺乏自信"
    },
    {
        id: 9,
        name: "隐士",
        english: "The Hermit",
        emoji: "🏔️",
        upright: "内省、寻求真理、孤独、智慧、指导",
        reversed: "孤立、孤独、退缩、拒绝帮助"
    },
    {
        id: 10,
        name: "命运之轮",
        english: "Wheel of Fortune",
        emoji: "☸️",
        upright: "命运、转折点、好运、循环、机遇",
        reversed: "厄运、抗拒改变、打破循环"
    },
    {
        id: 11,
        name: "正义",
        english: "Justice",
        emoji: "⚖️",
        upright: "公正、真理、因果、法律、平衡",
        reversed: "不公、不诚实、逃避责任"
    },
    {
        id: 12,
        name: "倒吊人",
        english: "The Hanged Man",
        emoji: "🙃",
        upright: "暂停、牺牲、新视角、等待、放下",
        reversed: "拖延、抗拒、无谓牺牲、僵局"
    },
    {
        id: 13,
        name: "死神",
        english: "Death",
        emoji: "💀",
        upright: "结束、转变、过渡、放下、新生",
        reversed: "抗拒改变、停滞、无法放手"
    },
    {
        id: 14,
        name: "节制",
        english: "Temperance",
        emoji: "🌟",
        upright: "平衡、和谐、耐心、适度、治愈",
        reversed: "失衡、过度、缺乏耐心、冲突"
    },
    {
        id: 15,
        name: "恶魔",
        english: "The Devil",
        emoji: "😈",
        upright: "束缚、物质主义、诱惑、阴暗面",
        reversed: "解脱、打破束缚、恢复控制"
    },
    {
        id: 16,
        name: "塔",
        english: "The Tower",
        emoji: "🗼",
        upright: "突变、毁灭、觉醒、真相大白",
        reversed: "避免灾难、恐惧改变、延迟崩溃"
    },
    {
        id: 17,
        name: "星星",
        english: "The Star",
        emoji: "⭐",
        upright: "希望、灵感、宁静、更新、信念",
        reversed: "绝望、缺乏信心、脱节"
    },
    {
        id: 18,
        name: "月亮",
        english: "The Moon",
        emoji: "🌕",
        upright: "幻觉、恐惧、焦虑、潜意识、直觉",
        reversed: "释放恐惧、压抑情绪、混乱消退"
    },
    {
        id: 19,
        name: "太阳",
        english: "The Sun",
        emoji: "☀️",
        upright: "快乐、成功、活力、积极、光明",
        reversed: "暂时的挫折、过度乐观、内在小孩"
    },
    {
        id: 20,
        name: "审判",
        english: "Judgement",
        emoji: "📯",
        upright: "反思、清算、觉醒、重生、召唤",
        reversed: "自我怀疑、拒绝召唤、逃避审判"
    },
    {
        id: 21,
        name: "世界",
        english: "The World",
        emoji: "🌍",
        upright: "完成、成就、旅程结束、圆满、整合",
        reversed: "未完成、缺乏结束、延迟成功"
    }
];

// 牌阵类型配置
const SPREADS = {
    single: {
        name: "单张牌",
        count: 1,
        positions: ["当前指引"]
    },
    three: {
        name: "三张牌",
        count: 3,
        positions: ["过去", "现在", "未来"]
    },
    cross: {
        name: "凯尔特十字",
        count: 10,
        positions: [
            "现状",
            "挑战/障碍",
            "根源/过去",
            "近期的过去",
            "最佳可能的结果",
            "近期的未来",
            "你的态度",
            "外部环境",
            "希望与恐惧",
            "最终结果"
        ]
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TAROT_CARDS, SPREADS };
}
