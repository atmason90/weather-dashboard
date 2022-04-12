# Weather Dashboard

## Purpose of This Project

The purpose of this project was to create an interactive weather dashboard that gives a user the ability look up the current weather and the 5-day forecasted weather for any given city. 

By using the third-party API from openweathermap.org, this application renders real-time weather data for temperature, humidity, wind, and UV index. 

This application stores the user's previous searches in the local storage on their browswer and renders a list of the historical searches to the application's page for the user to access again. The user is able to click on any item from the previously searched cities list to pupulate the dashboard with that city's weather information. 

This application relies heavily on bootstrap CSS framework for it's styling, the JQuery javascript library for document traversal/manipulation and event handling, moment js for capturing the current date, and the openweathermap.org API for accurate weather data.


## Links

GitHub Repository:
https://github.com/atmason90/weather-dashboard

Deployed Application:
https://atmason90.github.io/weather-dashboard/ 



## Application Demo

![Demo Gif](./assets/2022-04-11%2018.26.21.gif)

## Code Examples

This example displays the function I used to handle the submission of a new city into the search bar on the application.

```js
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

    localStorage.setItem("city", JSON.stringify(searchedCities)); 
}
```

I used a ternary operator to declare the variable where I stored the previously searched cities and to retrieve those cities from local storage.

```js
var searchedCities = (localStorage.getItem("city"))?JSON.parse(localStorage.getItem("city")):[];
```

This example shows how I utilized the openweather.org API to extract the information I needed to display to the weather dashboard.

```js
function getWeather() {
    var requestUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&units=imperial&appid=" + apiKey;
    fetch(requestUrlCurrent)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var cityName = data.name
            var latEl = data.coord.lat
            var lonEl = data.coord.lon
        
            var requestUrlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEl + "&lon=" + lonEl + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
            fetch(requestUrlOneCall)
                .then(function (response) {
                    return response.json()
                })
```

## Technology Used

![HTML Badge](https://img.shields.io/badge/Language-HTML-brightgreen)
![CSS Badge](https://img.shields.io/badge/Language-CSS-yellow)
![JavaScript Badge](https://img.shields.io/badge/Language-JavaScript-orange)
![MomentJs Badge](https://img.shields.io/badge/API-MomentJS-lightgrey)
![JQuery Badge](https://img.shields.io/badge/API-JQuery-blue)
![Bootstrap Badge](https://img.shields.io/badge/API-Bootstrap-blueviolet)
![openweathermap.org API](https://img.shields.io/badge/API-openweather-9cf)


## License

MIT License

Copyright (c) 2022 Andrew Mason

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.