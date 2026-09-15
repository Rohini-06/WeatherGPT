from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import httpx
import os
from google import genai
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPEN_METEO_GEO = "https://geocoding-api.open-meteo.com/v1/search"
OPEN_METEO_WEATHER = "https://api.open-meteo.com/v1/forecast"


@app.get("/")
def root():
    return {"message": "WeatherGPT Backend is running!"}


@app.get("/search-location")
async def search_location(name: str):
    try:
        params = {
            "name": name,
            "count": 5,
            "language": "en",
            "format": "json",
        }

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(OPEN_METEO_GEO, params=params)
            response.raise_for_status()
            data = response.json()

        results = []
        for place in data.get("results", []):
            results.append(
                {
                    "name": place.get("name"),
                    "latitude": place.get("latitude"),
                    "longitude": place.get("longitude"),
                    "country": place.get("country"),
                    "state": place.get("admin1"),
                }
            )

        return {"results": results}

    except Exception as exc:
        return {"error": str(exc)}
    


class ChatRequest(BaseModel):
    question: str
    location: Optional[str] = ""
    weather: Optional[Dict[str, Any]] = None
    messages: Optional[List[Dict[str, str]]] = []


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        weather_info = request.weather or {}

        current = weather_info.get("current", {})
        daily = weather_info.get("daily", {})
        hourly = weather_info.get("hourly", {})

        prompt = f"""
You are WeatherGPT, an AI weather assistant.

Current location:
{request.location}

Current weather:
{current}

7-day forecast:
{daily}

Hourly forecast:
{hourly}

User question:
{request.question}

Answer naturally and clearly.

Rules:
- Answer based on the supplied weather data.
- If the user asks about rain, travel, outdoor activities, bikes, farming,
  marine conditions, or safety, give practical advice when relevant.
- Give weather alerts only when they are relevant to the question.
- Do not add unrelated warnings to every answer.
- If the requested information is not available in the supplied weather data,
  clearly say that it is not available.
- Keep the answer concise and easy to understand.
"""

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            return {
                "error": "GEMINI_API_KEY is not configured on the server."
            }

        client = genai.Client(api_key=api_key)

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt
        )

        answer = response.text

        return {
            "answer": answer
        }

    except Exception as exc:
        print("AI Error:", str(exc))
        return {
            "error": str(exc)
        }


@app.get("/weather")
async def weather(latitude: float, longitude: float):
    try:
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": ",".join(
                [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "apparent_temperature",
                    "precipitation",
                    "rain",
                    "weather_code",
                    "wind_speed_10m",
                ]
            ),
            "hourly": ",".join(
                [
                    "temperature_2m",
                    "precipitation_probability",
                    "weather_code",
                    "wind_speed_10m",
                ]
            ),
            "daily": ",".join(
                [
                    "weather_code",
                    "temperature_2m_max",
                    "temperature_2m_min",
                    "precipitation_probability_max",
                    "sunrise",
                    "sunset",
                ]
            ),
            "timezone": "auto",
            "forecast_days": 7,
        }

        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.get(OPEN_METEO_WEATHER, params=params)
            response.raise_for_status()
            data = response.json()

        return {
            "latitude": data.get("latitude"),
            "longitude": data.get("longitude"),
            "current": data.get("current"),
            "hourly": data.get("hourly"),
            "daily": data.get("daily"),
        }

    except Exception as exc:
        return {"error": str(exc)}
