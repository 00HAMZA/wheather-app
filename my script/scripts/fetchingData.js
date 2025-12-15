import { handleImage } from "./handlePictures.js";
export async function getData(city = "rabat") {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6c5aa638b47d9c035d3b8a995b865304`;
    let Data = await fetch(url);
    if (!Data.ok) {
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
export async function getImg(city) {
  const realUrl = await handleImage(city);
  const img = document.querySelector(".bigIcon");
  if (!img) return;
  img.onerror = () => {
    console.log("image failed to load: ", img.src);
    img.src = `/weather-icons/design/fill/final/code-red.svg`;
  };
  img.src = `/weather-icons/design/fill/final/${realUrl}.svg`;
}

export function set_Degree(city) {
  const temp = Math.round(city.main.temp);
  document.querySelector(".p-cilisius").innerHTML = "°C";
  document.querySelector(".temp-number").innerHTML = temp;
}

export function set_Day_hour(getDat) {
  const date = new Date(getDat.dt * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  document.querySelector(".hour").innerHTML = `${hours}:${minutes}`;
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

export function get_Weather_Detailes(getDat, urlImg, wind) {
  const state = getDat.weather[0].description;
  const winde = getDat.wind.speed;
  document.querySelector(".theState").innerHTML = state;
  document.querySelector(".wind").innerHTML = `Wind speed - ${winde}`;
  const url = `../../weather-icons/design/fill/final/${urlImg}.svg`;
  const urlWind = `../../weather-icons/design/fill/final/${wind}.svg`;
  document.querySelector(".iconDetailes").src = url;
  document.querySelector(".iconDetailes2").src = urlWind;
}

export async function picture(city) {
  const accekey = "Lu9vbwZNoXnml4P4UHk5oMWUxKEj0E6ZYE086p1QFsI";
  const url = `https://api.unsplash.com/search/photos?query=${city}&per_page=1`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${accekey}`,
    },
  });
  const data = await res.json();
  if (data.results.length === 0) {
    console.log("No photos founds in this city...");
  }
  const photoUrl = data.results[0].urls.regular;
  document.querySelector(".cityImage").src = photoUrl;
  document.querySelector(".cityName").innerHTML = city;
}
