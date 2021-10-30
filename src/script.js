//const axios = require("axios").default;

function formatDate(date) {
  let dayNumber = date.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let dayName = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agust",
    "September",
    "October",
    "November",
    "December"
  ];

  let monthName = months[date.getMonth()];

  let dayHour = date.getHours();
  if (dayHour < 10) {
    dayHour = `0${dayHour}`;
  }

  let dayMinutes = date.getMinutes();
  if (dayMinutes < 10) {
    dayMinutes = `0${dayMinutes}`;
  }

  let currentDate = document.querySelector("h6#actual-day");
  currentDate.innerHTML = `${monthName} ${dayNumber}, ${dayName}`;

  let currentHour = document.querySelector("h6#actual-hour");
  currentHour.innerHTML = `${dayHour}:${dayMinutes} hr`;
}

let dateNow = new Date();
formatDate(dateNow);

function searchCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  let cityInputValue = searchCityInput.value;
  let apiKey = "78af43c4b86f6fe747e2eeb5803e94cd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let weather = response.data.weather[0].description;
  let weatherElement = document.querySelector(".temp-description");
  weatherElement.innerHTML = `${weather}`;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = `${wind}km/hr`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(".humidity-porcentage");
  humidityElement.innerHTML = `${humidity}%`;
  let temperatureMax = Math.round(response.data.main.temp_max);
  let temperatureMaxElement = document.querySelector(".high-temp");
  temperatureMaxElement.innerHTML = `${temperatureMax}°`;
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureMinElement = document.querySelector(".low-temp");
  temperatureMinElement.innerHTML = `${temperatureMin}°`;
  let city = response.data.name;
  let cityElement = document.querySelector(".actual-city");
  cityElement.innerHTML = `${city}`;
}

function getPosition(position) {
  let apiKey = "78af43c4b86f6fe747e2eeb5803e94cd";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let temperatureButton = document.querySelector(".currentLocation");

temperatureButton.addEventListener("click", getCurrentLocation);
