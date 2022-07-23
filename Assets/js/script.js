// Page Elements

var searchTextBoxEl = document.getElementById('searchbox');
//var searchOptionsEl = document.getElementById('searchoptions');
var searchBtnEl = document.getElementById('searchbtn');
document.getElementById('todaysDate').textContent = moment().format("MM/DD/YYYY");

var currentTime = moment().format('HH');
var repoList = document.querySelector('ul');

function getWeatherByCity(city){
    // call OpenWeather
    var requestUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f6e84ec450237b0cd068152145e59d51`;
    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            /*var listItem = document.createElement('li');
            listItem.textContent = data[i].html_url;
            repoList.appendChild(listItem);*/
        }
    });
}
searchBtnEl.addEventListener('click', function(){
    getWeatherByCity(searchTextBoxEl.textContent);
});

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