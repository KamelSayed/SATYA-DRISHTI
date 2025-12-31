# 🚀 SATYA-DRISHTI - Round 2 Improvements

## Introduction to Round 2 Focus

Round 1 mein humne core AI engine (text/image analysis) aur basic dashboard build kiya, jo **87% accuracy** achieve kar chuka hai. Round 2 mein focus hai **production-grade scalability**, **multi-modal expansion (video/audio)**, **real govt API integrations**, aur **explainable AI** pe – yeh sab SIH ke 'Innovation & Impact' criteria ko hit karega.

Yeh improvements system ko **MeitY/Cybercell** ke liye ready bana denge, with **92%+ accuracy** aur **100x traffic handling**. Humara goal hai ki yeh system real-world deployment ke liye taiyar ho, with enterprise-level security, scalability, aur transparency.

---

## Detailed Improvement Breakdown

### 1. 🔗 Real API Integrations

#### Current Gap
- Mock PIB data (50 entries) se limited credibility checks
- No live translation support
- Hardcoded fake news database
- No real-time government data sync

#### Round 2 Solution
- Official **PIB Fact-Check API** integration for real-time news verification
- **Bhashini API** for government-approved multilingual processing
- Expand fake news DB to **1000+ entries** via open datasets (Kaggle/PIB archives)
- Live government portal integration for source credibility

#### Technical Implementation

**PIB API Integration:**
```python
import redis
import requests
from datetime import timedelta

# Redis setup for caching
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

def verify_source_pib(content, url):
    """
    Verify content against PIB Fact-Check database
    """
    cache_key = f"factcheck:{hash(content)}"
    
    # Check cache first
    if r.exists(cache_key):
        return eval(r.get(cache_key))
    
    try:
        # PIB API call
        pib_response = requests.get(
            "https://factcheck.pib.gov.in/api/v1/factcheck",
            params={'query': content[:500], 'url': url},
            timeout=5
        ).json()
        
        credibility_score = pib_response.get('credibility_score', 50)
        is_verified = pib_response.get('is_verified', False)
        fact_check_url = pib_response.get('fact_check_url', '')
        
        result = {
            'credibility': credibility_score,
            'verified': is_verified,
            'source': fact_check_url
        }
        
        # Cache for 1 hour
        r.setex(cache_key, 3600, str(result))
        return result
        
    except Exception as e:
        print(f"PIB API Error: {e}")
        return {'credibility': 50, 'verified': False, 'source': ''}
```

**Bhashini Integration:**
```python
from bhashini import BhashiniClient

class BhashiniTranslator:
    def __init__(self, api_key):
        self.client = BhashiniClient(api_key=api_key)
        self.supported_languages = [
            'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa'
        ]
    
    def translate_to_english(self, text, source_lang):
        """
        Translate Indian language text to English for analysis
        """
        if source_lang not in self.supported_languages:
            return text
        
        try:
            translated = self.client.translate(
                text=text,
                source_lang=source_lang,
                target_lang='en'
            )
            return translated['translated_text']
        except Exception as e:
            print(f"Bhashini Error: {e}")
            return text
    
    def detect_language(self, text):
        """
        Detect language using Bhashini
        """
        try:
            result = self.client.detect_language(text)
            return result['language_code']
        except:
            return 'en'
```

**Fake News Database Expansion:**
```python
import pandas as pd
from pymongo import MongoClient

def expand_fake_news_database():
    """
    Load and expand fake news database from multiple sources
    """
    client = MongoClient('mongodb://localhost:27017/')
    db = client['satya_drishti']
    collection = db['fake_news_db']
    
    # Load from Kaggle datasets
    datasets = [
        'data/pib_factcheck.csv',
        'data/indian_fake_news.csv',
        'data/hasoc_dataset.csv'
    ]
    
    total_entries = 0
    for dataset in datasets:
        df = pd.read_csv(dataset)
        records = df.to_dict('records')
        collection.insert_many(records)
        total_entries += len(records)
    
    print(f"Expanded database to {total_entries} entries")
    return total_entries
```

#### Expected Outcomes
- Fake news detection accuracy: **95%+**
- Support for **22+ Indian languages** via Bhashini
- Real-time government data sync
- Reduced false positives by **15%**

#### Timeline & Risks
- **Timeline**: Days 1-3 (3 days)
- **Effort**: 24 man-hours
- **Risks**: 
  - API rate limits → Mitigation: Implement queuing with Celery
  - API downtime → Mitigation: Fallback to cached data
