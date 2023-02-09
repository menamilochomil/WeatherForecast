//Getting the lat and long from reservamos API

// let searchName = document.getElementById("search-city").value;

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
const URL = "https://search.reservamos.mx/api/v2/places?q="

//Replace monterrey por una variable de lo que entra en searchName
fetch(URL + "monterrey", requestOptions)

  .then(response => response.json())
  .then(data => getData(data))
  .catch(error => console.log('error', error));

  //Getting daily weather data from openweather API
const getData = (data) => {
  console.log("soy monterrey", data)
  let lat = data[0].lat;
  let long = data[0].long;
  document.getElementById("current-name").innerText = "Weather in " + data[0].display

  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +
    '&lon=' + long + '&exclude=hourly,minutely&units=metric&appid=a5a47c18197737e8eeca634cd6acb581')
    .then(response => response.json())
    .then(data => {

      document.getElementById("current-temp").innerText = "Tempeture " + data.current.temp + "°"
      document.getElementById("current-humidity").innerText = "Humidity " + data.current.humidity + "%"
      document.getElementById("current-icon").src ="https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
      document.getElementById("current-description").innerText = data.current.weather[0].description

    console.log("soy clima", data)

})
}