
var cityFormEl = $("#cityInputForm");
var cityListEl = $("#cityList");
var input = $("#cityInput");
var cityInputEl = "";
// open weather API key
var apiKey = "5d3f99ab5fd7f2680c22569bca5f3130"
var currentDate = moment().format("MMM Do, YYYY");
$("#currentDate").text(currentDate);
// $("#cityName").text(cityInputEl);

// Take city from form input and append to ul element. Save to local storage
function handleFormSubmit(event) {
    event.preventDefault();
    cityInputEl = $("#cityInput").val().trim();
    console.log(cityInputEl);
    if(!cityInputEl) {
        return;
    }
    cityListEl.append("<li>" + cityInputEl + "</li>");
    $("#cityName").text(cityInputEl);
    $("input[name='cityNameInput']").val("");

    localStorage.setItem("city", cityInputEl); //!!Need to fix to store more than one input
}

cityFormEl.on("submit", handleFormSubmit);

// create a function to retrieve current date's weather data from openweather api
function getWeather() {
    var requestUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&units=imperial&appid=" + apiKey;
    fetch(requestUrlCurrent)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data);
            // for(var i = 0; i < data.length; i++) {
            var latEl = data.coord.lat
            var lonEl = data.coord.lon
            // }
            console.log(latEl);
            console.log(lonEl);
        
            var requestUrlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEl + "&lon=" + lonEl + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
            fetch(requestUrlOneCall)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);
                    $("#weatherIcon").attr({"src":"http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
                    $("#currentTemp").text("Temperature: " + data.current.temp + " °F");
                    $("#currentHum").text("Humidity: " + data.current.humidity + "%");
                    $("#currentWind").text("Wind Speed: " + data.current.wind_speed + " mph");
                    $("#currentUvi").text("UV Index: " + data.current.uvi);
                    if(data.current.uvi >= 6) {
                        $("#currentUvi").attr("class", "bg-danger")
                    } else if(data.current.uvi >= 3) {
                        $("#currentUvi").attr("class", "bg-warning")
                    } else {
                        $("#currentUvi").attr("class", "bg-success")
                    }
                    
                })
        })
};

cityFormEl.on("submit", getWeather);

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