- **Testing**: 100 sample URLs with known fake news

---

### 2. 🎥 Video & Audio Analysis

#### Current Gap
- Only text/image analysis supported
- Misses deepfakes and manipulated videos
- No voice-based hate speech detection
- Cannot analyze live streams

#### Round 2 Solution
- **Deepfake Video Detection** using frame-by-frame analysis
- **Audio Speech Analysis** for harmful voice content
- **Live Stream Monitoring** for real-time video moderation
- **Subtitle/Caption Extraction** and analysis

#### Technical Implementation

**Video Analysis Pipeline:**
```python
import cv2
import torch
from transformers import CLIPProcessor, CLIPModel
import numpy as np

class VideoAnalyzer:
    def __init__(self):
        self.clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        self.clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        
        # Labels for classification
        self.violence_labels = ["violence", "fighting", "weapons", "blood"]
        self.nsfw_labels = ["nudity", "explicit content", "adult content"]
        
    def extract_frames(self, video_path, num_frames=10):
        """
        Extract key frames from video
        """
        cap = cv2.VideoCapture(video_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        frame_indices = np.linspace(0, total_frames-1, num_frames, dtype=int)
        
        frames = []
        for idx in frame_indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if ret:
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frames.append(frame_rgb)
        
        cap.release()
        return frames
    
    def analyze_frame(self, frame, labels):
        """
        Analyze single frame using CLIP
        """
        inputs = self.clip_processor(
            text=labels,
            images=frame,
            return_tensors="pt",
            padding=True
        )
        
        outputs = self.clip_model(**inputs)
        logits_per_image = outputs.logits_per_image
        probs = logits_per_image.softmax(dim=1)
        
        return probs.max().item()
    
    def analyze_video(self, video_path):
        """
        Complete video analysis
        """
        frames = self.extract_frames(video_path)
        
        violence_scores = []
        nsfw_scores = []
        
        for frame in frames:
            violence_score = self.analyze_frame(frame, self.violence_labels)
            nsfw_score = self.analyze_frame(frame, self.nsfw_labels)
            
            violence_scores.append(violence_score)
            nsfw_scores.append(nsfw_score)
        
        return {
            'violence': {
                'detected': max(violence_scores) > 0.7,
                'confidence': max(violence_scores),
                'avg_score': np.mean(violence_scores)
            },
            'nsfw': {
                'detected': max(nsfw_scores) > 0.7,
                'confidence': max(nsfw_scores),
                'avg_score': np.mean(nsfw_scores)
            }
        }
```

**Audio Analysis with Whisper:**
```python
import whisper
from pydub import AudioSegment

class AudioAnalyzer:
    def __init__(self):
        self.whisper_model = whisper.load_model("base")
        
    def extract_audio(self, video_path):
        """
        Extract audio from video
        """
        audio = AudioSegment.from_file(video_path)
        audio_path = video_path.replace('.mp4', '.wav')
        audio.export(audio_path, format='wav')
        return audio_path
    
    def transcribe_audio(self, audio_path):
        """
        Transcribe audio to text using Whisper
        """
        result = self.whisper_model.transcribe(audio_path)
        return {
            'text': result['text'],
            'language': result['language'],
            'segments': result['segments']
        }
    
    def analyze_audio_content(self, video_path, text_analyzer):
        """
        Complete audio analysis pipeline
        """
        # Extract audio
        audio_path = self.extract_audio(video_path)
        
        # Transcribe
        transcription = self.transcribe_audio(audio_path)
        
        # Analyze transcribed text
        text_analysis = text_analyzer.analyze(transcription['text'])
        
        return {
            'transcription': transcription['text'],
            'language': transcription['language'],
            'text_analysis': text_analysis
        }
```

**Deepfake Detection:**
```python
from deepfake_detector import DeepfakeDetector

class DeepfakeAnalyzer:
    def __init__(self):
        self.detector = DeepfakeDetector()
        
    def detect_deepfake(self, video_path):
        """
        Detect if video is deepfake
        """
        result = self.detector.predict(video_path)
        
        return {
            'is_deepfake': result['prediction'] == 'fake',
            'confidence': result['confidence'],
            'manipulation_type': result.get('type', 'unknown')
        }
```

#### Expected Outcomes
- Full multi-modal coverage (text + image + video + audio)
- Deepfake detection: **90% accuracy**
- Audio hate speech detection: **88% accuracy**
- Live stream monitoring capability

