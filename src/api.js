var rootUrl = "http://api.openweathermap.org/data/2.5/weather?";
var app_ID = 'APPID=2d0dff1c04a83393c2952654fba07117';
var _ = require('lodash');

var kelvinToF = function(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F';
}

module.exports = function(latitude, longitude) {
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}&` + app_ID;

  return fetch(url)
    .then(function(response){
      return response.json()
    })
    .catch( (e) => console.log('error with request', e))
    .then(function(json){
      return {
        city: json.name,
        temperature: kelvinToF(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    })
    .catch( (e) => console.log('error with request', e))

}
