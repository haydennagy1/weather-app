let apiKey = "4a98298a6ba8093b8f52ed7b38fb61cb";
let apiUrl = null;
let unit = "metric";
let tempUnitElements = document.querySelectorAll(".temp-unit");
let speedUnitElement = document.querySelector(".speed-unit");
let distanceUnitElement = document.querySelector(".distance-unit");

let days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
let months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function displayDate(date) {
  let displayedCurrentDate = document.querySelector("#current-date");
  displayedCurrentDate.innerHTML = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}
function displayTime(date) {
  let displayedCurrentTime = document.querySelector("#current-time");
  displayedCurrentTime.innerHTML = date.toLocaleTimeString("en-us", {hour: "2-digit", minute: "2-digit", timeZoneName: "short"});
}
function displayUpcomingDays(date) {
  let dayOneText = document.querySelector("#day-1-name");
  let dayTwoText = document.querySelector("#day-2-name");
  let dayThreeText = document.querySelector("#day-3-name");
  let dayFourText = document.querySelector("#day-4-name");
  let dayFiveText = document.querySelector("#day-5-name");
  let daySixText = document.querySelector("#day-6-name");
  let dayOne = null;
  let dayTwo = null;
  let dayThree = null;
  let dayFour = null;
  let dayFive = null;
  let daySix = null;

  if (date.getDay() == 6) {
    dayOne = 0;
  } else {
    dayOne = date.getDay() + 1;
  }
  dayOneText.innerHTML = days[dayOne];
  if (dayOne == 6) {
    dayTwo = 0;
  } else {
    dayTwo = dayOne + 1;
  }
  dayTwoText.innerHTML = days[dayTwo];
  if (dayTwo == 6) {
    dayThree = 0;
  } else {
    dayThree = dayTwo + 1;
  }
  dayThreeText.innerHTML = days[dayThree];
  if (dayThree == 6) {
    dayFour = 0;
  } else {
    dayFour = dayThree + 1;
  }
  dayFourText.innerHTML = days[dayFour];
  if (dayFour == 6) {
    dayFive = 0;
  } else {
    dayFive = dayFour + 1;
  }
  dayFiveText.innerHTML = days[dayFive];
  if (dayFive == 6) {
    daySix = 0;
  } else {
    daySix = dayFive + 1;
  }
  daySixText.innerHTML = days[daySix];
}

function updateTime() {
  let timeUpdated = new Date;
  displayDate(timeUpdated);
  displayTime(timeUpdated);
  displayUpcomingDays(timeUpdated);
}

updateTime();

function displayTempsToday(response) {
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = Math.round(response.data.main.temp);
  
  let highTempTodayElement = document.querySelector("#high-temp-today");
  highTempTodayElement.innerHTML = Math.round(response.data.main.temp_max);

  let lowTempTodayElement = document.querySelector("#low-temp-today");
  lowTempTodayElement.innerHTML = Math.round(response.data.main.temp_min);
}

function displayCurrentWeatherDetails(response) {
  let realFeelElement = document.querySelector("#real-feel-temp");
  realFeelElement.innerHTML = `${Math.round(response.data.main.feels_like)}`

  let humidityElement = document.querySelector("#humidity-percent");
  humidityElement.innerHTML = response.data.main.humidity;

  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;
  if (unit === "imperial") {
    windSpeedElement.innerHTML = Math.round(windSpeed*10/1.609344)/10;
  } else { 
    windSpeedElement.innerHTML = Math.round(windSpeed*10)/10;
  }

  let visibilityElement = document.querySelector("#visibility-distance");
  let visibility = response.data.visibility/1000;
  if (visibility === 10) {
    if (unit === "imperial") {
      visibilityElement.innerHTML = "6.2+";
    } else {
      visibilityElement.innerHTML = "10+";
    }
  } else {
    if (unit === "imperial") {
      visibilityElement.innerHTML = Math.round(visibility*10/1.609344)/10;
    } else {
      visibilityElement.innerHTML = Math.round(visibility*10)/10;
    }
  }
}

function displayCurrentWeatherType(response) {
  let currentWeatherTypeElement = document.querySelector("#current-weather-type");
  currentWeatherTypeElement.innerHTML = response.data.weather[0].main;
}

function useCustomWeatherIcons(weatherIcon) {
  switch (weatherIcon) {
    case "01d":
      return "fa-solid fa-sun";
    case "02d":
      return "fa-solid fa-cloud-sun";
    case "03d":
      return "fa-solid fa-cloud";
    case "04d":
      return "fa-solid fa-cloud";
    case "09d":
      return "fa-solid fa-cloud-showers-heavy";
    case "10d":
        return "fa-solid fa-cloud-sun-rain";
    case "11d":
        return "fa-solid fa-cloud-bolt";
    case "13d":
      return "fa-regular fa-snowflake";
    case "50d":
        return "fa-solid fa-smog";
    case "01n":
      return "fa-solid fa-moon";
    case "02n":
      return "fa-solid fa-cloud-moon";
    case "03n":
      return "fa-solid fa-cloud";
    case "04n":
      return "fa-solid fa-cloud";
    case "09n":
      return "fa-solid fa-cloud-showers-heavy";
    case "10n":
        return "fa-solid fa-cloud-moon-rain";
    case "11n":
        return "fa-solid fa-cloud-bolt";
    case "13n":
      return "fa-regular fa-snowflake";
    case "50n":
        return "fa-solid fa-smog";
  }
}

