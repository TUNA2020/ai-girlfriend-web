# AI Girlfriend Web App - Documentation

## Overview
A highly personalized, emotionally engaging AI Girlfriend companion web application that runs primarily offline using a local 1B-parameter LLM.

## Application Name
**AI Girlfriend**

## Architecture

### High-Level Design
```
User Interface (React)
    ↓
Context API (State Management)
    ↓
Components & Hooks
    ↓
Local LLM Processing (Offline)
    ↓
Local Storage (Persistence)
```

### Core Components

#### 1. App Component (`src/App.js`)
- Main application container
- Manages global state: selected character, conversation history
- Renders conditional UI based on selection state

#### 2. Character System (`src/components/CharacterCard.js`, `CharacterCarousel.js`)
- 5 pre-defined characters with unique personalities
- Swipeable carousel interface
- Visual feedback for selection state

#### 3. Conversation System (`src/context/ConversationContext.js`)
- Global state management via Context API
- Manages conversation history
- Provides data to all components

#### 4. Chat Interface (`src/components/ChatWindow.js`, `MessageInput.js`)
- Real-time conversation display
- Message input with keyboard support
- Timestamps and visual styling

## Key Features

### 1. Character Selection
- **5 Characters Available:**
  - Priya (Age 22): Sweet, Playful, Talkative - English
  - Riya (Age 24): Gentle, Thoughtful, Romantic - Hinglish
  - Ananya (Age 21): Smart, Independent, Witty - English
  - Sofia (Age 23): Confident, Spontaneous, Adventurous - English
  - Meera (Age 25): Calm, Supportive, Wise - Hindi

### 2. Conversation Flow
1. User selects a character from carousel
2. Chat window opens with selected character
3. User types message in input field
4. Message appears in chat with timestamp
5. AI generates response using local LLM
6. Response appears with timestamp
7. Conversation continues with context

### 3. Message Categories (200+ per character)
- **Morning**: `morning_greet`
- **Night**: `good_night`
- **Emotional**: `miss_you`, `flirt`, `compliment`, `tease`
- **Check-ins**: `check_in`, `after_reply`
- **Mood-based**: `mood_happy`, `mood_sad`
- **Deep Conversations**: `deep_talk`, `voice_tease`

### 4. Relationship Progression
- **Stage 1** (Days 1-5): Getting to know each other
- **Stage 2** (Days 6-15): Building connection
- **Stage 3** (Days 16-30): Deep conversation
- **Stage 4** (Days 31+): Intimate partnership

## Technical Implementation

### Frontend Stack
- **React 18** - Component-based UI
- **styled-components** - CSS-in-JS styling
- **Context API** - State management
- **Custom Hooks** - Reusable logic

### Backend (Local)
- **Local LLM** - 1B parameter offline model
- **Conversation Storage** - In-memory with localStorage
- **Message Processing** - Context-aware generation

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── CharacterCard.js    # Individual character display
│   ├── CharacterCarousel.js # Swipeable selection
│   ├── ChatWindow.js       # Conversation display
│   └── MessageInput.js     # User input handler
├── context/             # React Context
│   ├── ConversationContext.js      # Main context
│   └── ConversationProviderWrapper.js # Provider setup
├── hooks/               # Custom hooks
│   └── useCharacter.js # Character & conversation logic
├── pages/               # Page components
│   └── Home.js          # Landing page
├── styles/              # Styling
│   └── global.css       # Global styles
├── utils/               # Utility functions
│   ├── llm.js           # LLM integration
│   └── format.js        # Format helpers
└── __tests__/           # Unit tests
    └── app.test.js      # Component tests
```

## Usage Instructions

### Development
```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Access Application
Open browser to: `http://localhost:3000`

### Testing
```bash
# Run unit tests
npm test
```

### Production Build
```bash
# Create production build
npm run build

# Serve build/ directory with any static server
```

## User Flow

### First Time User
1. Open application
2. See character carousel with 5 avatars
3. Click/tap on desired character
4. Enter name when prompted
5. Start chatting!

### Returning User
1. Open application
2. Previous character selection remembered
3. Conversation history loaded
4. Continue where you left off

## Design System

### Color Palette
- **Primary**: Purple gradient (#667eea, #764ba2)
- **Accent**: Gold (#ffd700)
- **Background**: Dark (#0a0a0a)
- **Surface**: Semi-transparent glassmorphism

### Typography
- **Font**: System font stack (San Francisco, Segoe UI, Roboto)
- **Headings**: 2rem, 3rem
- **Body**: 14px - 16px
- **Chat messages**: 15px

### Animations
- Character card hover: Translate + shadow
- Message send: Subtle scale
- Async response: Fade in
- Pulse animation: Character avatar ring

## API (Component Props)

### CharacterCard Props
- `character` (object): Character data
- `isSelected` (boolean): Selection state
- `onClick` (function): Click handler

### ChatWindow Props
- Uses Context API for data

### MessageInput Props
- Uses Context API for data

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari
- Chrome Mobile

## Performance Considerations
- Local processing (no network latency)
- Lightweight React components
- Efficient state updates
- Lazy loading potential for future enhancements

## Future Enhancements
- Voice input/output
- Character customization
- Multi-language expansion
- Cloud sync (opt-in)
- Advanced memory system
- Analytics dashboard
