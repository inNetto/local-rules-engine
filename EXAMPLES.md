# Local Rules Engine - Examples

## 📝 Test Examples

Here are some examples to test the Rules Engine functionality:

### ✅ Valid Examples

1. **Valid Email and Number:**
   ```
   João Silva has email joao.silva@company.com and number 500
   ```

2. **Valid Date:**
   ```
   The event is scheduled for 25/12/2024
   ```

3. **Simple Text:**
   ```
   This is a simple text for analysis
   ```

### ⚠️ Examples that Trigger Warnings

1. **Number Out of Range:**
   ```
   The price is 1500 dollars
   ```

2. **Invalid Email Format:**
   ```
   Contact me at john.email.com
   ```

3. **Wrong Date Format:**
   ```
   The meeting is on 2024-12-25
   ```

4. **Long Text (>500 characters):**
   ```
   This is a very long text that contains more than 500 characters and should trigger a suggestion for summary. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
   ```

5. **ALL CAPS Text:**
   ```
   THIS TEXT IS WRITTEN IN ALL CAPS AND NEEDS FORMATTING CORRECTION
   ```

### 🔍 Mixed Examples

1. **Multiple Issues:**
   ```
   JOHN HAS EMAIL john.email.com AND NUMBER 2000 ON DATE 2024/12/25
   ```

2. **Partial Valid:**
   ```
   Contact mary@company.com for details about order 750
   ```

## 🎯 Expected Behaviors

- **Valid inputs**: Receive approval status
- **Invalid emails**: Get format correction suggestions
- **Numbers >1000**: Receive out-of-range warnings
- **Wrong date formats**: Get DD/MM/YYYY format suggestions
- **Long texts**: Get summary recommendations
- **ALL CAPS**: Get proper formatting suggestions

## 🚀 How to Test

1. **Using the Web Interface:**
   - Open http://localhost:5173
   - Paste any example above
   - Click "Analyze Text"

2. **Using cURL:**
   ```bash
   curl -X POST http://localhost:3001/evaluate \
     -H "Content-Type: application/json" \
     -d '{"input": "Your test text here"}'
   ```

3. **Using the CLI:**
   ```bash
   npm start
   # Enter your text when prompted
   ```
