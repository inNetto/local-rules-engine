<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          🤖 Local Rules Engine
        </h1>
        <p class="text-gray-600 text-lg">
          Powered by Ollama AI - Intelligent Text Analysis & Business Rule Validation
        </p>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <!-- Input Section -->
          <div class="mb-6">
            <label for="text-input" class="block text-sm font-medium text-gray-700 mb-2">
              Enter your text for analysis:
            </label>
            <textarea
              id="text-input"
              v-model="inputText"
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Type your text here... The system will analyze it according to the defined business rules."
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 mb-6">
            <button
              @click="analyzeText"
              :disabled="!inputText.trim() || loading"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Analyzing...' : '🔍 Analyze Text' }}
            </button>
            
            <button
              @click="clearAll"
              class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              🗑️ Clear
            </button>
          </div>

          <!-- Results Section -->
          <div v-if="result" class="border-t pt-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Analysis Result:</h3>
            <div class="bg-gray-50 rounded-md p-4">
              <div class="whitespace-pre-wrap text-gray-700">{{ result }}</div>
            </div>
          </div>

          <!-- Error Section -->
          <div v-if="error" class="border-t pt-6">
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">Error</h3>
                  <div class="mt-2 text-sm text-red-700">{{ error }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Server Status -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="[serverStatus ? 'bg-green-400' : 'bg-red-400', 'w-3 h-3 rounded-full mr-3']"></div>
              <span class="text-sm font-medium text-gray-700">
                Server Status: {{ serverStatus ? 'Connected' : 'Disconnected' }}
              </span>
            </div>
            <button
              @click="checkServerStatus"
              class="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              🔄 Check Status
            </button>
          </div>
        </div>

        <!-- Rules Info -->
        <div class="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">📋 Active Business Rules:</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Always respond in English</li>
            <li>• Validate numbers are within acceptable limits (0-1000)</li>
            <li>• Check email format validation</li>
            <li>• Verify dates are in DD/MM/YYYY format</li>
            <li>• Suggest summaries for long texts (>500 characters)</li>
            <li>• Identify formatting problems and inconsistencies</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const inputText = ref('')
const result = ref('')
const error = ref('')
const loading = ref(false)
const serverStatus = ref(false)

const API_BASE_URL = 'http://localhost:3001'

// Check if server is running
const checkServerStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    serverStatus.value = response.ok
  } catch (err) {
    serverStatus.value = false
  }
}

// Analyze text using the rules engine
const analyzeText = async () => {
  if (!inputText.value.trim()) return
  
  loading.value = true
  error.value = ''
  result.value = ''
  
  try {
    const response = await fetch(`${API_BASE_URL}/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: inputText.value
      })
    })
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`)
    }
    
    const data = await response.json()
    result.value = data.result || data.analysis || 'Analysis completed successfully'
    
  } catch (err) {
    console.error('Error analyzing text:', err)
    error.value = `Failed to analyze text: ${err.message}. Make sure the backend server is running on port 3001.`
  } finally {
    loading.value = false
  }
}

// Clear all inputs and results
const clearAll = () => {
  inputText.value = ''
  result.value = ''
  error.value = ''
}

// Check server status on mount
onMounted(() => {
  checkServerStatus()
})
</script>
