import express from 'express';
import cors from 'cors';
import { RulesEngine } from './index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Instantiate the rules engine
const rulesEngine = new RulesEngine();

// Log middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Main endpoint
app.post('/evaluate', async (req, res) => {
  try {
    const { input, text } = req.body;
    const textToAnalyze = text || input; // Accept both 'text' and 'input' for compatibility
    
    // Validation
    if (!textToAnalyze || typeof textToAnalyze !== 'string') {
      return res.status(400).json({
        error: '"text" or "input" field is required and must be a string'
      });
    }

    if (textToAnalyze.trim().length === 0) {
      return res.status(400).json({
        error: 'Input cannot be empty'
      });
    }

    console.log(`📝 Processing input: "${textToAnalyze}"`);
    
    // Apply rules
    const result = await rulesEngine.applyRules(textToAnalyze);
    
    // Response
    res.json({
      success: true,
      input: textToAnalyze,
      analysis: result,
      result: result, // Keep both for compatibility
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in /evaluate endpoint:', error.message);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Local Rules Engine',
    timestamp: new Date().toISOString()
  });
});

// Info endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Local Rules Engine',
    version: '1.0.0',
    endpoints: {
      'POST /evaluate': 'Evaluates input using rules and local AI',
      'GET /health': 'Service health check',
      'GET /': 'API information'
    },
    example: {
      url: 'POST /evaluate',
      body: { text: 'John has email john@test.com and the number 1500' }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`⚡ Main endpoint: POST http://localhost:${PORT}/evaluate`);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught error:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled promise rejection:', reason);
  process.exit(1);
});
