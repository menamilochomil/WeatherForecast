module.exports = () => {
    let data = []
  let searchName = document.getElementById("search-city").value;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const URL = "https://search.reservamos.mx/api/v2/places?q="

//Replace monterrey por una variable de lo que entra en searchName
  fetch( URL + "monterrey", requestOptions)
    .then(response => response.json())
    .then(result => console.log(data = {
      city: result[0].city_name,
      lat: result[0].lat,
      long: result[0].long
    }))
    .catch(error => console.log('error', error));

  return data
}
