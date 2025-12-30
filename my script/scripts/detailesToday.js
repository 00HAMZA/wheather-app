import { getData } from "./fetchingData.js";
async function getAirQuality(city) {
  try {
    const data = await getData(city);
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const apiKey = "6c5aa638b47d9c035d3b8a995b865304";
    const airApi = "openuv-ubi59bermjq7p7zf-io";
    const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${airApi}`;
    const uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`;
    const [airRes, uvRes] = await Promise.all([fetch(airUrl), fetch(uvUrl)]);
    if (airRes.ok) {
      const airData = await airRes.json();
      console.log("air Data: ", airData);
    } else {
      console.log("Air quality fetching failed", airRes.status);
    }
    if (uvRes.ok) {
      const uvData = await uvRes.json();
      console.log("uv Data :", uvData);
    } else {
      console.log("uvData fetching failed", uvRes.status);
    }
  } catch (error) {
    console.log("error:", error);
  }
}
getAirQuality("rabat");
export async function handleDetailes(city) {
  const data = await getData(city);
  let res = [];
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const wind = data.wind.speed;
  const visibility = data.visibility;
  //console.log("visibility :", visibility);
  //console.log("wind speed is  :", wind);
  //console.log("the new data is  :", data);
}
handleDetailes("rabat");
