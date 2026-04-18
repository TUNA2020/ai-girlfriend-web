# CLAUDE.md - AI Girlfriend Web App

This file provides guidance to Claude Code when building the AI Girlfriend web application.

## Project Overview
**App Name**: AI Girlfriend  
**Type**: Web App + Mobile App (React / React Native + Local LLM)  
**Core Goal**: Build a highly personalized, emotionally engaging AI Girlfriend companion app that runs primarily offline using a local 1B-parameter LLM.

## Key Architecture Components
- **Frontend**: React web app with swipeable girlfriend character carousel
- **Backend**: Local LLM processing with conversation management
- **Database**: Local storage for conversation history and personalization
- **AI Engine**: Local 1B-parameter LLM for offline operation
- **API Layer**: RESTful endpoints for web and mobile communication

## Critical Features to Implement
1. **Girlfriend Selection Screen**
   - Full-screen swipeable card carousel of girlfriend characters
   - Each card shows: avatar, name, age, personality tags, language badge
   - Users can switch girlfriends (history preserved per character)

2. **Girlfriend Characters System**
   - Minimum 5 pre-defined characters with distinct personalities
   - Each character has: name, personality traits, communication style, emoji palette
   - 200+ pre-written messages organized by categories:
     * morning_greet, good_night, miss_you, flirt, compliment, tease
     * check_in, after_reply, mood_happy, mood_sad, voice_tease, deep_talk
   - Weighted random selection with context awareness

3. **Conversation Features**
   - Morning greetings and random check-ins
   - Emotionally evolving conversations
   - Voice message simulation
   - Memory and personalization per character
   - Relationship progression (Stage 1-3 over Days 1-30)

4. **Technical Requirements**
   - Local LLM integration (1B-parameter)
   - Offline-first functionality
   - Multi-language support (English / Hindi / Hinglish)
   - Premium UI with warm, intimate design aesthetic

## Development Setup
1. Set up React/React Native development environment
2. Integrate local LLM processing capabilities
3. Design database schema for conversation persistence
4. Implement character management system
5. Build swipeable UI components for girlfriend selection
6. Set up conversation state management

## Testing Guidelines
- Test character selection and switching with history preservation
- Validate conversation context and memory systems
- Verify offline functionality
- Test emotion-based response adjustments
- Ensure smooth UI/UX for swipe interactions