import llm from './llm';

export class ConversationManager {
  constructor() {
    this.memory = new Map();
    this.relationshipStages = ['getting_to_know', 'building_connection', 'deep_connection', 'intimate_partners'];
  }

  async generateResponse(conversationHistory, character) {
    return llm.generateResponse(conversationHistory, character);
  }

  // Store conversation memory for a character
  storeMemory(characterId, key, value) {
    if (!this.memory.has(characterId)) {
      this.memory.set(characterId, new Map());
    }
    this.memory.get(characterId).set(key, {
      value,
      timestamp: Date.now(),
      lastUpdated: Date.now()
    });
  }

  // Retrieve memory for a character
  getMemory(characterId, key) {
    if (!this.memory.has(characterId)) return null;
    return this.memory.get(characterId).get(key)?.value || null;
  }

  // Get relationship stage based on conversation count
  getRelationshipStage(conversationCount) {
    if (conversationCount < 5) return 0; // getting_to_know
    if (conversationCount < 15) return 1; // building_connection
    if (conversationCount < 30) return 2; // deep_connection
    return 3; // intimate_partners
  }

  // Update relationship based on interaction quality
  updateRelationship(character, interactionType) {
    const relationship = character.relationship || { stage: 0, score: 50 };

    switch (interactionType) {
      case 'positive':
        relationship.score = Math.min(100, relationship.score + 5);
        break;
      case 'negative':
        relationship.score = Math.max(0, relationship.score - 10);
        break;
      case 'deep':
        relationship.score = Math.min(100, relationship.score + 8);
        break;
    }

    // Update stage based on score
    if (relationship.score >= 80) relationship.stage = 3;
    else if (relationship.score >= 60) relationship.stage = 2;
    else if (relationship.score >= 30) relationship.stage = 1;
    else relationship.stage = 0;

    character.relationship = relationship;
    return relationship;
  }

  // Get context for response generation
  getContext(character, conversationHistory) {
    const recentMessages = conversationHistory.slice(-5).map(msg => msg.text).join(' ');
    const relationship = character.relationship || { stage: 0, score: 50 };
    const memory = this.getMemory(character.id, 'preferences');

    return {
      recentMessages,
      personality: { tags: character.tags || [] },
      relationshipStage: relationship.stage,
      relationshipScore: relationship.score,
      memory,
      emotionalState: this.detectEmotionalState(conversationHistory)
    };
  }

  // Detect emotional state from conversation
  detectEmotionalState(conversationHistory) {
    const recentMessages = conversationHistory.slice(-10).map(msg => msg.text.toLowerCase());
    const text = recentMessages.join(' ');

    const positiveWords = ['happy', 'love', 'great', 'amazing', 'wonderful', 'excited', 'joy'];
    const negativeWords = ['sad', 'angry', 'bad', 'hate', 'upset', 'depressed', 'cry'];

    const positiveCount = positiveWords.filter(word => text.includes(word)).length;
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;

    if (positiveCount > negativeCount + 2) return 'happy';
    if (negativeCount > positiveCount + 2) return 'sad';
    return 'neutral';
  }

  // Generate personalized response template
  getResponseTemplate(character, emotionalState, relationshipStage) {
    const templates = {
      happy: {
        0: ['That\'s wonderful! Let\'s celebrate! 🎉', 'Amazing news! Tell me more! 🌟'],
        1: ['I\'m so happy for you! 💖', 'Your joy is contagious! ✨'],
        2: ['This is beautiful! 💝', 'I cherish these moments with you 💫'],
        3: ['You make my world complete 💕', 'Forever grateful for us 💖']
      },
      sad: {
        0: ['It\'s okay to feel this way 💙', 'Take your time, I\'m here 💕'],
        1: ['I understand your pain 💔', 'Let\'s work through this together 💪'],
        2: ['You\'re not alone in this 💙', 'I hold space for your feelings 💕'],
        3: ['My heart aches with yours 💔', 'Eternally by your side 💖']
      },
      neutral: {
        0: ['Interesting... 🤔', 'Tell me more about that'],
        1: ['I see what you mean 💡', 'That makes sense to me'],
        2: ['Profound insight 💫', 'Such meaningful words 💖'],
        3: ['Sacred understanding 💝', 'Eternal wisdom 💫']
      }
    };

    return templates[emotionalState]?.[relationshipStage] || templates.neutral[0];
  }

  // Check if memory needs updating
  shouldUpdateMemory(characterId, key) {
    const memory = this.getMemory(characterId, key);
    if (!memory) return true;

    // Update if older than 24 hours
    return Date.now() - memory.timestamp > 24 * 60 * 60 * 1000;
  }
}

export default new ConversationManager();