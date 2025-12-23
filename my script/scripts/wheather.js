// {}
import {
  getData,
  getImg,
  set_Degree,
  set_Day_hour,
  get_Weather_Detailes,
  picture,
} from "./fetchingData.js";

function mainFunc() {
  const button = document.querySelector(".searchbutton");
  const input = document.querySelector(".inputJs");

  async function handleInput() {
    let city = input.value;
    const data = await getData(city);
    getImg(city);
    set_Degree(data);
    set_Day_hour(data);
    get_Weather_Detailes(data, "cloudy", "windsock");
    picture(city);
  }
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleInput();
    }
  });

  button.addEventListener("click", handleInput);
}
mainFunc();