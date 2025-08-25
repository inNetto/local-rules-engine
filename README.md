# Local Rules Engine

A Node.js system that uses Ollama local AI to apply business rules to text using natural language processing and intelligent analysis.

## 🚀 Setup

### Prerequisites
- Node.js 16+
- Ollama installed and running locally
- llama3 model downloaded in Ollama

### Installation

```bash
# Install dependencies
npm install

# Verify Ollama is running
curl http://localhost:11434/api/tags
```

### Configure Ollama
```bash
# Download llama3 model
ollama pull llama3

# Check available models
ollama list
```

## 📝 Usage

### CLI Mode
```bash
npm start
```

### REST Server
```bash
# Development
npm run dev

# Production
npm run server
```

## 🌐 API Endpoints

### POST /evaluate
Evaluates input using defined rules.

**Request:**
```json
{
  "input": "John Silva has email john@test.com"
}
```

**Response:**
```json
{
  "success": true,
  "input": "John Silva has email john@test.com",
  "result": "Status: APPROVED\nObservations: Valid email...",
  "timestamp": "2025-08-25T10:00:00.000Z"
}
```

### GET /health
Service health check.

### GET /
API documentation.

## 📋 Configured Rules

The rules are defined in `rules.txt` and include:
- Email validation
- Numeric limit verification
- Date validation
- Code detection
- Format analysis

## 🔧 Customization

To modify rules, edit the `rules.txt` file and restart the service.

## 📦 Project Structure

```
local-rules-engine/
├── src/
│   ├── index.js                 # Main RulesEngine class
│   ├── server.js               # Express REST server
│   └── services/
│       └── ollamaService.js    # Ollama communication service
├── rules.txt                  # Business rules in natural language
├── package.json                # Project configuration
└── README.md                   # This file
```

## 🛠 Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run CLI version
npm start

# Run server
npm run server
```

## 📖 How it Works

1. **Load Rules**: The system reads business rules from `rules.txt`
2. **Process Input**: User input is combined with rules to form a prompt
3. **AI Analysis**: The prompt is sent to Ollama's llama3 model
4. **Return Results**: The AI's analysis is returned to the user

## 🔍 Example Rules

The system can analyze:
- Email format validation
- Numeric ranges (0-1000)
- Date formats (DD/MM/YYYY)
- Text formatting issues
- Code language detection
- Business logic compliance

## 🚨 Requirements

- Ollama must be running on `localhost:11434`
- llama3 model must be available
- Node.js ES modules support (type: "module" in package.json)

## 📄 License

MIT
