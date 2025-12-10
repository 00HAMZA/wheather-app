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

async function getDetailes(city) {
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
}
//getDetailes("casablanca");
/*async function processingCity(city){
    console.log("start processing the data...");
    const weatherData = await getData(city);
    if(weatherData){
        console.log("succefully accessed Data form outside : ", weatherData.name);
    }else{
        console.log("could not proccess data due to fetch error.");
    }
    return weatherData;   
}*/
/*async function koko(){
    const data = await getData("rabat");
    if(!data){
        console.log(Error("error fetching"));
    }else{
        console.log("the data is : ", data);
    }
}
koko();*/
/*async function spesefic(city){
    const data = await processingCity(city);
    console.log("the Data : ", data);
    console.log("the name : ", data.name);
}*/
//document.querySelector(".picweather").innerHTML =
//getData("rabat");
async function loadImage(city, index) {
  const data = await getData(city);
  const iconCode = data.weather[index].icon;
  const url = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const imgres = await fetch(url);
  const blob = await imgres.blob();
  const imgUrl = URL.createObjectURL(blob);
  document.querySelector(".bigIcon").src = imgUrl;
  console.log("the url is : ", imgUrl);
}
loadImage("rabat", 0);
