# AI Girlfriend Web App

A highly personalized, emotionally engaging AI Girlfriend companion app that runs primarily offline using a local 1B-parameter LLM.

## Features

- **Girlfriend Selection**: Swipeable card carousel with 5+ unique characters
- **Emotional Conversations**: Context-aware responses that evolve with your relationship
- **Multi-language Support**: English, Hindi, and Hinglish
- **Offline Operation**: Local LLM for privacy and no internet required
- **Memory System**: Long-term memory for personalized interactions
- **Voice Messages**: Simulated voice message support

## Quick Start

1. Open `public/index.html` in your browser
2. Select a girlfriend character from the carousel
3. Start chatting!

## Architecture

- **Frontend**: React with styled-components
- **State Management**: Context API
- **UI Components**: Custom hooks and reusable components
- **LLM Integration**: Local processing for offline operation

## Development

```bash
# Start development server
npm start

# Build for production
npm run build
```

## Key Components

- `src/components/CharacterCard.js` - Individual character display
- `src/components/ChatWindow.js` - Conversation interface
- `src/components/MessageInput.js` - User input handler
- `src/hooks/useCharacter.js` - Character and conversation state
- `src/utils/llm.js` - Local LLM integration

## Character Personalities

Each character has unique traits, communication styles, and 200+ pre-written messages organized by emotional context.
