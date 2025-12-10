// {}

async function getData(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6c5aa638b47d9c035d3b8a995b865304`
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
async function processingCity(city){
    console.log("start processing the data...");
    const weatherData = await getData(city);
    if(weatherData){
        console.log("succefully accessed Data form outside : ", weatherData.name);
    }else{
        console.log("could not proccess data due to fetch error.");
    }
    return weatherData;   
}
