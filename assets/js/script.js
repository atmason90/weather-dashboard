
var cityFormEl = $("#cityInputForm");
var cityListEl = $("#cityList");
var input = $("#cityInput");
var cityInputEl = "";
// open weather API key
var apiKey = "5d3f99ab5fd7f2680c22569bca5f3130"
var currentDate = moment().format("MMM Do, YYYY");
// var searchedCities = [];

// ternary statement for getting cities from local storage
var searchedCities = (localStorage.getItem("city"))?JSON.parse(localStorage.getItem("city")):[];

// run function to populate city list
populateCityList();

// populate list with searched cities
function populateCityList () {
    cityListEl.html("")
    $(searchedCities).each(function (i, el) {
        cityListEl.prepend("<li>" + el + "</li>");
    })
    $("li").attr("class", "list-group-item list-group-item-action");
};


// Take city from form input and append to ul element. Save to local storage
function handleFormSubmit(event) {
    event.preventDefault();
    cityInputEl = $("#cityInput").val().trim();
    if(!searchedCities.includes(cityInputEl)) {
    searchedCities.push(cityInputEl)}
   
    console.log(cityInputEl);
    if(!cityInputEl) {
        return;
    }
    populateCityList();
   
    $("#cityName").text(cityInputEl);
    $("input[name='cityNameInput']").val("");

    // set Items in local storage
    localStorage.setItem("city", JSON.stringify(searchedCities)); 
}

cityFormEl.on("submit", handleFormSubmit);

// create a function to retrieve weather data for current day and 5-day forecast
function getWeather() {
    var requestUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&units=imperial&appid=" + apiKey;
    fetch(requestUrlCurrent)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            var cityName = data.name
            var latEl = data.coord.lat
            var lonEl = data.coord.lon
            console.log(latEl);
            console.log(lonEl);
        
            var requestUrlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEl + "&lon=" + lonEl + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
            fetch(requestUrlOneCall)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);
                    $("#cityName").text(cityName);
                    $("#currentDate").text(currentDate);
                    $("#weatherIcon").attr({"src":"http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png", "width":"100px", "height":"100px"});
                    $("#currentTemp").text("Temperature: " + data.current.temp + " °F");
                    $("#currentHum").text("Humidity: " + data.current.humidity + "%");
                    $("#currentWind").text("Wind Speed: " + data.current.wind_speed + " mph");
                    $("#currentUvi").text("UV Index: " + data.current.uvi);
                    // set styling for UV Index
                    if(data.current.uvi >= 6) {
                        $("#currentUvi").attr("class", "bg-danger")
                    } else if(data.current.uvi >= 3) {
                        $("#currentUvi").attr("class", "bg-warning")
                    } else {
                        $("#currentUvi").attr("class", "bg-success")
                    }
                    // set dates for 5-day forecast
                    $("#forecastDate1").text(moment().add(1, 'day').format("MMM Do, YYYY"));
                    $("#forecastDate2").text(moment().add(2, 'day').format("MMM Do, YYYY"));
                    $("#forecastDate3").text(moment().add(3, 'day').format("MMM Do, YYYY"));
                    $("#forecastDate4").text(moment().add(4, 'day').format("MMM Do, YYYY"));
                    $("#forecastDate5").text(moment().add(5, 'day').format("MMM Do, YYYY"));
                    
                    // set weather icon for 5-day forecast
                    $("#forecastIcon1").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
                    $("#forecastIcon2").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
                    $("#forecastIcon3").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
                    $("#forecastIcon4").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
                    $("#forecastIcon5").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});

                    // set temp for 5-day forecast
                    $("#temp1").text("Temp: " + data.daily[1].temp.day + " °F");
                    $("#temp2").text("Temp: " + data.daily[2].temp.day + " °F");
                    $("#temp3").text("Temp: " + data.daily[3].temp.day + " °F");
                    $("#temp4").text("Temp: " + data.daily[4].temp.day + " °F");
                    $("#temp5").text("Temp: " + data.daily[5].temp.day + " °F");

                    // set humidity for 5-day forecast
                    $("#hum1").text("Humidity: " + data.daily[1].humidity + "%");
                    $("#hum2").text("Humidity: " + data.daily[2].humidity + "%");
                    $("#hum3").text("Humidity: " + data.daily[3].humidity + "%");
                    $("#hum4").text("Humidity: " + data.daily[4].humidity + "%");
                    $("#hum5").text("Humidity: " + data.daily[5].humidity + "%");
                })
        })
};

cityFormEl.on("submit", getWeather);

// write function to click on list items to switch to weather for that city
$("li").on("click", function () {
    var liEl = $(this).text();
    console.log($(this));
    cityInputEl = liEl
    getWeather();
});

