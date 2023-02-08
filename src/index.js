//Getting the lat and long from reservamos API
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

let data = []
//Replace monterrey por una variable de lo que entra en search
  fetch("https://search.reservamos.mx/api/v2/places?q=monterrey", requestOptions)
    .then(response => response.json())
    .then(result => console.log(data ={
      city:result[0].city_name,
      lat: result[0].lat,
      long: result[0].long
    }))
    .catch(error => console.log('error', error));

//Getting the weather from openweathermap API
// console.log(arr[0].city)