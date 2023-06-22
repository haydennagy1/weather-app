let apiKey = "4a98298a6ba8093b8f52ed7b38fb61cb";
let apiUrl = null;

function displayDate(date) {
  let months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
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

let timeUpdated = new Date;
let days = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
displayDate(timeUpdated);
displayTime(timeUpdated);
displayUpcomingDays(timeUpdated);

function showTempsToday(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = currentTemp;
  
  let highTempToday = Math.round(response.data.main.temp_max);
  let highTempTodayElement = document.querySelector("#high-temp-today");
  highTempTodayElement.innerHTML = highTempToday;

  let lowTempToday = Math.round(response.data.main.temp_min);
  let lowTempTodayElement = document.querySelector("#low-temp-today");
  lowTempTodayElement.innerHTML = lowTempToday;
}

function displayCurrentLocation(response) {
  let displayedCity = document.querySelector("#displayed-city-name");
  displayedCity.innerHTML = response.data.name;

  let displayedCountry = document.querySelector("#displayed-country-name");
  displayedCountry.innerHTML = response.data.sys.country;
}

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTempsToday);
  axios.get(apiUrl).then(displayCurrentLocation);
}

navigator.geolocation.getCurrentPosition(searchCurrentLocation);

function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-input").value;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`;
  //displayedCity.innerHTML = searchedCity;
  axios.get(apiUrl).then(showTempsToday);
  axios.get(apiUrl).then(displayCurrentLocation)
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//let settingsGear = document.querySelector("#settings-gear");
//settingsGear.addEventListener("click", convertUnits);
