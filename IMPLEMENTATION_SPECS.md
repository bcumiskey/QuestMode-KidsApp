# Quest & Grow — Implementation Specifications

## Purpose
This document provides **exact, unambiguous specifications** so Claude Code builds something that looks and feels magical — not generic placeholder garbage.

---

# 1. CHARACTER ASSETS

## Mascot Sources (Use Real IP)

| Theme | Mascot | Source | Format | States Needed |
|-------|--------|--------|--------|---------------|
| Jurassic | Blue the Raptor | Jurassic World official art / Camp Cretaceous stills | PNG with transparency | idle, talk, excited, point, celebrate |
| Disney | Tinker Bell | Official Disney Fairies art | PNG with transparency | idle, fly, sparkle, wave, celebrate |
| Harry Potter | Hedwig | Official WB promotional art | PNG with transparency | idle, hoot, ruffle, fly, deliver |
| Sonic | Tails | Official Sega art / Sonic Channel | PNG with transparency | idle, fly (tails spin), wave, excited, build |
| Marvel | Baby Groot | Official Marvel/Disney art | PNG with transparency | idle, dance, wave, point, celebrate |

### Asset Requirements
- **Minimum resolution:** 512x512px for each state
- **Format:** PNG with transparency (no white backgrounds)
- **Fallback:** If exact state unavailable, use idle + CSS transforms
- **Location:** `/public/assets/mascots/{theme}/{state}.png`

### CSS Animation for Missing States
```css
/* If we only have idle, create other states via transform */
.mascot-excited {
  animation: bounce 0.3s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
}

.mascot-talk {
  animation: talk 0.15s ease-in-out infinite;
}
@keyframes talk {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.05); }
}
```

---

# 2. COLOR PALETTES (Exact Hex Codes)

## Harry Potter
```css
:root[data-theme="hogwarts"] {
  --primary: #740001;        /* Gryffindor maroon */
  --primary-dark: #1A1A2E;   /* Midnight blue-black */
  --secondary: #D3A625;      /* Gold */
  --accent: #5D5D5D;         /* Silver */
  --background: #0D0D0D;     /* Near black */
  --surface: #1C1C2E;        /* Dark purple-gray */
  --surface-light: #2A2A3E;  /* Lighter surface */
  --text: #F5F5F5;           /* Off-white */
  --text-muted: #A0A0A0;     /* Gray */
  --success: #2ECC71;        /* Green */
  --xp-color: #D3A625;       /* Gold for XP */
  --streak-color: #E74C3C;   /* Fire red */
}
```

## Jurassic Park
```css
:root[data-theme="jurassic"] {
  --primary: #FF6B35;        /* Amber/orange */
  --primary-dark: #1B4332;   /* Deep jungle green */
  --secondary: #2D6A4F;      /* Forest green */
  --accent: #95D5B2;         /* Light green */
  --background: #081C15;     /* Near black green */
  --surface: #1B4332;        /* Dark green */
  --surface-light: #2D6A4F;  /* Medium green */
  --text: #F5F5F5;
  --text-muted: #95D5B2;
  --success: #40916C;
  --xp-color: #FFD166;       /* Amber for DNA */
  --streak-color: #FF6B35;   /* Orange fire */
}
```

## Disney Princess
```css
:root[data-theme="disney"] {
  --primary: #FF69B4;        /* Hot pink */
  --primary-dark: #4A1259;   /* Deep purple */
  --secondary: #9B59B6;      /* Purple */
  --accent: #F39C12;         /* Gold */
  --background: #1A0A2E;     /* Dark purple */
  --surface: #2D1B4E;        /* Purple surface */
  --surface-light: #3D2B5E;
  --text: #FFF5F8;           /* Soft white-pink */
  --text-muted: #D8BFD8;     /* Thistle */
  --success: #2ECC71;
  --xp-color: #FF69B4;       /* Pink for pixie dust */
  --streak-color: #F39C12;   /* Gold sparkle */
}
```

## Sonic/Mario
```css
:root[data-theme="sonic"] {
  --primary: #0066FF;        /* Sonic blue */
  --primary-dark: #1A1A2E;   /* Dark */
  --secondary: #FFD700;      /* Ring gold */
  --accent: #FF4444;         /* Mario red */
  --background: #0A0A1A;     /* Near black */
  --surface: #1A2A4A;        /* Blue surface */
  --surface-light: #2A3A5A;
  --text: #FFFFFF;
  --text-muted: #88AAFF;
  --success: #00FF88;        /* Emerald green */
  --xp-color: #FFD700;       /* Gold for rings */
  --streak-color: #FF4444;   /* Red fire */
}
```

