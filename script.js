$(document).ready(function(){

    //collecting global variables
    var searchBtn = document.getElementById("search-button");
    var searchInput = document.getElementById("search-input");
    var cityName = document.getElementById("city-name");
    var currentDay = document.getElementById("current-day");
    var temperature = document.getElementById("temperature");
    var humidity = document.getElementById("humidity");
    var windSpeed = document.getElementById("wind-speed");
    var uvIndex = document.getElementById("uv-index");
    var history = document.getElementById("input-history");

    //accessing open weather with API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" + cityName + APIKey;
    
    //moment in time
    $("#current-day").text(moment().format('MMMM Do YYYY, h:mm a')); 

    //run AJAX to cll open weathermap
    $.ajax({
        url: queryURL,
        method: "GET",
    })

    .then(function (response) {
        // Log the queryURL
        console.log(queryURL);

    });




});
