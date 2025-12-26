// {}
function split_Date(Date) {
  const res = Date.toISOString().split("T")[0];
  return res;
}
function get_next_days(days_to_add) {
  const date = new Date();
  const res = date.setDate(date.getDate() + days_to_add);
  return res;
}
function sumAllDays() {
  let res = [];
  let i = 0;
  while (i <= 4) {
    let day = new Date(get_next_days(i));
    let formatted = formateDate(day);
    res.push(formatted);
    i++;
  }
  return res;
}
function formateDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=6c5aa638b47d9c035d3b8a995b865304`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
async function packetsDates(city) {
  let i = 0;
  let res = [];
  let j = 0;
  const data = await getForecast(city);
  const days = sumAllDays();
  days.forEach(() => res.push([]));
  data.list.forEach((item) => {
    const clearDate = item.dt_txt.split(" ")[0];
    const dayIndex = days.indexOf(clearDate);
    if (dayIndex !== -1) {
      res[dayIndex].push(item);
    }
    i++;
  });
  return res;
}
async function selectFiveDays(city) {
  const data = await packetsDates(city);
  let len = data.length;
  let index = Math.floor(len / 2);
  let res = [];
  let i = 0;
  data.forEach((item) => {
    if (item.length <= 2) {
      index = 1;
    }
    res.push(item[index]);
  });
  return res;
}
selectFiveDays("rabat");
async function domOfWeeks(city) {
  const data = await selectFiveDays(city);
  const sunday = data[0];
  const day0max = Math.round(sunday.main.temp_max);
  const day0min = Math.round(sunday.main.temp_min);
  const monday = data[1];
  const day1max = Math.round(monday.main.temp_max);
  const day1min = Math.round(monday.main.temp_min);
  const thusday = data[2];
  const day2max = Math.round(thusday.main.temp_max);
  const day2min = Math.round(thusday.main.temp_min);
  const wednesday = data[3];
  const day3max = Math.round(wednesday.main.temp_max);
  const day3min = Math.round(wednesday.main.temp_min);
  const thursday = data[4];
  const day4max = Math.round(thursday.main.temp_max);
  const day4min = Math.round(thursday.main.temp_min);
  document
    .querySelector(".sunday")
    .querySelector(".degre")
    .querySelector(".max").innerHTML = `${day0max}º`;
  document
    .querySelector(".sunday")
    .querySelector(".degre")
    .querySelector(".min").innerHTML = `${day0min}º`;
  document
    .querySelector(".monday")
    .querySelector(".degre")
    .querySelector(".max").innerHTML = `${day1max}º`;
  document
    .querySelector(".monday")
    .querySelector(".degre")
    .querySelector(".min").innerHTML = `${day1min}º`;
  document
    .querySelector(".thusday")
    .querySelector(".degre")
    .querySelector(".max").innerHTML = `${day2max}º`;
  document
    .querySelector(".thusday")
    .querySelector(".degre")
    .querySelector(".min").innerHTML = `${day2min}º`;
  document
    .querySelector(".wednesday")
    .querySelector(".degre")
    .querySelector(".max").innerHTML = `${day3max}º`;
  document
    .querySelector(".wednesday")
    .querySelector(".degre")
    .querySelector(".min").innerHTML = `${day3min}º`;
  document
    .querySelector(".thursday")
    .querySelector(".degre")
    .querySelector(".max").innerHTML = `${day4max}º`;
  document
    .querySelector(".thursday")
    .querySelector(".degre")
    .querySelector(".min").innerHTML = `${day4min}º`;
}
domOfWeeks("dakhla");
