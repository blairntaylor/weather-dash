$(document).ready(function(){

    //collecting global variables
    var searchBtn = document.getElementById("search-button");
    var cityName = document.getElementById("city-name");
    var currentDay = document.getElementById("current-day");
    var temperature = document.getElementById("temperature");
    var humidity = document.getElementById("humidity");
    var windSpeed = document.getElementById("wind-speed");
    var uvIndex = document.getElementById("uv-index");
    //history and local storage
    var history = JSON.parse(localStorage.getItem("search")) || [];
    console.log(history);
    // var weatherIcon = document.getElementById("#weather-icon");

    //accessing open weather with API key
    var APIKey = "6c813c85e9ba5137a719bf680b83be65";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6c813c85e9ba5137a719bf680b83be65";
    //call api.openweathermap.org/data/2.5/weather?q= + cityName + &APPID= + API key
    
    //moment in time
    $("#current-day").text(moment().format('MMMM Do YYYY, h:mm a')); 

    $("#search-button").on("click", function(){
        var searchInput = $("#search-input").val(); 
        getWeather(searchInput);
    })

    //run AJAX to call open weathermap
    function getWeather(cityName) {

        // if (history.indexOf(searchValue) === -1) {
        //     window.localStorage.setItem("history", JSON.stringify(history));
        //   }
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6c813c85e9ba5137a719bf680b83be65&units=imperial",
            method: "GET",

        })
        .then(function (response) {
            // Log the queryURL
            console.log(response);
            //transfer content to HTML
            $("#city-name").text(response.name);
            $("#temp-value").text(response.main.temp);
            $("#humid").text(response.main.humidity);
            $("#speed").text(response.wind.speed);
            //cannot get proper uv index to show with lat and lon
            $("#uvindex").text(response.main.humidity);

            // cannot get weather icon to show
            var weatherIcon = $("<img>");
            // weatherIcon.attr("src", "http://openweathermap.org/img/wn/10d@2x.png"); //works but very large img
            weatherIcon.attr("src", "http://openweathermap.org/img/wn/10d" + response.data.weather[0].icon + "@2x.png");
            $("#weather-icon").empty();
            $("#weather-icon").append(weatherIcon);

            //uv index with color index does not work without using longitutde and latitude coordinates
            latitude = weather.coord.lat;
            longitude = weather.coord.lon;

            var UVQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=&appid=6c813c85e9ba5137a719bf680b83be65&units=imperial" + "&lat=" + latitude + "&lon=" + longitude; 

            $.ajax({
                url: UVQueryURL,
                method: "GET",
                // Store all of the retrieved data
              })
              .then(function(uvIndex) {
                console.log(uvIndex);
        
                var uvIndexColor = $("<button>");
                uvIndexColor.addClass("btn btn-danger");

            // axios.get(UVQueryURL)
            // .then(function(response){
            //     $("#uv-index").attr("class", "badge badge-danger");
            //     $("#uv-index").text(response.data[0].val());
            //     uvIndex.append(uvIndex);
            })

            forecast(cityName);
        });

    }
    //cannot get forecast to show
    function forecast(response) {

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6c813c85e9ba5137a719bf680b83be65&units=imperial",
            method: "GET",
        })
        .then(function (response) {
            console.log("forecast", response)
            // will console.log the 5 days but not put append them into the the div
            for (var i =0; i > response.list.length; i++){
                if (response.list[i].dt_txt.indexOf("15:00:00")!==-1){






                    var column = $("<div>").addClass("col-md-2")
                    var card = $("<div>").addClass("card bg-primary text-white")
                    var body = $("<div>").addClass("card-body p-2")
                    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
                    var date = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString())
                    var p = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity)
                    var p2 = $("<p>").addClass("card-text").text("Temperature: " + response.list[i].main.temp_max)
                    column.append(card.append(body.append(date, img, p, p2)))
                    $("#forecast .row").append(column)
                }
            }
        });
        forecast();
    }
});
