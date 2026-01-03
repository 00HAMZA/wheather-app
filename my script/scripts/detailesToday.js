import { getData } from "./fetchingData.js";
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
function handle_air_marginTop(aqi) {
  const margin = {
    1: "50px",
    2: "40px",
    3: "30px",
    4: "20px",
    5: "10px",
  };
  return margin[aqi];
}
async function handle_qualityAir(city) {
  const data = (await getAirQuality(city)).airData;
  const air = data.list[0].main.aqi;
  const comment = getcomment(air);
  const icon = getAQIIcon(air);
  return { air, comment, icon };
}
async function handle_cadr_air_quality(city) {
  const data = await handle_qualityAir(city);
  const air = data.air;
  const margin = handle_air_marginTop(air);
  return `${margin}`;
}
export async function handleDetailes(city) {
  const data = await getData(city);
  let res = [];
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  let sun = [sunrise, sunset];
  const wind = data.wind.speed;
  const visibility = data.visibility;
  const humidity = data.main.humidity;
  const air = await handle_qualityAir(city);
  res = [sun, wind, visibility, air, humidity];
  return res;
}
function visibility_comment(aqi) {
  const comment = {
    1: "Very Bad",
    2: "Bad",
    3: "Moderate",
    4: "Moderate",
    5: "Good",
    6: "Good",
    7: "Good",
    8: "Good",
    9: "Good",
    10: "Excellent",
  };
  return comment[aqi];
}
function visibility_icons(aqi) {
  const icons = {
    1: "🚫👁️",
    2: "🚗💨",
    3: "🌥️",
    4: "🌥️",
    5: "👁️",
    6: "👁️",
    7: "👁️",
    8: "👁️",
    9: "👁️",
    10: "👁️✨",
  };
  return icons[aqi];
}
async function visibility(city) {
  let res = [];
  const data = await handleDetailes(city);
  const visibility = data[2];
  const km = `${visibility / 1000}.${visibility % 1}`;
  const comment = visibility_comment(visibility / 1000);
  const icons = visibility_icons(visibility / 1000);
  res = [km, comment, icons];
  return res;
}
visibility("rabat");
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
  const sunset_sunrise = data[0];
  const sunset = handle_hour(sunset_sunrise[0]);
  const sunrise = handle_hour(sunset_sunrise[1]);
  const airQuality = data[3];
  const visibilit = await visibility(city);
  const humidity = await handle_humidity(city);

  document.querySelector(".number_Air").innerHTML = airQuality.air;
  document.querySelector(".commentair .text_commentair").innerHTML =
    airQuality.comment;
  document.querySelector(".commentair .emoji_commentair").textContent =
    airQuality.icon;

  document.querySelector(".sunset_time").innerHTML = sunset;
  document.querySelector(".sunrise_time").innerHTML = sunrise;

  document.querySelector(".visibility_km .number_km").innerHTML = visibilit[0];
  document.querySelector(".visibility_comment .comment").innerHTML =
    visibilit[1];
  document.querySelector(".visibility_comment .icon").innerHTML = visibilit[2];
  const margin = await handle_cadr_air_quality(city);
  const element = document.querySelector(".icon_Air");
  if (element) {
    element.style.marginTop = margin;
  }
  document.querySelector(".left_side .number_humidity").innerHTML = humidity[0];
  document.querySelector(".comment_humidity .comment").innerHTML = humidity[1];
  document.querySelector(".comment_humidity .emoji").innerHTML = humidity[2];
}
handle_dom_Detailes("rabat");
function comment_humidity(humidity) {
  if (humidity >= 0 && humidity <= 30) {
    return "Dry";
  } else if (humidity > 30 && humidity <= 60) {
    return "Normal";
  } else if (humidity > 60 && humidity <= 80) {
    return "Humid";
  } else if (humidity >= 80 && humidity <= 100) {
    return "Very Humid";
  } else return "Invalid humidity value";
}
function emoji_humidity(humidity) {
  if (humidity >= 0 && humidity <= 30) {
    return "🏜️";
  } else if (humidity > 30 && humidity <= 60) {
    return "👌";
  } else if (humidity > 60 && humidity <= 80) {
    return "💧";
  } else if (humidity >= 80 && humidity <= 100) {
    return "💦";
  } else return "Invalid emoji value";
}
async function handle_humidity(city) {
  const data = await handleDetailes(city);
  const humidity = data[4];
  const comment = comment_humidity(humidity);
  const emoji = emoji_humidity(humidity);
  const res = [humidity, comment, emoji];
  return res;
}
handle_humidity("rabat");
