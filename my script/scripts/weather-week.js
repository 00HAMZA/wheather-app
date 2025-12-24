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
  const res = sumAllDays();
  return res;
}
packetsDates("rabat");
/*function filterDate(date){
  const original = date;
  let splitted = original.split("T");
  console.log(splitted);
}*/
/*async function groups_AllDays(date ,city){
  const formattedDate = todayDate.toISOString().split("T")[0];
  //  const date = await packetsDates(city , formattedDate);
}
groups_AllDays("rabat");
*/
