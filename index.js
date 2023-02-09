//Getting the lat and long from reservamos API
const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
const URL = 'https://search.reservamos.mx/api/v2/places?q='

function getCity(city) {
  fetch(URL + city, requestOptions)
    .then(response => response.json())
    .then(data => getData(data))
    .catch(error => console.log('error', error));
}

//Getting daily weather data from openweather API
const getData = (data) => {
  let lat = data[0].lat;
  let long = data[0].long;
  document.getElementById('current-name').innerText = 'Weather in ' + data[0].display

  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +
    '&lon=' + long + '&exclude=hourly,minutely&units=metric&appid=a5a47c18197737e8eeca634cd6acb581')
    .then(response => response.json())
    .then(data => {

      //Rendering the data for the current date
      document.getElementById('current-temp').innerText = 'Temperature ' + data.daily[0].temp.min + '° /' + data.daily[0].temp.max + '°'
      document.getElementById('current-humidity').innerText = 'Humidity ' + data.daily[0].humidity + '%'
      document.getElementById('current-icon').src = 'https://openweathermap.org/img/wn/' + data.daily[0].weather[0].icon + '.png';
      document.getElementById('current-description').innerText = data.daily[0].weather[0].description

      //Loop to create the weekly weather forecast
      let container = ''
      for (let i = 0; i < data.daily.length; i++) {
        const unix = data.daily[i].dt
        const date = new Date(unix * 1000).toLocaleDateString('en-US');
        const today = new Date().toLocaleDateString('en-US')
        //Aún no funciona. Considerar no condicionarlo
        // if (date === today) {
        //   return ''
        // } else {

          // const day = date.getDay()

          container += `
              <p>Date:${date} </p>
              <img src=${'https://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png'} alt='weather-icon' id='current-icon' />
              <p>Temperature: ${data.daily[i].temp.min}° / ${data.daily[i].temp.max}° <p>
              <p>Humidity: ${data.daily[i].humidity} <p>
              <p>  ${data.daily[i].weather[0].description} </p>
          `
          document.getElementById('weekly-weather-section').innerHTML = container
        // }

      }
    })
}

//Connecting the function with the search input
document.getElementById('search-weather-form').addEventListener('keyup', (e) => {
  e.preventDefault();
  getCity(document.getElementById('search-city').value)
})
