# Tarot Game Design Document

**Version:** 1.0  
**Date:** March 2, 2026  
**Author:** AI Assistant

---

## 1. Game Overview

### 1.1 Concept
A mystical tarot card reading experience that combines traditional tarot wisdom with modern AI-powered interpretations. Players can draw cards from three different spread types and receive personalized readings.

### 1.2 Target Audience
- Users interested in spirituality and self-reflection
- Tarot enthusiasts seeking digital reading experiences
- Casual users looking for daily guidance

### 1.3 Platform
- Web-based (HTML5/CSS3/JavaScript)
- Mobile-responsive design

---

## 2. Game Features

### 2.1 Card Spread Types

| Spread | Cards | Purpose | Complexity |
|--------|-------|---------|------------|
| **Single Card** | 1 | Quick daily guidance | Beginner |
| **Three Card** | 3 | Past · Present · Future | Intermediate |
| **Celtic Cross** | 10 | Deep comprehensive reading | Advanced |

### 2.2 Tarot Deck
- **Major Arcana only** (22 cards)
- Each card includes:
  - Chinese name
  - English name
  - Emoji symbol
  - Upright meaning
  - Reversed meaning

### 2.3 Card Position System
- Cards can be drawn in **Upright** or **Reversed** position
- Random orientation (50/50 chance)
- Different meanings based on position

---

## 3. Gameplay Flow

### 3.1 User Journey

```
┌─────────────────┐
│   Home Screen   │
│  Select Spread  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Draw Screen   │
│  Click to Draw  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Result Screen  │
│  View Cards +   │
│  AI Analysis    │
└─────────────────┘
```

### 3.2 Detailed Steps

1. **Spread Selection**
   - User chooses one of three spread types
   - Each spread has different card count and position meanings

2. **Card Drawing**
   - 22 card backs displayed face-down
   - User clicks to draw required number of cards
   - Cards are randomly selected from shuffled deck
   - Each card randomly assigned upright/reversed position

3. **Result Display**
   - Cards revealed with position labels
   - Card meanings shown based on orientation
   - User can input personal thoughts

4. **AI Analysis** (Simulated)
   - User enters their question or concern
   - AI generates personalized interpretation
   - Comprehensive reading based on all drawn cards

---

## 4. Spread Position Meanings

### 4.1 Single Card Spread
| Position | Meaning |
|----------|---------|
| 1 | Current Guidance |

### 4.2 Three Card Spread
| Position | Meaning |
|----------|---------|
| 1 | Past |
| 2 | Present |
| 3 | Future |

### 4.3 Celtic Cross Spread (10 Cards)
| Position | Meaning |
|----------|---------|
| 1 | Present Situation |
| 2 | Challenge/Obstacle |
| 3 | Root Cause/Past |
| 4 | Recent Past |
| 5 | Best Possible Outcome |
| 6 | Near Future |
| 7 | Your Attitude |
| 8 | External Environment |
| 9 | Hopes & Fears |
| 10 | Final Outcome |

---

## 5. Technical Specifications

### 5.1 Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **No external dependencies** (pure client-side)
- **AI Integration:** Placeholder for future API connection

### 5.2 File Structure
```
tarot-game/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── app.js          # Game logic
└── cards.js        # Tarot card data
```

### 5.3 Key Functions

| Function | Description |
|----------|-------------|
| `init()` | Initialize game, bind events |
| `startReading(spreadType)` | Begin reading with selected spread |
| `shuffleDeck(deck)` | Fisher-Yates shuffle algorithm |
| `renderCardDeck()` | Display 22 card backs |
| `drawCard(index, element)` | Handle card selection |
| `showResults()` | Display drawn cards with meanings |
| `handleAIAnalysis()` | Process user input for AI reading |

---

## 6. Visual Design

### 6.1 Theme
- **Mystical/Ethereal** aesthetic
- Dark background with glowing accents
- Celestial motifs (stars, moons)

### 6.2 Card Design
- Card backs: Mystical pattern
- Card fronts: Clean, emoji-centered design
- Reversed cards: Rotated 180°

### 6.3 Animations
- Card flip animation on draw
- Staggered reveal for multiple cards
- Loading spinner for AI analysis

---

## 7. Future Enhancements

### 7.1 Phase 2 Features
- [ ] Real AI API integration (GPT/Claude)
- [ ] User accounts & reading history
- [ ] Minor Arcana cards (78 total)
- [ ] Custom card art generation
- [ ] Shareable reading cards

### 7.2 Monetization Potential
- Premium AI interpretations
- Custom card themes
- Personal tarot journal
- Daily horoscope integration

---

## 8. Card Reference (22 Major Arcana)

| # | Name | Emoji | Upright | Reversed |
|---|------|-------|---------|----------|
| 0 | The Fool | 🃏 | New beginnings, freedom | Recklessness, lack of planning |
| 1 | The Magician | 🎭 | Creativity, skill | Deception, wasted talent |
| 2 | The High Priestess | 🌙 | Intuition, mystery | Hidden agendas, disconnection |
| 3 | The Empress | 👑 | Abundance, nurturing | Dependence, blocked creativity |
| 4 | The Emperor | 🏛️ | Authority, leadership | Tyranny, rigidity |
| 5 | The Hierophant | ⛪ | Tradition, guidance | Breaking tradition |
| 6 | The Lovers | 💕 | Love, harmony | Disharmony, conflict |
| 7 | The Chariot | 🏇 | Victory, determination | Loss of control |
| 8 | Strength | 🦁 | Courage, inner strength | Self-doubt, weakness |
| 9 | The Hermit | 🏔️ | Introspection, wisdom | Isolation, withdrawal |
| 10 | Wheel of Fortune | ☸️ | Destiny, opportunity | Bad luck, resistance |
| 11 | Justice | ⚖️ | Fairness, truth | Injustice, dishonesty |
| 12 | The Hanged Man | 🙃 | Pause, new perspective | Delay, resistance |
| 13 | Death | 💀 | Endings, transformation | Fear of change |
| 14 | Temperance | 🌟 | Balance, harmony | Imbalance, excess |
| 15 | The Devil | 😈 | Bondage, materialism | Liberation, freedom |
| 16 | The Tower | 🗼 | Sudden change, revelation | Avoiding disaster |
| 17 | The Star | ⭐ | Hope, inspiration | Despair, disconnection |
| 18 | The Moon | 🌕 | Illusion, intuition | Releasing fears |
| 19 | The Sun | ☀️ | Joy, success | Temporary setbacks |
| 20 | Judgement | 📯 | Reflection, rebirth | Self-doubt, denial |
| 21 | The World | 🌍 | Completion, achievement | Incompletion, delay |

---

## 9. Appendix

### 9.1 Sample AI Analysis Output

```
🔮 AI Deep Interpretation

Cards Drawn: Past: The Fool (Upright), Present: The Lovers (Reversed), Future: The Star (Upright)

Your Question: "I want to understand my relationship situation..."

Interpretation:
The Fool upright in the past position suggests you entered this situation with an open heart and adventurous spirit. The Lovers reversed in the present indicates some disharmony or misalignment in your current relationship dynamics. However, The Star upright in the future brings hope—this challenge will lead to growth and renewed inspiration.

Trust the process. The cards remind you that even difficult passages lead to brighter destinations.
```

---

*Document generated for internal use*  
*Game files location: `/games/tarot-game/`*
