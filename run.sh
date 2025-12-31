#!/bin/bash

echo "🇮🇳 SATYA-DRISHTI - Digital Suraksha Framework"
echo "Developer: Abhishek Giri | GitHub: abhishekgiri04"
echo "====================================================="
echo ""

echo "Cleaning up processes..."
lsof -ti:8001 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
echo "✅ Ports cleared"
echo ""

echo "Starting Backend API..."
cd "$(dirname "$0")/social-intel-agent"

if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Run: ./INSTALL.sh first"
    exit 1
fi

source venv/bin/activate
uvicorn src.app:app --port 8001 --reload &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo "📡 http://localhost:8001"
echo ""

sleep 3

echo "Starting Frontend..."
cd ../react-interface

if [ ! -d "node_modules" ]; then
    echo "❌ Node modules not found!"
    echo "Run: ./INSTALL.sh first"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo "📡 http://localhost:5173"
echo ""

echo "====================================================="
echo "✅ SATYA-DRISHTI Running"
echo "====================================================="
echo ""
echo "Access Points:"
echo "  Backend:  http://localhost:8001"
echo "  Frontend: http://localhost:5173"
echo "  API Docs: http://localhost:8001/docs"
echo ""
echo "Features:"
echo "  • 12 AI Models (7 Text + 5 Image)"
echo "  • 87% Accuracy | 9 Languages"
echo "  • Legal Compliance (IPC/IT Act)"
echo "  • Source Verification"
echo "  • Cybercell Reports"
echo ""
echo "Press Ctrl+C to stop"
echo ""

trap "echo ''; echo 'Stopping...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '✅ Stopped'; exit" INT

wait
