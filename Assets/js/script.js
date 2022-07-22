var searchTextBoxEl = document.getElementById('searchbox');
//var searchOptionsEl = document.getElementById('searchoptions');
var searchBtnEl = document.getElementById('searchbtn');

searchBtnEl.addEventListener('submit', sendToResultsPg);
function sendToResultsPg(e){
    console.log('test');
    var searchPhrase = searchTextBoxEl.textContent;
    //var searchOption = searchOptionsEl.selectedIndex;
   // if(searchOption !== ''){
        location.replace('search-results.html?q=' + searchPhrase + '&format=' + searchOption);
  //  }else{
      //  location.replace('search-results.html?q=' + searchPhrase + '&format=');
  //  }
}

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