import { Ollama } from 'ollama';

class OllamaService {
  constructor() {
    this.ollama = new Ollama({ host: 'http://localhost:11434' });
    this.model = 'llama3';
  }

  async chat(prompt) {
    try {
      const response = await this.ollama.chat({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      });
      
      return response.message.content;
    } catch (error) {
      throw new Error(`Error communicating with Ollama: ${error.message}`);
    }
  }

  async verifyModel() {
    try {
      const models = await this.ollama.list();
      const modelExists = models.models.some(m => m.name.includes(this.model));
      
      if (!modelExists) {
        console.log(`Model ${this.model} not found. Available models:`);
        models.models.forEach(m => console.log(`- ${m.name}`));
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(`Error verifying models: ${error.message}`);
    }
  }
}

export default OllamaService;
