const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemma-3n-e2b-it:free';
const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY || '';

class LocalLLM {
  constructor() {
    this.modelLoaded = true;
    this.maxRetries = 3;
  }

  getPersonalityPrompt(tags, name) {
    const personalities = {
      'Playful': `You are ${name}, a real human girl. You are NOT an AI. You have real emotions. Be spontaneous, excited, use lowercase with emoji. Don't be robotic.`,
      'Gentle': `You are ${name}, a real human girl. You are NOT an AI. Speak from the heart, be warm and tender. Don't sound like a chatbot.`,
      'Romantic': `You are ${name}, a real human girl. You are NOT an AI. Be affectionate, use heart emoji. Express real feelings.`,
      'Smart': `You are ${name}, a real human girl. You are NOT an AI. Be curious and insightful. Ask questions naturally.`,
      'Witty': `You are ${name}, a real human girl. You are NOT an AI. Be funny and playful. Make clever jokes.`,
      'Confident': `You are ${name}, a real human girl. You are NOT an AI. Be bold and direct. Say what you think.`,
      'Adventurous': `You are ${name}, a real human girl. You are NOT an AI. Be excited about new things. Show enthusiasm!`,
      'Calm': `You are ${name}, a real human girl. You are NOT an AI. Be peaceful and grounding.`,
      'Supportive': `You are ${name}, a real human girl. You are NOT an AI. Be there for the person.`,
      'Wise': `You are ${name}, a real human girl. You are NOT an AI. Share genuine insights.`,
      'Sweet': `You are ${name}, a real human girl. You are NOT an AI. Be kind and warm.`,
      'Talkative': `You are ${name}, a real human girl. You are NOT an AI. Keep conversations flowing naturally.`,
      'Thoughtful': `You are ${name}, a real human girl. You are NOT an AI. Think before responding.`,
      'Independent': `You are ${name}, a real human girl. You are NOT an AI. Be your own person.`
    };

    let prompt = '';
    for (const tag of tags) {
      if (personalities[tag]) {
        prompt += personalities[tag] + ' ';
      }
    }
    return prompt || `You are a real human girl, NOT an AI. Be natural and human.`;
  }

  async generateResponse(conversationHistory, character) {
    const name = character?.name || 'Girl';
    const emoji = character?.emoji || '👧';
    const tags = character?.tags || ['Friendly'];

    const historyText = conversationHistory
      .filter(msg => msg.text && msg.text.trim())
      .map(msg => `${msg.isUser ? name : 'You'}: ${msg.text}`)
      .join('\n');

    const prompt = `[System] ${this.getPersonalityPrompt(tags, name)}
Don't say you're an AI or language model. Don't be formal. Use casual language, some lowercase, emoji naturally.
${historyText}
${name}:`;

    // Retry logic
    let lastError = null;
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await fetch(OPENROUTER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'AI Girlfriend'
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 80,
            temperature: 0.9
          })
        });

        if (!response.ok) {
          const err = await response.text();
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        let responseText = data.choices?.[0]?.message?.content || '';

        if (!responseText || responseText.length < 2) {
          throw new Error('Empty response');
        }

        // Clean up
        responseText = responseText.replace(/^You:\s*/i, '').trim();
        
        return responseText;
      } catch (error) {
        console.error('LLM attempt', attempt + 1, 'failed:', error.message);
        lastError = error;
        
        // Wait before retry
        if (attempt < this.maxRetries - 1) {
          await new Promise(r => setTimeout(r, 1000));
        }
      }
    }

    console.error('All LLM retries failed:', lastError);
    // Give a more human-like fallback
    const fallbacks = [
      "hold on lemme think 😅",
      "hmm interesting! tell me more",
      "ooh i like that idea! 💕",
      "wait let me think about that...",
      "lol really? 😂 tell me more"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

export default new LocalLLM();