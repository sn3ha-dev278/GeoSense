# 🌍 GeoSense: AI-Powered Context-Aware Local Discovery Platform

## Summary

**GeoSense** is a production-grade, full-stack AI-powered local discovery platform that transcends traditional keyword-based search. Rather than simply returning lists of nearby places, GeoSense functions as an intelligent decision-support assistant that understands user intent, analyzes contextual factors, and delivers personalized recommendations with transparent reasoning.

Using conversational natural language processing, advanced geospatial computing, multi-factor recommendation algorithms, and real-time contextual analysis, GeoSense helps users discover the most suitable locations based on their goals, preferences, and real-world conditions—not keyword matching.

**Current Status:** Production-ready architecture with 180-day implementation roadmap  
**Target Users:** End-consumers seeking intelligent local discovery (Scale: millions of daily active users)  
**Key Innovation:** Explanation-driven recommendations with contextual reasoning

---

## Problem Statement

Today's location discovery experience is broken:

- **Google Maps** returns lists of places without understanding your actual intent
- **Yelp** relies on keyword matching, not context-aware intelligence
- Users spend 15-20 minutes filtering through options that might not fit their specific situation
- Context matters: A café recommendation at 3 AM is different from 3 PM; weather affects outdoor venue suitability; crowd levels change throughout the day

**GeoSense solves this** by combining:
- Natural language understanding of user intent
- Real-time contextual data (weather, crowd levels, time, day of week)
- Intelligent ranking of candidates using 10+ weighted factors
- Transparent explanations for every recommendation

---

##  Key Features

### Conversational AI Interface
```
User: "I need a quiet café to work for three hours with good coffee"
GeoSense: Understands intent, extracts structured requirements, generates recommendations
```

- Natural language query processing via Google Gemini API
- Multi-turn conversation memory for contextual follow-ups
- Intent extraction for category, budget, atmosphere, time constraints, travel mode
- Clarifying questions for ambiguous requests

### Intelligent Recommendation Engine
- **Candidate Generation:** Retrieves 100+ nearby places from OpenStreetMap
- **Smart Filtering:** Removes unsuitable places based on 8+ filter criteria
- **Context Enrichment:** Adds weather, crowd levels, travel time, opening hours
- **Multi-Factor Scoring:** Weights 10+ factors (distance, ratings, budget, atmosphere, etc.)
- **Transparent Explanations:** Shows top 3-5 reasons why each place was recommended

### Real-Time Geospatial Analysis
- PostgreSQL + PostGIS for efficient geometric queries
- Haversine distance calculations for precise proximity analysis
- Bounding box queries for large-scale place discovery
- Radius-based filtering with configurable search distances
- Support for walking, cycling, and driving directions

### Contextual Intelligence
- **Weather Integration:** Suggests indoor venues during rain, outdoor spaces during sunshine
- **Crowd Estimation:** Predicts busyness based on time, day, weather, historical patterns
- **Time-Based Optimization:** Matches business hours with user availability
- **Travel Mode Analysis:** Calculates travel time for walking/cycling/driving
- **Personalization:** Learns from user history and preferences over time

### Interactive Map Interface
- Real-time marker updates as recommendations change
- Category-based marker styling with custom icons
- Route visualization with turn-by-turn directions
- Location-based filtering and layer controls
- Responsive design for mobile and desktop

### User Personalization Engine
- Preference learning from search and interaction history
- Saved places and bookmarks for quick access
- Search history with replay functionality
- Feedback collection (ratings, comments, visit confirmation)
- Behavioral analytics for increasingly relevant recommendations

---

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Chat UI      │  │ Recommendation│  │ Map Interface│           │
│  │              │  │ Display       │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY & LOAD BALANCER                   │
│                    Rate Limiting | CORS | Auth                  │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Chat Service    │ │ Recommendation   │ │  Map Service     │
│  - Intent        │ │  Engine          │ │  - Routing       │
│    Extraction    │ │  - Candidate     │ │  - Geofencing    │
│  - Context Mgmt  │ │    Generation    │ │  - Layer Control │
└──────────────────┘ │  - Filtering     │ └──────────────────┘
        │            │  - Scoring       │         │
        │            │  - Ranking       │         │
        │            │  - Explanation   │         │
        │            │    Generation    │         │
        │            └──────────────────┘         │
        └─────────────────────┬────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Auth Service    │ │ User Service     │ │ Data Enrichment  │