#### Timeline & Risks
- **Timeline**: Days 4-6 (3 days)
- **Effort**: 30 man-hours
- **Risks**:
  - High compute requirements → Mitigation: GPU fallback, optimize frame sampling
  - Large video files → Mitigation: Limit to 5-minute clips, compress
- **Testing**: 50 sample videos (deepfakes, violence, normal)

---

### 3. 🔐 Enterprise Security & Scalability

#### Current Gap
- No authentication system
- Single server deployment
- No caching mechanism
- Cannot handle high traffic

#### Round 2 Solution
- **JWT Authentication** with role-based access control
- **Redis Caching** for 10x faster repeated analysis
- **Rate Limiting** to handle 1M+ requests/day
- **Load Balancing** with Nginx
- **WebSocket Support** for real-time updates

#### Technical Implementation

**JWT Authentication:**
```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

app = FastAPI()
security = HTTPBearer()

SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthManager:
    @staticmethod
    def create_access_token(data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    @staticmethod
    def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
        try:
            token = credentials.credentials
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            role: str = payload.get("role")
            
            if username is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication credentials"
                )
            
            return {"username": username, "role": role}
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )

# Role-based access control
def require_role(required_role: str):
    def role_checker(user: dict = Depends(AuthManager.verify_token)):
        if user["role"] != required_role and user["role"] != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return user
    return role_checker

# Protected endpoint example
@app.post("/analyze/")
async def analyze_content(
    url: str,
    user: dict = Depends(require_role("analyst"))
):
    # Analysis logic here
    return {"message": "Analysis started", "user": user["username"]}
```

**Redis Caching:**
```python
import redis
import json
import hashlib

class CacheManager:
    def __init__(self):
        self.redis_client = redis.Redis(
            host='localhost',
            port=6379,
            db=0,
            decode_responses=True
        )
    
    def get_cache_key(self, url: str) -> str:
        """Generate cache key from URL"""
        return f"analysis:{hashlib.md5(url.encode()).hexdigest()}"
    
    def get_cached_analysis(self, url: str):
        """Get cached analysis result"""
        cache_key = self.get_cache_key(url)
        cached = self.redis_client.get(cache_key)
        
        if cached:
            return json.loads(cached)
        return None
    
    def cache_analysis(self, url: str, result: dict, ttl: int = 3600):
        """Cache analysis result for 1 hour"""
        cache_key = self.get_cache_key(url)
        self.redis_client.setex(
            cache_key,
            ttl,
            json.dumps(result)
        )
    
    def invalidate_cache(self, url: str):
        """Invalidate cached result"""
        cache_key = self.get_cache_key(url)
        self.redis_client.delete(cache_key)
```

**Rate Limiting:**
```python
from fastapi import Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/analyze/")
@limiter.limit("100/minute")  # 100 requests per minute
async def analyze_content(request: Request, url: str):
    # Analysis logic
    return {"status": "success"}
```

**Load Balancing (Nginx Config):**
```nginx
upstream satya_drishti_backend {
    least_conn;
    server backend1:8001 weight=3;
    server backend2:8001 weight=2;
    server backend3:8001 weight=1;
}

server {
    listen 80;
    server_name satya-drishti.gov.in;
    
    location / {
        proxy_pass http://satya_drishti_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Rate limiting
        limit_req zone=api_limit burst=20 nodelay;
    }
}

# Rate limit zone
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/m;
```

**WebSocket for Real-time Updates:**
```python
from fastapi import WebSocket, WebSocketDisconnect
from typing import List

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
    
    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@app.websocket("/ws/dashboard")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Send real-time statistics
            stats = get_realtime_stats()
            await websocket.send_json(stats)
            await asyncio.sleep(5)  # Update every 5 seconds
    except WebSocketDisconnect:
        manager.disconnect(websocket)
```

#### Expected Outcomes
- Handle **1M+ requests/day**
- **10x faster** repeated analysis with Redis
- **99.9% uptime** with load balancing
- Enterprise-grade security with JWT + RBAC

#### Timeline & Risks
- **Timeline**: Days 5-6 (2 days)
- **Effort**: 20 man-hours
- **Risks**:
  - Redis memory limits → Mitigation: LRU eviction policy
  - Load balancer complexity → Mitigation: Docker Compose setup
- **Testing**: Load testing with 10,000 concurrent requests

---

