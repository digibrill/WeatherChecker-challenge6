// Page Elements

var searchTextBoxEl = document.getElementById('searchbox');
var searchBtnEl = document.getElementById('searchbtn');
document.getElementById('todaysDate').textContent = moment().format("MM/DD/YYYY");
var cityEl = document.getElementById('cityName');
var currentTime = moment().format('HH');
var repoList = document.querySelector('ul');
var todayTempEl = document.getElementById('todayTemp');
var todayWindEl = document.getElementById('todayWind');
var todayHumidEl = document.getElementById('todayHumid');
var todayIconEl = document.getElementById('todayIcon');

/* Five day arrays */
var fiveDayDates = document.querySelectorAll('.dayDate');
var fiveDayWeatherIcons = document.querySelectorAll('.dayWeatherIcon');
var fiveDayTemps = document.querySelectorAll('.dayTemp');
var fiveDayWinds = document.querySelectorAll('.dayWind');
var fiveDayHumids = document.querySelectorAll('.dayHumid');

/* Five Day Forecast */
function getForecastByCity(city){
    var requestUrl;
    var geoRequestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=f6e84ec450237b0cd068152145e59d51`;
    fetch(geoRequestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=f6e84ec450237b0cd068152145e59d51`;
        //`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&exclude=hourly&appid=f6e84ec450237b0cd068152145e59d51`;
        //`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&cnt=5&appid=f6e84ec450237b0cd068152145e59d51`;
    });
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //console.log(data);
        for (var i = 0; i < data.list.length; i++) {
            //console.log(data.list[i]);
            var dateHdr = data.list[i].dt;
            fiveDayDates[i].textContent = moment.unix(dateHdr);//data.time.day;//moment.unix(dateHdr).format("MM/DD/YYYY");
            fiveDayTemps[i].textContent = data.list[i].main.temp;
            fiveDayWinds[i].textContent = data.list[i].wind.speed;
            fiveDayHumids[i].textContent = data.list[i].main.humidity + '%';
            fiveDayWeatherIcons[i].innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" width="70" height="70">`;
        }
    })
}

function getWeatherByCity(city){
    // call OpenWeather
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=f6e84ec450237b0cd068152145e59d51`;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                cityEl.textContent = decodeURIComponent(data.name);
                todayTempEl.textContent = data.main.temp;
                todayWindEl.textContent = data.wind.speed;
                todayHumidEl.textContent = data.main.humidity + '%';
                todayIconEl.textContent = data.icon;
                todayIconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="70" height="70">`;
            })
        getForecastByCity(city);
}
function getWeatherByCityMenu(){
    var cityMenu = document.querySelectorAll('#cities li button');
    for(j = 0; j < cityMenu.length; j++){
        cityMenu[j].addEventListener('click',function(e){
            var chosenCity = encodeURIComponent(e.target.id);
            getWeatherByCity(chosenCity);
        });
    }
}
getWeatherByCityMenu();

searchBtnEl.addEventListener('click', function(){
    getWeatherByCity(searchTextBoxEl.value);
});

getWeatherByCity('San Diego');
// date in current day
//() =>


/**
api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f6e84ec450237b0cd068152145e59d51
currentweather - https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
5-day - api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
5-day with city name - api.openweathermap.org/data/2.5/forecast?q={city name}&appid=f6e84ec450237b0cd068152145e59d51

*/
/**
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/






/* A form with a text input field to capture a search query and an option
select dropdown to capture the format of the search query. The options in
the dropdown should be a list of the possible format values listed in the
[Library of Congress API documentation on requests]
(https://libraryofcongress.github.io/data-exploration/requests.html#format).*/