## Marvel
```css
:root[data-theme="marvel"] {
  --primary: #E23636;        /* Marvel red */
  --primary-dark: #1A1A2E;   /* Dark blue-black */
  --secondary: #518CCA;      /* Cap blue */
  --accent: #F0B429;         /* Gold star */
  --background: #0D1117;     /* Near black */
  --surface: #161B22;        /* Dark surface */
  --surface-light: #21262D;
  --text: #F0F6FC;
  --text-muted: #8B949E;
  --success: #3FB950;        /* Green */
  --xp-color: #F0B429;       /* Gold for stars */
  --streak-color: #E23636;   /* Red fire */
}
```

---

# 3. ANIMATION SPECIFICATIONS

## Celebration Sequence (Per Age Tier)

### Little Tier (Barrett, Lucy) — 6000ms total
```javascript
const littleCelebration = {
  // Phase 1: Flash (0-200ms)
  flash: {
    duration: 200,
    color: 'white',
    opacity: [0, 0.8, 0],
  },
  
  // Phase 2: Screen shake (200-600ms)
  shake: {
    duration: 400,
    intensity: 8, // pixels
    frequency: 50, // ms per shake
  },
  
  // Phase 3: Mascot entrance (300-1200ms)
  mascotEntrance: {
    delay: 300,
    duration: 400,
    animation: 'bounceIn',
    scale: [0, 1.3, 1],
  },
  
  // Phase 4: Mascot celebration (1200-4000ms)
  mascotCelebrate: {
    delay: 1200,
    duration: 2800,
    animation: 'dance', // Custom per mascot
    loop: true,
  },
  
  // Phase 5: Confetti burst (400-5500ms)
  confetti: {
    delay: 400,
    duration: 5100,
    count: 150,
    colors: ['#FFD700', '#FF69B4', '#00FFFF', '#FF4444', '#00FF00'],
    velocity: { min: 10, max: 30 },
    gravity: 0.5,
    drift: 2,
  },
  
  // Phase 6: XP fly animation (800-2000ms)
  xpFly: {
    delay: 800,
    duration: 1200,
    easing: 'easeOutCubic',
    trail: true,
    trailColor: 'var(--xp-color)',
  },
  
  // Phase 7: Counter spin (1500-2500ms)
  counterSpin: {
    delay: 1500,
    duration: 1000,
    spinRevolutions: 3,
    easing: 'easeOutExpo',
  },
  
  // Phase 8: Sound effects
  sounds: {
    flash: { time: 0, sound: 'whoosh' },
    mascot: { time: 300, sound: 'pop' },
    confetti: { time: 400, sound: 'celebration' },
    xp: { time: 800, sound: 'coinCollect', repeat: true, interval: 50 },
    complete: { time: 2000, sound: 'fanfare' },
  },
  
  totalDuration: 6000,
};
```

### Middle Tier (Reagan, Cat) — 3500ms total
```javascript
const middleCelebration = {
  flash: { duration: 150, opacity: [0, 0.6, 0] },
  shake: { duration: 300, intensity: 5 },
  mascotEntrance: { delay: 200, duration: 300, scale: [0, 1.2, 1] },
  mascotCelebrate: { delay: 500, duration: 1500 },
  confetti: { delay: 300, count: 80, duration: 3000 },
  xpFly: { delay: 500, duration: 800 },
  counterSpin: { delay: 800, duration: 700, spinRevolutions: 2 },
  totalDuration: 3500,
};
```

### Older Tier (Ann) — 1800ms total
```javascript
const olderCelebration = {
  flash: { duration: 100, opacity: [0, 0.4, 0] },
  shake: { duration: 200, intensity: 3 },
  mascotEntrance: { delay: 100, duration: 200, scale: [0.8, 1.05, 1] },
  mascotCelebrate: { delay: 300, duration: 800 },
  confetti: { delay: 200, count: 40, duration: 1500 },
  xpFly: { delay: 300, duration: 600 },
  counterSpin: { delay: 400, duration: 500, spinRevolutions: 1 },
  totalDuration: 1800,
  skipButton: { show: true, delay: 500 }, // Can skip after 500ms
};
```

---

# 4. PARTICLE SYSTEM SPECS

## Confetti Configuration
```typescript
interface ConfettiConfig {
  count: number;           // 40-150 based on tier
  shapes: ('square' | 'circle' | 'star')[];
  sizes: { min: number; max: number };  // 8-20px
  colors: string[];        // Theme colors
  velocity: {
    x: { min: number; max: number };  // -5 to 5
    y: { min: number; max: number };  // -30 to -10 (upward)
  };
  gravity: number;         // 0.3-0.8
  drift: number;           // 0-3 (horizontal wobble)
  rotation: {
    speed: { min: number; max: number };  // degrees per frame
  };
  fade: {
    start: number;         // 0.7 (70% through lifetime)
    duration: number;      // remaining 30%
  };
  lifetime: number;        // 2000-4000ms
}
```

