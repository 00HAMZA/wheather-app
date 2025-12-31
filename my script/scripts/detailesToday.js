import { getData } from "./fetchingData.js";
import {set_Day_hour} from "../scripts/fetchingData.js";
async function getAirQuality(city) {
  let airData;
  let uvData;
  try {
    const data = await getData(city);
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const weatherApiKey = "6c5aa638b47d9c035d3b8a995b865304";
    const openUvApiKey = "openuv-ubi59bermjq7p7zf-io";

    const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
    const uvUrl = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`;

    const [airRes, uvRes] = await Promise.all([
      fetch(airUrl),
      fetch(uvUrl, {
        headers: {
          "x-access-token": openUvApiKey,
        },
      }),
    ]);

    if (airRes.ok) {
      airData = await airRes.json();
    } else {
      console.log("Air quality fetching failed", airRes.status);
    }
    if (uvRes.ok) {
      uvData = await uvRes.json();
    } else {
      console.log("uvData fetching failed", uvRes.status);
    }
  } catch (error) {
    console.log("error:", error);
  }
  return { airData, uvData };
}
function getAQIIcon(aqi) {
  const icons = {
    1: "😊",
    2: "🙂",
    3: "😐",
    4: "😷",
    5: "☠️",
  };
  return icons[aqi] || "❓";
}
function getcomment(aqi) {
  const icons = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };
  return icons[aqi] || "None";
}
async function handle_qualityAir(city) {
  const data = (await getAirQuality(city)).airData;
  const air = data.list[0].main.aqi;
  const comment = getcomment(air);
  const icon = getAQIIcon(air);
  return { air, comment, icon };
}
/*handle_qualityAir("rabat");
async function dom_Air(city) {
  const data = await handle_qualityAir(city);
  const air = data.air;
  const comment = data.comment;
  console.log("air and comment : ", air, comment);
  document.querySelector(".numberAir").innerHTML = air;
  document.querySelector(".iconAir").innerHTML = comment;
}*/
//dom_Air("rabat");
export async function handleDetailes(city) {
  const data = await getData(city);
  let res = [];
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  let sun = [sunrise, sunset];
  const wind = data.wind.speed;
  const visibility = data.visibility;
  const air = await handle_qualityAir(city);
  res = [sun, wind, visibility, air];
  return res;
}
function handle_hour(time) {
  const date = new Date(time * 1000);
  const rawHour = date.getHours();
  const minutes = date.getMinutes();
  const ampm = rawHour >= 12 ? "PM" : "AM";
  const hour = rawHour % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hour}:${displayMinutes} ${ampm}`;
}
async function handle_dom_Detailes(city) {
  const data = await handleDetailes(city);
  const sunset_sunrise =  data[0];
  const sunset = handle_hour(sunset_sunrise[0]);
  const sunrise = handle_hour(sunset_sunrise[1]);
  console.log("daaate",  set_Day_hour(sunset_sunrise[0]));
  const airQuality = data[3];
  console.log("the icon is :", airQuality.icon);
  document.querySelector(".number_Air").innerHTML = airQuality.air;
  document.querySelector(".commentair .text_commentair").innerHTML =
    airQuality.comment;
  document.querySelector(".commentair .emoji_commentair").textContent =
    airQuality.icon;
  document.querySelector(".sunset_time").innerHTML = sunset;
  document.querySelector(".sunrise_time").innerHTML = sunrise;
}
handle_dom_Detailes("rabat");
