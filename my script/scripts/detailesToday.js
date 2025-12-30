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
async function handle_qualityAir(city) {
  let comment;
  const data = (await getAirQuality(city)).airData;
  console.log("air ", data);
  const air = data.list[0].main.aqi;
  if (air === 1) {
    comment = "Good";
  } else if (air === 2) {
    comment = "Fair";
  } else if (air === 3) {
    comment = "Moderate";
  } else if (air === 4) {
    comment = "Poor";
  } else if (air === 5) {
    comment = "Very Poor";
  } else {
    comment = "none";
  }
  return { air, comment };
}
handle_qualityAir("rabat");
async function dom_Air(city) {
  const data = await handle_qualityAir(city);
  const air = data.air;
  const comment = data.comment;
  console.log("air and comment : ", air, comment);
  document.querySelector(".numberAir").innerHTML = air;
  document.querySelector(".iconAir").innerHTML = comment;
}
dom_Air("rabat");
export async function handleDetailes(city) {
  const data = await getData(city);
  let res = [];
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const wind = data.wind.speed;
  const visibility = data.visibility;
  console.log("visibility :", visibility);
  console.log("wind speed is  :", wind);
  console.log("the new data is  :", data);
}
handleDetailes("rabat");
