let apiKey = "49f7b3d442aeb8o7d9b6atfa6542c50f";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=london&key=${apiKey}&units=metric`;

function formatDate(timestamp) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  //if (hour < 10) {
  // let hour = `0${hour}`;
  //}
  let minute = now.getMinutes();
  if (minute < 10) {
    let minute = `0${minute}`;
  }
  return ` ${day}, ${hour}:${minute} `;
  //let date = new Date(timestamp);
  //let hours = date.getHours();
  //let minutes = date.getMinutes();
  //let day = date.getDay();
  //return `${day} ${hours} ${minutes}`;
}

function showTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.temperature.time * 1000);
}

axios.get(apiUrl).then(showTemperature);
