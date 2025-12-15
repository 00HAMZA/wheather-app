import { getData } from "./fetchingData.js";
export async function handleImage(city) {
  const data = await getData(city);
  const iconCode = data.weather[0].icon;
  const map = {
    "01d": "clear-day",
    "01n": "clear-night",
    "02d": "cloudly",
    "02n": "few-clouds-night",
    "03d": "cloudy",
    "04d": "overcast",
    "04n": "overcast",
    "09d": "shower-rain",
    "09n": "shower-rain",
    "10d": "rain",
    "10n": "rain-night",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snow",
    "13n": "snow",
    "50d": "mist",
    "50n": "mist",
  };
  return map[iconCode];
}