## Sparkle/Trail Configuration
```typescript
interface SparkleConfig {
  count: number;           // 20-50
  color: string;           // Primary theme color
  size: { min: 2, max: 6 };
  opacity: { min: 0.5, max: 1 };
  twinkleSpeed: number;    // 100-200ms
  spread: number;          // radius from source
  follow: boolean;         // true for trails
}
```

## XP Fly Path
```typescript
interface XPFlyConfig {
  startPosition: 'button' | 'center';
  endPosition: 'counter';  // Top right XP counter
  path: 'arc' | 'direct';
  arcHeight: number;       // 100px for arc
  particleCount: number;   // 5-10 trailing particles
  particleSpacing: number; // 50ms between particles
  trailFade: boolean;      // true
  trailColor: string;      // Theme XP color
}
```

---

# 5. BUTTON SPECIFICATIONS

## Quest Complete Button (The Big One)

```css
.quest-complete-button {
  /* Size by tier */
  --button-padding-little: 24px 48px;
  --button-padding-middle: 18px 36px;
  --button-padding-older: 14px 28px;
  
  /* Typography */
  font-family: 'Nunito', 'Poppins', system-ui, sans-serif;
  font-weight: 800;
  font-size: var(--button-font-size);  /* 24px/20px/16px */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  /* Colors */
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  color: white;
  
  /* Shape */
  border-radius: 16px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  
  /* Shadow */
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    0 0 30px var(--primary),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  /* Glow animation when available */
  animation: buttonPulse 2s ease-in-out infinite;
}

@keyframes buttonPulse {
  0%, 100% { 
    box-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.3),
      0 0 20px var(--primary);
  }
  50% { 
    box-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.3),
      0 0 40px var(--primary),
      0 0 60px var(--primary);
  }
}

/* Press state */
.quest-complete-button:active {
  transform: scale(0.95);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 15px var(--primary);
  transition: transform 0.1s ease-out;
}
```

## Button Text by Tier

| Tier | Text Style | Example |
|------|------------|---------|
| Little | ALL CAPS, emoji, exclamation | "✨ I DID IT! ✨" |
| Middle | Title case, themed | "MISSION COMPLETE" |
| Older | Clean, direct | "Mark Complete" |

---

# 6. SCREEN TRANSITIONS

## Page Transitions (Framer Motion)
```typescript
const pageTransitions = {
  onboarding: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  
  home: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  
  celebration: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};
```

## Modal Animations
```typescript
const modalTransitions = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  
  content: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  
  treasureBox: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { 
      type: 'spring', 
      damping: 15, 
      stiffness: 300,
    },
  },
};
```

---

# 7. SOUND DESIGN

## Sound File Requirements
```
/public/sounds/
├── ui/
│   ├── tap.mp3           # Soft pop (50ms)
│   ├── success.mp3       # Chime (300ms)
│   ├── whoosh.mp3        # Transition (200ms)
│   └── error.mp3         # Soft buzz (200ms)
│
├── celebration/
│   ├── confetti.mp3      # Party popper (500ms)
│   ├── fanfare.mp3       # Victory (1500ms)
│   ├── jackpot.mp3       # Slot machine bells (2000ms)
│   └── levelup.mp3       # Ascending chime (1000ms)
│
├── rewards/
│   ├── coin.mp3          # Single coin (100ms)
│   ├── coins.mp3         # Multiple coins (500ms)
│   ├── ring.mp3          # Sonic ring (150ms)
│   ├── xp.mp3            # XP gain (200ms)
│   └── rare.mp3          # Rare item sparkle (800ms)
│
├── creatures/
│   ├── hatch.mp3         # Egg crack + reveal (1500ms)
│   ├── happy.mp3         # Creature joy (300ms)
│   └── evolve.mp3        # Evolution fanfare (2000ms)
│
└── mascots/
    ├── groot-dance.mp3   # "I am Groot" happy (500ms)
    ├── blue-chirp.mp3    # Raptor chirp (200ms)
    ├── hedwig-hoot.mp3   # Owl hoot (400ms)
    ├── tink-sparkle.mp3  # Fairy dust (300ms)
    └── tails-yay.mp3     # Fox cheer (300ms)
```

