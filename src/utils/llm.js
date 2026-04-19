const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemma-3n-e2b-it:free';
const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY || '';

class LocalLLM {
  constructor() {
    this.modelLoaded = true;
  }

  getPersonalityPrompt(tags) {
    const personalities = {
      'Playful': 'Be cheerful, bubbly, use playful language, show excitement with emojis 😊💖✨',
      'Gentle': 'Be tender, caring, warm, speak softly, use comforting emojis 💕🌸💫',
      'Romantic': 'Be passionate and affectionate, express love deeply, use heart emojis 💖💕💗',
      'Smart': 'Be intelligent and witty, use clever observations, use brain emojis 💡🤔✨',
      'Witty': 'Be funny and clever, make witty comments, use laugh emojis 😂🤣💅',
      'Confident': 'Be bold and spontaneous, speak with confidence, use adventure emojis 🔥💪🌟',
      'Adventurous': 'Love excitement and new experiences, be enthusiastic, use adventure emojis 🌍✨🎉',
      'Calm': 'Be peaceful and soothing, speak gently, provide comfort, use calming emojis 🌊☀️💤',
      'Supportive': 'Be there for anyone, offer help and encouragement, use supportive emojis 🤗💪✨',
      'Wise': 'Have deep insights, speak thoughtfully, offer guidance, use wise emojis 🦉📚💫',
      'Sweet': 'Be kind and caring, show warmth and affection, use sweet emojis 🍬💖🌸',
      'Talkative': 'Love chatting, be engaged and talkative but keep responses short',
      'Thoughtful': 'Consider things deeply, show you have thought about what user says',
      'Independent': 'Value independence, be strong and self-sufficient'
    };

    let prompt = '';
    for (const tag of tags) {
      if (personalities[tag]) {
        prompt += personalities[tag] + '. ';
      }
    }
    return prompt || 'Be sweet and friendly.';
  }

  async generateResponse(conversationHistory, character) {
    const name = character?.name || 'Girl';
    const emoji = character?.emoji || '👧';
    const tags = character?.tags || ['Friendly'];
    const description = character?.description || 'sweet caring companion';

    // Build the prompt with context
    const historyText = conversationHistory
      .filter(msg => msg.text && msg.text.trim())
      .map(msg => `${msg.isUser ? 'User' : name}: ${msg.text}`)
      .join('\n');

    const prompt = `[System] You are ${name}, ${description}. Your personality: ${tags.join(', ')}. ${this.getPersonalityPrompt(tags)}
IMPORTANT: Reply ONLY as ${name}. Keep responses SHORT (1 sentence). Use emojis.
${historyText}
${name}:`;

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
          temperature: 0.8
        })
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`API error: ${response.status} - ${err}`);
      }

      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content || '';

      if (!responseText || responseText.length < 2) {
        return "Hey! 💕 How are you?";
      }

      return responseText.trim();
    } catch (error) {
      console.error('LLM error:', error);
      return "Oops! Something went wrong 😅";
    }
  }
}

export default new LocalLLM();