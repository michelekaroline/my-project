let APIKey = "00e5594fb9b85b6490da0ef749221569";

function formatDate() {
  let today = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[today.getDay()]} ${today.getHours()}:${today.getMinutes()}`;
}

function newCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");

  searchCity(input.value);
}

function searchCity(city) {
  let cityheader = document.querySelector("#city-header");
  cityheader.textContent = "Loading...";

  axios
    .get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
    )
    .then(getCity);
}

function getCity(response) {
  let data = response.data[0];
  let lat = data.lat;
  let lon = data.lon;
  document.querySelector("#city-header").textContent = data.name;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${APIKey}`
    )
    .then(getWeather);
}

function getWeather(response) {
  let data = response.data;
  document.querySelector("#temp").textContent = Math.round(data.main.temp);
  document.querySelector("#temp-metric").textContent = "ºC";
  document.querySelector("#preciptation").textContent =
    data.main.humidity + "%";
  document.querySelector("#wind").textContent = data.wind.speed + " m/s";
}

function farenheit(event) {
  let tempSpan = document.querySelector("#temp");
  let metric = document.querySelector("#temp-metric");
  let finalTemp = parseInt(tempSpan.textContent, 10);
  event.preventDefault();

  if (metric.textContent === "ºC") {
    finalTemp = Math.round((finalTemp * 9) / 5 + 32);
    metric.textContent = "ºF";
  } else {
    finalTemp = Math.round(((finalTemp - 32) * 5) / 9);
    metric.textContent = "ºC";
  }

  tempSpan.textContent = finalTemp;
}

let dateHeader = document.querySelector("#today");
dateHeader.innerHTML = formatDate();

let cityForm = document.querySelector("#type-city");
cityForm.addEventListener("submit", newCity);

let temperature = document.querySelector("#temp-metric");
temperature.addEventListener("click", farenheit);
