// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }

//     function showPosition(position) {
//         document.getElementById("test").innerHTML = "Latitude: " + position.coords.latitude + 
//         "<br>Longitude: " + position.coords.longitude;
//     }
// } 

function weatherShow() {
    let cityName = document.getElementById('search_bar').value.replace(/ /g, "%20");
    let apiKey = 'a0623eaded1c1b82a0a197e598bc25ca';
    let strFetch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    getData(strFetch);
    // console.log(strFetch);
}

// window.onload = function() {
//     document.getElementById('search_bar').addEventListener('keyup', e => {
//         if (e.key == 'Enter') {
//             getData(strFetch);
//         }
//     });
// }

function getData(strFetch) {
    var request = new XMLHttpRequest();
    
    request.open('GET', strFetch, true);
    request.responseType = 'json';

    request.onload = function () {
        if (this.readyState === 4) {
            if (this.status != 200) {
                document.getElementById('city').innerHTML = 'Error 404 (Not Found)';
            } 
            else {
                fetch(strFetch)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    document.getElementById('city').innerHTML = 'Now in ' + data.name;
                    document.getElementById('temp').innerHTML = data.main.temp + '°C';
                    document.getElementById('icon').setAttribute('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
                    document.getElementById('description').innerHTML = data.weather[0].description;
                    document.getElementById('humidity').innerHTML = 'Humidity: ' + data.main.humidity + '%';
                    document.getElementById('speed').innerHTML = 'Wind speed: ' + data.wind.speed + ' km/h';
                    
                    document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${data.weather[0].description.replace(/ /g, "%20")}')`; 
                })
            }
        }
    }
    request.send();

    document.getElementById('info').className = 'weather-info-shown';
}
            
// navigator.geolocation.getCurrentPosition(position => {
//     var lat = position.coords.latitude;
//     var lon = position.coords.longitude; 
//     console.log(lat, lon)

//     const geopos = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

//     fetch(geopos)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.city);
//     });
// })
