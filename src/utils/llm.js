const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'qwen3.5:0.8b';

class LocalLLM {
  constructor() {
    this.modelLoaded = false;
  }

  async loadModel() {
    try {
      const response = await fetch('http://localhost:11434/api/tags', { method: 'GET' });
      if (response.ok) {
        this.modelLoaded = true;
        console.log('Ollama connected with model:', MODEL);
        return true;
      }
    } catch (error) {
      console.error('Ollama not available:', error.message);
    }
    this.modelLoaded = false;
    return false;
  }

  buildPrompt(character, conversationHistory) {
    const name = character?.name || 'Girl';
    const emoji = character?.emoji || '👧';
    const tags = character?.tags || ['Friendly'];
    const description = character?.description || 'sweet caring companion';

    const conversationText = conversationHistory
      .filter(msg => msg.text && msg.text.trim())
      .slice(-4)
      .map(msg => `${msg.isUser ? 'User' : name}: ${msg.text.replace(/^[\*\-]+\s*|\s*[\*\-]+$/g, '').trim()}`)
      .join('\n');

    return `[System] You are ${name}, ${tags.join(', ')} ${description}. Reply short (1 sentence), use emojis.\n${conversationText}\n${name}:`;
  }

  async generateResponse(conversationHistory, character) {
    if (!this.modelLoaded) {
      await this.loadModel();
      if (!this.modelLoaded) {
        return "Ollama not running? Start it first! 🧠";
      }
    }

    const prompt = this.buildPrompt(character, conversationHistory);

    try {
      const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 60,
            num_ctx: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
      }

      const data = await response.json();
      let responseText = data.response || '';

      // Check thinking field if response is empty
      if (!responseText || responseText.length < 3) {
        const thinking = data.thinking || '';
        if (thinking.length > 10) {
          const drafts = thinking.match(/Draft \d+:.*$/gmi) || [];
          if (drafts.length > 0) {
            const lastDraft = drafts[drafts.length - 1];
            responseText = lastDraft.replace(/^Draft \d+:\s*/, '').replace(/^[\*\-]+\s*|\s*[\*\-]+$/g, '').trim();
          }
        }
      }

      if (!responseText || responseText.length < 3) {
        return "Hey! How are you?";
      }

      return responseText;
    } catch (error) {
      console.error('LLM error:', error);
      return "Oops! Something went wrong 😅";
    }
  }
}

export default new LocalLLM();