│  - JWT           │ │  - Profile       │ │  - Weather API   │
│  - Sessions      │ │  - Preferences   │ │  - Place Details │
└──────────────────┘ │  - History       │ │  - Amenities     │
                     │  - Feedback      │ └──────────────────┘
                     └──────────────────┘
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────────┐  ┌──────────────┐  ┌─────────────┐
   │ PostgreSQL  │  │    Redis     │  │ External    │
   │  +PostGIS   │  │  (Cache)     │  │ APIs        │
   └─────────────┘  └──────────────┘  └─────────────┘
```

### Technology Stack

#### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.x
- **Language:** JavaScript/TypeScript
- **Database:** PostgreSQL 14+ with PostGIS extension
- **Cache Layer:** Redis (ioredis client)
- **AI/NLP:** Google Gemini API
- **Geospatial:** Overpass API, Nominatim, PostGIS
- **Authentication:** JWT (jsonwebtoken), bcrypt
- **Testing:** Jest, Supertest
- **Logging:** Winston
- **Rate Limiting:** express-rate-limit

#### Frontend
- **Framework:** React 18.x with Hooks
- **Styling:** Tailwind CSS + styled-components
- **State Management:** Redux Toolkit or Zustand
- **HTTP Client:** Axios with interceptors
- **Maps:** Leaflet + React-Leaflet
- **Routing:** React Router v6
- **Build Tool:** Vite
- **Testing:** Vitest, React Testing Library
- **UI Components:** Radix UI or Material-UI

#### DevOps & Infrastructure
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Hosting Options:** AWS (Elastic Beanstalk), Google Cloud, DigitalOcean
- **CDN:** CloudFront / Cloudflare
- **Monitoring:** Prometheus, Grafana, ELK Stack
- **Error Tracking:** Sentry
- **Performance:** New Relic / Datadog

---

## Core Algorithms

### 1. Intent Extraction Algorithm
Powered by Google Gemini API with custom prompt engineering:

```
Input: "I'm looking for a quiet place to study with WiFi for 2 hours"
Output: {
  category: "libraries, study_spaces, cafes",
  atmosphere: ["quiet", "low_crowd"],
  amenities: ["wifi", "seating"],
  duration: 120,
  maxDistance: 5,
  travelMode: "walking",
  budget: "any",
  specialRequirements: ["accessible_wifi"]
}
```

**Algorithm:** Prompt-based extraction with JSON parsing and validation

### 2. Multi-Factor Scoring Engine

Each candidate place receives a final score combining 10 weighted factors:

```
Final Score = (
  Distance Score × 0.20 +
  Rating Score × 0.15 +
  Budget Score × 0.15 +
  Opening Hours Score × 0.10 +
  Travel Time Score × 0.10 +
  Crowd Level Score × 0.10 +
  Weather Suitability × 0.10 +
  User Preferences × 0.05 +
  Popularity Score × 0.05
)

Scale: 0-100
```

**Complexity:** O(n × m) where n = candidates, m = factors

### 3. Crowd Level Estimation

Predicts busyness using multiple signals:

```javascript
crowdLevel = (
  baselineOccupancy[placeType][hour] × 0.4 +
  weatherImpact[currentWeather] × 0.2 +
  dayOfWeekFactor[weekday] × 0.2 +
  historicalData[placeId][hour] × 0.2
)

Returns: "Very Low" | "Low" | "Moderate" | "High" | "Very High"
```

**Data Sources:**
- Business type typical patterns
- Real-time weather conditions
- Day/holiday identification
- User feedback (future enhancement)

### 4. Context-Aware Ranking

Adjusts recommendation weights based on context:

```
if (weather === "rainy") {
  weights.outdoor_attractiveness -= 0.3
  weights.indoor_comfort += 0.2
}

if (isEveningTime()) {
  weights.safety -= 0.1
  weights.lighting += 0.15
}