## Sound Trigger Spec
```typescript
interface SoundConfig {
  file: string;
  volume: number;        // 0-1, default 0.7
  playbackRate?: number; // 0.5-2, for pitch variation
  loop?: boolean;
  maxInstances?: number; // Prevent overlap spam
}

const soundTriggers: Record<string, SoundConfig> = {
  buttonTap: { file: 'ui/tap.mp3', volume: 0.5 },
  questComplete: { file: 'celebration/success.mp3', volume: 0.8 },
  xpGain: { file: 'rewards/xp.mp3', volume: 0.6, maxInstances: 5 },
  confetti: { file: 'celebration/confetti.mp3', volume: 0.7 },
  jackpot: { file: 'celebration/jackpot.mp3', volume: 0.9 },
  eggHatch: { file: 'creatures/hatch.mp3', volume: 0.8 },
  mascotCelebrate: { file: 'dynamic', volume: 0.7 }, // Based on theme
};
```

---

# 8. TYPOGRAPHY

## Font Stack
```css
:root {
  --font-display: 'Nunito', 'Poppins', 'Comic Sans MS', system-ui, sans-serif;
  --font-body: 'Nunito', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

## Font Sizes by Tier

| Element | Little | Middle | Older |
|---------|--------|--------|-------|
| Mascot speech | 24px | 20px | 16px |
| Quest title | 28px | 22px | 18px |
| Body text | 20px | 16px | 14px |
| Button text | 24px | 20px | 16px |
| Counter numbers | 32px | 28px | 24px |

## Font Weights
- **Headers:** 800 (Extra Bold)
- **Buttons:** 700 (Bold)
- **Body:** 500 (Medium)
- **Muted:** 400 (Regular)

---

# 9. FIRST SPIN RIGGING

## Implementation
```typescript
function rollFirstTimeBonus(odId: string, theme: string): BonusResult {
  const isFirstSpin = !localStorage.getItem(`firstSpin_${odId}`);
  
  if (isFirstSpin) {
    localStorage.setItem(`firstSpin_${odId}`, 'true');
    
    // Return rigged result based on theme
    const riggedResults: Record<string, BonusResult> = {
      jurassic: { 
        tier: 'rare', 
        prize: 'RARE_EGG', 
        display: 'Rare Dinosaur Egg!',
        xpMultiplier: 2,
      },
      disney: { 
        tier: 'great', 
        prize: 'MAGIC_WAND', 
        display: 'Magic Wand Power!',
        xpMultiplier: 1.5,
        bonusItem: 'princess_crown',
      },
      hogwarts: { 
        tier: 'rare', 
        prize: 'RARE_EGG', 
        display: 'Rare Creature Egg!',
        xpMultiplier: 2,
      },
      sonic: { 
        tier: 'epic', 
        prize: 'CHAOS_EMERALD', 
        display: 'Chaos Emerald! (1/7)',
        xpMultiplier: 2,
        collectible: { type: 'emerald', index: 1, total: 7 },
      },
      marvel: { 
        tier: 'great', 
        prize: 'SHIELD_POWER', 
        display: 'Shield Power-Up!',
        xpMultiplier: 1.5,
        bonusItem: 'hero_badge',
      },
    };
    
    return riggedResults[theme];
  }
  
  // Normal random roll for subsequent spins
  return rollNormalBonus();
}
```

---

# 10. CHECKLIST FOR CLAUDE CODE

Before considering onboarding complete, verify:

## Visual
- [ ] Mascot images loaded (not emoji placeholders)
- [ ] Theme colors applied correctly
- [ ] Buttons are appropriately sized per tier
- [ ] Confetti particles visible and themed
- [ ] XP fly animation has visible trail
- [ ] Screen transitions are smooth (no flash of unstyled content)

## Timing
- [ ] Little tier celebration lasts 5-6 seconds
- [ ] Middle tier celebration lasts 3-4 seconds  
- [ ] Older tier celebration lasts 1.5-2 seconds
- [ ] No perceptible delay between tap and first feedback
- [ ] Counter spin animation completes smoothly

## Audio (if enabled)
- [ ] Sounds trigger at correct moments
- [ ] No overlapping sound spam
- [ ] Volume levels balanced

## Data
- [ ] First spin is rigged to great result
- [ ] Starter creature saved to Firebase
- [ ] Starter building saved to Firebase
- [ ] Resources granted correctly
- [ ] Streak initialized
- [ ] Onboarding flag set to prevent replay

## Age Tier Accuracy
- [ ] Barrett (4) sees HUGE buttons, almost no text
- [ ] Lucy (5) sees big buttons, minimal text, max sparkles
- [ ] Reagan (8) sees balanced UI, speed theme
- [ ] Cat (9) sees full quest details, moderate celebration
- [ ] Ann (11) sees sophisticated UI, skip option available

---

This spec leaves nothing to interpretation. Claude Code can build exactly what you envisioned.
