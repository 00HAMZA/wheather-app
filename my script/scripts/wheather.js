// {}
async function getData(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6c5aa638b47d9c035d3b8a995b865304`;
    let Data = await fetch(url);
    if (!Data) {
      throw new Error("Request failed");
    }
    const jsonformat = await Data.json();
    return jsonformat;
  } catch (error) {
    console.log("ERROR : ", error);
  } finally {
    console.log("the operation in finished !!");
  }
}
getData("barcelona");
/*async function getDetailes(city) {
  const getDat = await getData(city);
  const nameCity = getDat.name;
  const base = getDat.base;
  const temp = getDat.main.temp;
  const icon = getDat.weather[0].icon;
  console.log(getDat);
  console.log("the base is : ", base);
  console.log("the name of the city is : ", nameCity);
  console.log("the temp is : ", temp);
  console.log(icon);
}*/
/*async function spesefic(city){
    const data = await processingCity(city);
    console.log("the Data : ", data);
    console.log("the name : ", data.name);
}*/
//document.querySelector(".picweather").innerHTML =
//getData("rabat");
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
  document.querySelector(".day").innerHTML = `${dayName}, `;
}
set_Day_hour("rabat");
