#!/bin/bash
# Test examples for Local Rules Engine

echo "🧪 Testing Local Rules Engine API - Port 3000"
echo "============================================="

echo ""
echo "1️⃣ Testing valid email:"
curl -X POST http://localhost:3000/evaluate \
  -H "Content-Type: application/json" \
  -d '{"input": "John Silva has email john@email.com"}' \
  -w "\n\n"

echo "2️⃣ Testing ALL CAPS text:"
curl -X POST http://localhost:3000/evaluate \
  -H "Content-Type: application/json" \
  -d '{"input": "THIS TEXT IS ALL IN CAPS"}' \
  -w "\n\n"

echo "3️⃣ Testing invalid date:"
curl -X POST http://localhost:3000/evaluate \
  -H "Content-Type: application/json" \
  -d '{"input": "Birth date: 31/02/2023"}' \
  -w "\n\n"

echo "4️⃣ Testing number above limit:"
curl -X POST http://localhost:3000/evaluate \
  -H "Content-Type: application/json" \
  -d '{"input": "Value: 1500 (above limit)"}' \
  -w "\n\n"

echo "5️⃣ Testing code detection:"
curl -X POST http://localhost:3000/evaluate \
  -H "Content-Type: application/json" \
  -d '{"input": "console.log(\"Hello World\");"}' \
  -w "\n\n"

echo "6️⃣ Testing health endpoint:"
curl -X GET http://localhost:3000/health \
  -w "\n\n"

echo "7️⃣ Testing info endpoint:"
curl -X GET http://localhost:3000/ \
  -w "\n\n"

echo "✅ All tests completed!"
