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
var todayUVIEl = document.getElementById('todayUVI');

/* Five day arrays */
var fiveDayDates = document.querySelectorAll('.dayDate');
var fiveDayWeatherIcons = document.querySelectorAll('.dayWeatherIcon');
var fiveDayTemps = document.querySelectorAll('.dayTemp');
var fiveDayWinds = document.querySelectorAll('.dayWind');
var fiveDayHumids = document.querySelectorAll('.dayHumid');

/* add event handlers to city menu */
/*function getForecastByCityMenu(){
    var cityMenu = document.querySelectorAll('#citiesbtns li button');
    console.log(cityMenu.length);
    for(j = 0; j < cityMenu.length; j++){ 
        cityMenu[j].addEventListener('click',function(e){
            console.log(e.target.id);
            var chosenCity = encodeURIComponent(e.target.id);
            getForecastByCity(chosenCity);
        });
    }
}*/

// Assign button listeners
function assignButtonListeners(){
    var cityMenuForEventListeners = document.querySelectorAll('#citiesbtns li button');
    for(var k = 0; k < cityMenuForEventListeners.length; k++){                
        cityMenuForEventListeners[k].addEventListener('click',function(e){
            console.log('test');
            var chosenCityForEventListeners = e.target.id;
            getForecastByCity(chosenCityForEventListeners);
        })
    }
}

/* Five Day Forecast */
function getForecastByCity(city){

    // Get city lat/lon
    var geoRequestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=f6e84ec450237b0cd068152145e59d51`;
    fetch(geoRequestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        
        // Call API with lat/lon
        var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&exclude=hourly&appid=c0070d7dc98501d324857402a8b6ca5d`;
        fetch(requestUrl)
        .then(function (response2) {
            return response2.json();
        })
        .then(function (data2) {
            
            // Populate today's weather 
            cityEl.textContent = decodeURIComponent(city);
            todayTempEl.textContent = data2.daily[0].temp.day + 'F';
            todayWindEl.textContent = data2.daily[0].wind_speed + ' MPH';
            todayHumidEl.textContent = data2.daily[0].humidity + '%';
            todayIconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${data2.daily[0].weather[0].icon}@2x.png" width="70" height="70">`;
            todayUVIEl.textContent = data2.daily[0].uvi;

            // UVI background color
            if(data2.daily[0].uvi > 6){
                todayUVIEl.style.backgroundColor = '#f00';
                todayUVIEl.style.color = '#fff';
            }else if(data2.daily[0].uvi <= 6 && data2.daily[0].uvi > 3){
                todayUVIEl.style.color = '#000';
                todayUVIEl.style.backgroundColor = '#ff0';
            }else{
                todayUVIEl.style.backgroundColor = '#0f0';
                todayUVIEl.style.color = '#fff';
            }

            //Populate 5-day
            for (var i = 0; i < 5; i++) {
                    var dateHdr = moment.unix(data2.daily[i].dt).format("MM/DD/YYYY");
                    fiveDayDates[i].textContent = dateHdr;
                    fiveDayTemps[i].textContent = data2.daily[i].temp.day  + 'F';
                    fiveDayWinds[i].textContent = data2.daily[i].wind_speed + ' MPH';
                    fiveDayHumids[i].textContent = data2.daily[i].humidity + '%';
                    fiveDayWeatherIcons[i].innerHTML = `<img src="https://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}@2x.png" width="70" height="70">`;
            }
            
            // Get all city history buttons
            var cityMenu = document.querySelectorAll('#citiesbtns li button');

            // Set "already added" flag
            var alreadyAdded = false;

            // If any matches between default buttons and new one, set "already added" flag to true
            for(var j = 0; j < cityMenu.length; j++){
                if(city.toUpperCase() == cityMenu[j].id.toUpperCase()){
                    console.log('found duplicate');
                    alreadyAdded = true;
                }
            }

            // Add new button
            if(alreadyAdded == false){
                console.log('add new node');
                document.getElementById("citiesbtns").innerHTML += `<li><button id="${city}" class="cityMenu">${city}</button></li>`;
                alreadyAdded = true;
            }
            // Reassign
            assignButtonListeners();
        })
    })
}

// Search button listener
searchBtnEl.addEventListener('click', function(){
    getForecastByCity(searchTextBoxEl.value);
});

// Initialize
getForecastByCity('San Diego');
