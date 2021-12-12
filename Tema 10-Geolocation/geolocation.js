const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("curren-weather-items");
const timezone = document.getElementById("time-zone");
const cityEl = document.getElementById("city");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTemmpEl = document.getElementById("current-temperature");
const hourlyForecastEl = document.getElementById("hourly-forecast");
const hourlyTempEl = document.getElementById("hourly-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Octr",
  "Nov",
  "Dec",
];

const API_KEY = "71a1346766d0eccb85f103b0a4564cf3";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id='am-pm'>${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {

    let { latitude, longitude } = success.coords;
    
    


    fetch(
       `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
        showHourlyData(data);
      });

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
     )
       .then((res) => res.json())
       .then((data) => {
         //console.log(data);
         cityEl.innerHTML = data.city.name;

       });


  });
}

function showWeatherData(data) {
  timezone.innerHTML = data.timezone;
  
  
  if (navigator.geolocation) { //check if geolocation is available
    navigator.geolocation.getCurrentPosition(function(position){
      //console.log(position);
    });   
}

  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTemmpEl.innerHTML = `
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          alt="weather icon"
          class="w-icon"
        />
        <div class="other">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <div class="temp">Day  ${day.temp.day}&#176;c</div>
          <div class="temp">Night ${day.temp.night} &#176;c</div>
        </div>`;
    } else {
      otherDayForecast += `
      <div class="weather-forecast-item">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <img
            src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
            alt="weather icon"
            class="w-icon"
          />
          <div class="temp">Day  ${day.temp.day}&#176; C</div>
          <div class="temp">Night ${day.temp.night}&#176; C</div>
        </div>
      `;
    }
  });

  weatherForecastEl.innerHTML = otherDayForecast;
}

function showHourlyData(data) {
  //let setHour = document.getElementById("hour");
  let hourlyForecast = "";
  data.hourly.forEach((hour, idx) => {
    if (idx < 12) {
      hourlyForecast += `
          <div class="hourly-forecast-item">
          <div class="hour">${window.moment(hour.dt * 1000).format("ha")}</div>
        <img
          src="http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png"
          alt="weather icon"
          class="w-icon"
        />
        <div class="hourly-temp">${hour.temp}&#176;C</div>
      </div>`;
    }
  });
  
  hourlyForecastEl.innerHTML = hourlyForecast;
}
