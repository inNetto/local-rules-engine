import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import OllamaService from './services/ollamaService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RulesEngine {
  constructor() {
    this.ollamaService = new OllamaService();
    this.rulesPath = path.join(__dirname, '../rules.txt');
  }

  async loadRules() {
    try {
      const rules = await fs.readFile(this.rulesPath, 'utf-8');
      return rules;
    } catch (error) {
      throw new Error(`Error loading rules: ${error.message}`);
    }
  }

  async applyRules(input) {
    try {
      // Verify if model is available
      const modelAvailable = await this.ollamaService.verifyModel();
      if (!modelAvailable) {
        throw new Error('Model not found in Ollama');
      }

      // Load rules
      const rules = await this.loadRules();
      
      // Form the prompt
      const prompt = `${rules}\n\nANALYZE THE FOLLOWING INPUT:\n"${input}"\n\nApply the rules above and provide your analysis:`;
      
      console.log('🔄 Sending to model...');
      
      // Send to model
      const response = await this.ollamaService.chat(prompt);
      
      return response;
    } catch (error) {
      throw new Error(`Error applying rules: ${error.message}`);
    }
  }
}

// Main function for testing
async function main() {
  const engine = new RulesEngine();
  
  // Usage examples
  const examples = [
    "John Silva is 25 years old and email john@email.com",
    "TEXT IN ALL CAPS NEEDS TO BE CORRECTED",
    "Birth date: 31/02/2023",
    "Value: 1500 (above limit)",
    "console.log('Hello World');"
  ];

  console.log('🚀 Local Rules Engine - Starting...\n');

  for (const input of examples) {
    try {
      console.log(`📝 Input: "${input}"`);
      const result = await engine.applyRules(input);
      console.log(`✅ Result:\n${result}\n`);
      console.log('─'.repeat(50));
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
    }
  }
}

// Execute if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { RulesEngine };