function displayCurrentWeatherIcon(response) {
  let currentWeatherIconElement = document.querySelector("#current-weather-icon");
  currentWeatherIcon = response.data.weather[0].icon;
  const iconClass = useCustomWeatherIcons(currentWeatherIcon);
  currentWeatherIconElement.setAttribute("class", iconClass);
}

function colorClearNight() {
  document.documentElement.style.setProperty("--color1", "#FFFFFF");
  document.documentElement.style.setProperty("--color2", "#FFFCEB");
  document.documentElement.style.setProperty("--color3", "#FFEA70");
  document.documentElement.style.setProperty("--color4", "#FFDA0A");
}
function colorCloudyNight() {
  document.documentElement.style.setProperty("--color1", "#FFFFFF");
  document.documentElement.style.setProperty("--color2", "#F5F7FA");
  document.documentElement.style.setProperty("--color3", "#BFC8D6");
  document.documentElement.style.setProperty("--color4", "#778599");
}
function colorRainyNight() {
  document.documentElement.style.setProperty("--color1", "#FFFFFF");
  document.documentElement.style.setProperty("--color2", "#edf2fd");
  document.documentElement.style.setProperty("--color3", "#6495ed");
  document.documentElement.style.setProperty("--color4", "#1856c9");
}

function assignColorTheme(weatherId) {
  switch (weatherId) {
    case "01d":
      return "clear day";
    case "02d":
    case "03d":
    case "04d":
    case "13d":
    case "50d":
      return "cloudy day";
    case "09d":
    case "10d":
    case "11d":
        return "rainy day";
    case "01n":
      return "clear night";
    case "02n":
    case "03n":
    case "04n":
    case "13n":
    case "50n":
      return "cloudy night";
    case "09n":
    case "10n":
    case "11n":
        return "rainy night";
  }
}

function displayColorTheme(response) {
  currentWeatherTypeId = response.data.weather[0].icon;
  const colorThemeId = assignColorTheme(currentWeatherTypeId);
  if (colorThemeId === "clear day") {
    document.documentElement.style.setProperty("--color2", "#FFFCEB");
    document.documentElement.style.setProperty("--color3", "#FFE75C");
    document.documentElement.style.setProperty("--color4", "#FFDA0A");
  } else {
    if (colorThemeId === "cloudy day") {
      document.documentElement.style.setProperty("--color2", "#F5F5F5");
      document.documentElement.style.setProperty("--color3", "#CCCCCC");
      document.documentElement.style.setProperty("--color4", "#8C8C8C");
    } else {
      if (colorThemeId === "rainy day"){
        document.documentElement.style.setProperty("--color2", "#edf2fd");
        document.documentElement.style.setProperty("--color3", "#6495ed");
        document.documentElement.style.setProperty("--color4", "#1856c9");
      } else {
        if (colorThemeId === "clear night") {
          document.documentElement.style.setProperty("--color2", "#E4E9F1");
          document.documentElement.style.setProperty("--color3", "#BFC8D6");
          document.documentElement.style.setProperty("--color4", "#8B97A7");
        } else {
          if (colorThemeId === "cloudy night") {
            document.documentElement.style.setProperty("--color2", "#BFC8D6");
            document.documentElement.style.setProperty("--color3", "#778599");
            document.documentElement.style.setProperty("--color4", "#606E80");
          } else {
            if (colorThemeId === "rainy night") {
              document.documentElement.style.setProperty("--color2", "#D4DDED");
              document.documentElement.style.setProperty("--color3", "#8CA4CF");
              document.documentElement.style.setProperty("--color4", "#3C62A5");
            }
          }
        }
      }
    }
  }
}

function displayCurrentLocation(response) {
  let displayedCityElement = document.querySelector("#displayed-city-name");
  displayedCityElement.innerHTML = response.data.name;

  let displayedCountryElement = document.querySelector("#displayed-country-name");
  displayedCountryElement.innerHTML = response.data.sys.country;
}

function displayAll(response) {
  updateTime();
  displayTempsToday(response);
  displayCurrentLocation(response);
  displayCurrentWeatherDetails(response);
  displayCurrentWeatherType(response);
  displayCurrentWeatherIcon(response);
  displayColorTheme(response);
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayAll);
}

navigator.geolocation.getCurrentPosition(searchCurrentLocation);

function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-input").value;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayAll);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function convertUnits(event) {
  event.preventDefault();
  if (unit === "metric") {
    unit = "imperial";
    tempUnitElements.forEach(node => node.innerHTML = "°F");
    speedUnitElement.innerHTML = "mph";
    distanceUnitElement.innerHTML = "mi";
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
  } else { 
    unit = "metric";
    tempUnitElements.forEach(node => node.innerHTML = "°C");
    speedUnitElement.innerHTML = "km/h";
    distanceUnitElement.innerHTML = "km";
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
  }
}

let settingsGear = document.querySelector("#settings-gear");
settingsGear.addEventListener("click", convertUnits);
