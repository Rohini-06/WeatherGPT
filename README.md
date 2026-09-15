# 🌦️ WeatherGPT

WeatherGPT is an AI-powered weather application that provides real-time weather information, forecasts, location-based weather search, multilingual support, and intelligent weather guidance.

It combines a modern React frontend, FastAPI backend, Open-Meteo weather APIs, and local AI using Ollama to provide a conversational weather experience.

---

## 🚀 Live Demo

🌐 Frontend: https://weather-gpt-rose.vercel.app/

☁️ Backend: https://weathergpt-backend-201b.onrender.com/

---

## ✨ Features

### 🌤️ Weather Information
- Real-time weather information
- Current temperature
- Feels-like temperature
- Humidity
- Wind speed
- Precipitation
- Weather condition

### 🔎 Location Search
- Search weather by city or location
- Automatic location detection
- Current location weather using browser geolocation

### 📅 Forecast
- 7-day weather forecast
- Hourly weather information
- Sunrise and sunset timings
- Weather charts and visualizations

### 💬 AI Weather Chat
- Ask questions about weather using natural language
- Rain-related guidance
- Travel and outdoor activity guidance
- Weather-based recommendations
- Hourly forecast queries
- AI-powered conversational responses

### 🌾 Advisory Modules

#### 👨‍🌾 Farmers Advisory
Provides weather-based information useful for agricultural activities.

#### 🌊 Marine Advisory
Provides weather-related information useful for fishermen and marine activities.

#### 🚨 Disaster Advisory
Provides weather-related safety information for severe weather situations.

### 🌍 Other Features
- 🌐 Multilingual support
- 🎤 Voice input
- 🔊 Voice output
- 🌙 Dark / Light mode
- ⭐ Favorite cities
- 🌍 Compare multiple cities
- 📱 Responsive design for mobile and desktop

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Python
- FastAPI
- Uvicorn
- HTTPX
- Pydantic

### Weather API
- Open-Meteo Weather API
- Open-Meteo Geocoding API

### AI
- Ollama
- Llama 3.2 3B

### Deployment
- Vercel - Frontend
- Render - Backend

### Version Control
- Git
- GitHub

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      User           │
                    │ Mobile / Desktop    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React + Vite      │
                    │     Frontend        │
                    │      Vercel         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │      Backend        │
                    │       Render        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │   Open-Meteo    │        │  Local Ollama   │
        │ Weather APIs    │        │   Llama 3.2     │
        └─────────────────┘        └─────────────────┘