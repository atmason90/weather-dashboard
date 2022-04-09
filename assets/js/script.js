
var cityFormEl = $("#cityInputForm");
var cityListEl = $("#cityList");
var input = $("#cityInput");
var cityInputEl = "";
// open weather API key
var apiKey = "5d3f99ab5fd7f2680c22569bca5f3130"

// Take city from form input and append to ul element. Save to local storage
function handleFormSubmit(event) {
    event.preventDefault();
    cityInputEl = $("#cityInput").val().trim();
    console.log(cityInputEl);
    if(!cityInputEl) {
        return;
    }
    cityListEl.append("<li>" + cityInputEl + "</li>");
    $("input[name='cityNameInput']").val("");

    localStorage.setItem("city", cityInputEl);
}

cityFormEl.on("submit", handleFormSubmit);



// save city list items in local storage
// get city list items from local storage so that list persists when page refreshes
// Generate current weather conditions for searched city - openweather API
    // city and date
    // temperature
    // humidity
    // wind speed
    // UV Index with color based on favorableness
// Generate 5-Day Forecast for searched city - openweather API
    // date
    // weather condition icon
    // temperature
    // humidity
// change current weather conditions and 5-day forecast when clicking on a list item from the city list
    // event listener for click of one of the list items