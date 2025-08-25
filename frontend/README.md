# 🎨 Local Rules Engine Frontend

Frontend web application built with Vue 3 and Tailwind CSS v4 for interacting with the Local Rules Engine API.

## 🚀 Features

- **Modern UI**: Clean and responsive design with Tailwind CSS v4
- **Real-time Analysis**: Instant text analysis using the Rules Engine API
- **Server Status**: Live connection status monitoring
- **Error Handling**: Comprehensive error display and handling
- **Loading States**: Visual feedback during processing
- **Rules Display**: Shows active business rules for transparency

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Fetch API** - HTTP client for API communication

## 🏃 Quick Start

### Prerequisites
- Node.js 20+
- Local Rules Engine backend running on port 3000

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Usage

1. **Start the backend server** (from parent directory):
   ```bash
   cd ..
   npm run server
   ```

2. **Start the frontend** (in this directory):
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:5173`

4. **Enter text** in the textarea and click "Analyze Text"

## 📱 Interface

### Main Features:
- **Text Input Area**: Large textarea for entering text to analyze
- **Analyze Button**: Processes text through the Rules Engine
- **Clear Button**: Resets all fields
- **Results Display**: Shows analysis results in a formatted box
- **Error Display**: Shows errors with clear messaging
- **Server Status**: Real-time connection indicator
- **Active Rules**: List of currently active business rules

### Example Usage:
```
Input: "John Doe has email john@invalid-email and the number 1500"

Expected Output:
- Email format validation error
- Number exceeds acceptable limit (0-1000)
- Formatting suggestions
```

## 🔧 Configuration

The frontend connects to the backend at `http://localhost:3001` by default. To change this, modify the `API_BASE_URL` constant in `src/App.vue`.

## 🎨 Styling

This project uses Tailwind CSS v4 with:
- Gradient backgrounds
- Shadow effects
- Responsive design
- Smooth transitions
- Loading animations
- Status indicators

## 🚦 API Integration

The frontend communicates with these backend endpoints:

- `GET /health` - Server status check
- `POST /evaluate` - Text analysis
  ```json
  {
    "text": "Your text to analyze"
  }
  ```

## 🔍 Development

### File Structure:
```
src/
├── App.vue          # Main application component
├── main.js          # Application entry point
└── assets/
    ├── main.css     # Tailwind CSS imports
    └── base.css     # Base styles
```

### Key Components:
- **Text Analysis Form**: Input handling and validation
- **Results Display**: Formatted output rendering
- **Status Monitoring**: Real-time server connection
- **Error Handling**: User-friendly error messages
