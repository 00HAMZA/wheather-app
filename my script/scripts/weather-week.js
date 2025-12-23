// {}
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=6c5aa638b47d9c035d3b8a995b865304`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
async function getDate(city) {
  const data = await getForecast(city);
  const res = data;
  const date = res.list[0].dt_txt;
}
async function packetsDates(city, targetDate) {
  const data = await getForecast(city);
  let res = [];
  data.list.forEach((item) => {
    let date = item.dt_txt;
    let splitted = date.split(" ")[0];
    if (targetDate === splitted) {
      res.push(item);
    }
  });
  console.log("the result is : ", res);
}
packetsDates("rabat", "2025-12-24");
getDate("rabat");
