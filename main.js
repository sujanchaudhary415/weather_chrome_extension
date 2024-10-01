const api = {
  baseURL: "https://api.openweathermap.org/data/2.5/",
  key: "97ee39ce13ef9c9bf980759e1cd075c1",
};

const searchBox = document.querySelector(".search_box");
searchBox.addEventListener("keypress", setQuery);
function setQuery(event) {
  if (event.keyCode == 13) {
    // keyCode 13 means ENTER
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayResults)
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function displayResults(response) {
  console.log(response);
  
  let city = document.querySelector(".location .city");
  city.innerHTML = `${response.name}, ${response.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerHTML = dateBuilder(now);

  // Get temperatures in Celsius
  let celsiusTemp = Math.round(response.main.temp);
  let minCelsius = Math.round(response.main.temp_min);
  let maxCelsius = Math.round(response.main.temp_max);

  // Convert to Fahrenheit
  let fahrenheitTemp = Math.round(celsiusTemp * 9 / 5 + 32);
  let minFahrenheit = Math.round(minCelsius * 9 / 5 + 32);
  let maxFahrenheit = Math.round(maxCelsius * 9 / 5 + 32);

  // Display current temperature
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${celsiusTemp}<span>°C</span>`;

  // Display weather description
  let weather_element = document.querySelector(".current .weather");
  weather_element.innerText = response.weather[0].description;

  // Display high/low temperatures
  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${minCelsius}°C / ${minFahrenheit}°F`;
}

function dateBuilder(d) {
  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
