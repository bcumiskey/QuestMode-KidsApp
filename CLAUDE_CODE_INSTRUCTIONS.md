# Quest & Grow - Claude Code Build Instructions

## Overview

Build a gamified family quest system where real-world tasks ARE gameplay. Children complete daily responsibilities as themed quests that feed into persistent game worlds with creatures, buildings, and progression.

## Key Documents

1. **quest_grow_master_spec.pdf** - Complete design specification
2. **quest_grow_technical_handoff.pdf** - Technical architecture and agent breakdown

## Multi-Agent Strategy

This project is designed for parallel agent development. Use 8 agents:

| Agent | Module | Can Start |
|-------|--------|-----------|
| A1 | Core Infrastructure | Immediately |
| A2 | Quest Engine | After A1 data model |
| A3 | Theming System | Immediately |
| A4 | Progression System | After A1 data model |
| A5 | Base Builder | After A4 resources |
| A6 | Creature System | After A4 resources |
| A7 | Parent Dashboard | After A1 data model |
| A8 | Notifications | After A1 data model |

## Existing Firebase Project

**DO NOT create a new Firebase project.** Use existing:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBUtjw_i8MVfGC4EHyXzpI1aBQKph6lhu0",
  authDomain: "questmode-kidsapp.firebaseapp.com",
  databaseURL: "https://questmode-kidsapp-default-rtdb.firebaseio.com",
  projectId: "questmode-kidsapp",
  storageBucket: "questmode-kidsapp.firebasestorage.app",
  messagingSenderId: "78296251491",
  appId: "1:78296251491:web:c1f6e1a2c16cb158818c56"
};
```

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Backend:** Firebase Realtime Database
- **PWA:** Vite PWA Plugin

## MVP Scope

### Must Have (v1)
- Individual accounts + PIN per child
- 4 themes: Harry Potter (Ann), Jurassic (Cat), Disney (Lucy), Sonic/Mario (Reagan)
- Quest system with themed descriptions
- Parent approval workflow + auto-approve timers
- Trust levels (4 tiers)
- XP, levels, streaks, variable rewards
- Base Builder (6 buildings per theme)
- Creature Collection (8 creatures per theme)
- Parent Dashboard with Hard Day Mode
- PWA installable on iPads

### Deferred (v2)
- Story Engine
- Map Explorer
- Duo quests
- Cousin cross-play
- Messaging/feed
- Journaling

## Target Users

| Child | Age | Theme | Complexity |
|-------|-----|-------|------------|
| Ann | 11 | Harry Potter | Standard |
| Cat | 9 | Jurassic Park | Standard |
| Reagan | ~7-8 | Sonic/Mario | Simple |
| Lucy | ~5-6 | Disney Princess | Simple |

## Core Principle

**Tasks ARE gameplay.** Reading isn't rewarded with points—reading IS gathering knowledge scrolls. The activity and the game are the same thing.

## Quick Start

1. Read `quest_grow_technical_handoff.pdf` for full architecture
2. Start A1 (Core Infrastructure) and A3 (Theming) in parallel
3. Once A1 defines data model, start A2, A4, A7, A8
4. Once A4 defines resources, start A5, A6
5. Integration and polish

## Success Criteria

- Kids owning responsibilities without constant reminding
- Parents able to manage in under 2 minutes/day
- Real-time sync across all family devices (iPads, phones)
- Installable PWA that feels like a native app
