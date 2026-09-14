from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

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
