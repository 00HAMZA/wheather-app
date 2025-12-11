// {}
async function getData(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6c5aa638b47d9c035d3b8a995b865304`;
    let Data = await fetch(url);
    if (!Data) {
      throw new Error("Request failed");
    }
    const jsonformat = await Data.json();
    console.log(jsonformat);
    return jsonformat;
  } catch (error) {
    console.log("ERROR : ", error);
  } finally {
    console.log("the operation in finished !!");
  }
}
getData("barcelona");
function getImg(path) {
  const src = `../../weather-icons/design/fill/final/${path}.svg`;
  document.querySelector(".bigIcon").src = src;
}
getImg("clear-day");
async function set_Degree(city) {
  const getDat = await getData(city);
  if (!getDat) {
    console.log("fetching failed of set_Day_hour function !!");
    return;
  }
  const temp = `${getDat.main.temp}`;
  const formatTemp = Math.round(temp).toFixed(0);
  document.querySelector(".p-cilisius").innerHTML = "°C";
  document.querySelector(".temp-number").innerHTML = formatTemp;
}
set_Degree("rabat");
async function set_Day_hour(city) {
  const getDat = await getData(city);
  if (!getDat) {
    console.log("fetching day and hour failed !!");
  }
  const date = new Date(getDat.dt * 1000);
  const hour = date.getHours();
  const hour_minutes = hour.toFixed(2);
  document.querySelector(".hour").innerHTML = hour_minutes;
  const days = [
    "Sunday",
    "Monday",
    "Tuestday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];
  document.querySelector(".day").innerHTML = `${dayName},`;
}
set_Day_hour("rabat");
async function get_Weather_Detailes(city, urlImg, wind){
  const getDat = await getData(city);
  if(!getDat){
    console.log("the fetching Detiales failed !!");
  }
  const state = getDat.weather[0].description;
  const winde = getDat.wind.speed;
  document.querySelector(".theState").innerHTML = state;
  document.querySelector(".wind").innerHTML = `Wind speed - ${winde}`;
  const url = `../../weather-icons/design/fill/final/${urlImg}.svg`;
  const urlWind = `../../weather-icons/design/fill/final/${wind}.svg`
  document.querySelector(".iconDetailes").src = url;
  document.querySelector(".iconDetailes2").src = urlWind;
}
get_Weather_Detailes("rabat", "cloudy", "windsock");