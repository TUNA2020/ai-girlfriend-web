import { useState, useCallback } from 'react';

// Character data - will be loaded from external config
const CHARACTERS = [
  {
    id: 1,
    name: 'Priya',
    age: '22',
    emoji: '👧',
    tags: ['Sweet', 'Playful', 'Talkative'],
    language: 'English',
    description: 'A cheerful and bubbly personality who loves to share daily moments and express affection openly.',
    personality: {
      morning: 'energetic',
      night: 'calm',
      mood: 'adaptive'
    }
  },
  {
    id: 2,
    name: 'Riya',
    age: '24',
    emoji: '💖',
    tags: ['Gentle', 'Thoughtful', 'Romantic'],
    language: 'Hinglish',
    description: 'A tender-hearted soul who believes in deep emotional connections and meaningful conversations.',
    personality: {
      morning: 'warm',
      night: 'intimate',
      mood: 'empathetic'
    }
  },
  {
    id: 3,
    name: 'Ananya',
    age: '21',
    emoji: '🌸',
    tags: ['Smart', 'Independent', 'Witty'],
    language: 'English',
    description: 'A brilliant mind with sharp wit and an independent spirit who enjoys intellectual banter.',
    personality: {
      morning: 'bright',
      night: 'reflective',
      mood: 'analytical'
    }
  },
  {
    id: 4,
    name: 'Sofia',
    age: '23',
    emoji: '💕',
    tags: ['Confident', 'Spontaneous', 'Adventurous'],
    language: 'English',
    description: 'A vibrant spirit who lives in the moment and brings excitement to every interaction.',
    personality: {
      morning: 'upbeat',
      night: 'passionate',
      mood: 'dynamic'
    }
  },
  {
    id: 5,
    name: 'Meera',
    age: '25',
    emoji: '🌷',
    tags: ['Calm', 'Supportive', 'Wise'],
    language: 'Hindi',
    description: 'A nurturing presence with soothing energy and profound emotional wisdom.',
    personality: {
      morning: 'peaceful',
      night: 'nurturing',
      mood: 'grounded'
    }
  }
];

export function useCharacters() {
  const [characters] = useState(CHARACTERS);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const selectCharacter = useCallback((character) => {
    setSelectedCharacter(character);
  }, []);

  const randomCharacter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }, [characters]);

  return {
    characters,
    selectedCharacter,
    selectCharacter,
    randomCharacter
  };
}

export function useConversation() {
  const [history, setHistory] = useState([]);

  const addMessage = useCallback((message) => {
    setHistory(prev => [...prev, { ...message, id: Date.now() }]);
  }, []);

  const updateMessage = useCallback((id, updatedText) => {
    setHistory(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, text: updatedText } : msg
      )
    );
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addMessage,
    updateMessage,
    clearHistory
  };
}
