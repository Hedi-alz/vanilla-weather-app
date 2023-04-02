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
  let minute = now.getMinutes();
  //if (hour < 10) {
  //let hour = `0${hour}`;
  //}
  //if (minute < 10) {
  // let minute = `0${minute}`;
  //}

  return `${day}, ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  console.log(response.data.daily);
  let forecastDay = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecastDay.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDays.time
              )}</div>
             <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
               forecastDays.condition.icon
             }.png" width="36"/>
             <div class="weather-forecast-temperature">
              <span class="weather-max">${Math.round(
                forecastDays.temperature.maximum
              )}°</span>
              <span class="weather-min">${Math.round(
                forecastDays.temperature.minimum
              )}°</span> 
             </div> 
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//another solution for date:
//let date = new Date(timestamp);
//let hours = date.getHours();
//let minutes = date.getMinutes();
//let day = date.getDay();
//return `${day} ${hours} ${minutes}`;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "49f7b3d442aeb8o7d9b6atfa6542c50f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = celsiusTemperature;
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "49f7b3d442aeb8o7d9b6atfa6542c50f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitUnit = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitUnit);
}

function showCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("london");