if (crowdLevel === "very_high") {
  weights.quiet_atmosphere += 0.2
}
```

**Reasoning:** Recommendations adapt to real-time conditions

---

## Performance Metrics

### System Performance Targets
- **API Response Time:** < 500ms (p95)
- **Recommendation Generation:** < 2s (end-to-end)
- **Search Latency:** < 1s (p95)
- **Database Query Time:** < 100ms (p95)
- **Cache Hit Ratio:** > 75%
- **Availability:** 99.9% SLA

### Optimization Strategies
- **Database Indexing:** PostGIS spatial indexes on location columns
- **Query Optimization:** Bounding box queries instead of full table scans
- **Caching Strategy:** 
  - Geocoding results: 30-day TTL
  - Place details: 7-day TTL
  - Weather data: 1-hour TTL
  - Recommendation results: 5-minute TTL
- **Lazy Loading:** Frontend components and API routes
- **CDN:** Static assets served globally
- **Horizontal Scaling:** Stateless backend services

### Scalability Architecture
- **Database:** Read replicas for analytics, connection pooling (30 connections per instance)
- **Cache:** Redis Cluster for high availability
- **API Servers:** Auto-scaling groups based on CPU/memory
- **Queue System:** Redis Streams for async tasks (optional)
- **Load Balancing:** Round-robin with health checks

---

## Getting Started

### Prerequisites
```bash
- Node.js 18+ and npm/yarn
- PostgreSQL 14+ with PostGIS extension
- Redis 6.0+
- Git
```

### Quick Start

#### 1. Clone Repository
```bash
git clone https://github.com/your-org/geosense.git
cd geosense
```

#### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration

npm install
npm run migrations:up
npm run seed:dev
npm run dev
```

#### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env
# Edit .env with API endpoint

npm install
npm run dev
```

#### 4. Access Application
```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
API Docs: http://localhost:5000/api/docs
```

### Environment Variables

**Backend (.env)**
```
# Server
NODE_ENV=development
PORT=5000
LOG_LEVEL=debug

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=geosense
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_URL=redis://localhost:6379

# APIs
GEMINI_API_KEY=your_gemini_key
OPENWEATHER_API_KEY=your_weather_key
GOOGLE_MAPS_API_KEY=your_maps_key

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
REFRESH_TOKEN_EXPIRE=30d

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

## API Documentation

### Core Endpoints

#### Chat & Recommendations
```
POST   /api/chat                  Send message, get recommendations
GET    /api/chat/history          Get conversation history
POST   /api/recommendations       Get recommendations for intent
GET    /api/recommendations/:id   Get recommendation details
POST   /api/recommendations/:id/feedback  Submit feedback
```

#### User Management
```
POST   /api/auth/register         User registration
POST   /api/auth/login            User login
POST   /api/auth/refresh          Refresh JWT token
GET    /api/users/profile         Get user profile
PUT    /api/users/profile         Update user profile
GET    /api/users/preferences     Get user preferences
PUT    /api/users/preferences     Update preferences
```

#### Search & History
```
GET    /api/search-history        Get past searches
POST   /api/search-history/clear  Clear search history
GET    /api/saved-places          Get bookmarked places
POST   /api/saved-places/:id      Bookmark a place
DELETE /api/saved-places/:id      Remove bookmark
```

#### Map Services
```
GET    /api/map/places             Get places for map view
GET    /api/map/recommendations    Get recommendations as GeoJSON
POST   /api/map/routes             Get directions/routes
GET    /api/map/areas              Get area boundaries
```

### Response Format

```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "id": "place_123",
        "name": "The Coffee Lab",
        "category": "cafe",
        "rating": 4.5,
        "distance": 0.8,
        "score": 92.5,
        "explanations": [
          "Only 0.8 km away (5 min walk)",
          "Highly rated (4.5/5 stars)",
          "Usually quiet in afternoon"
        ],
        "openNow": true,
        "closingTime": "22:00",
        "amenities": ["wifi", "seating", "outlets"],
        "image": "https://...",
        "address": "123 Main St, City"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_abc123"
}
```

---
