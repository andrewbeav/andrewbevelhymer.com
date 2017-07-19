const owm_appid = '5f0dabe0a94eb1d907d7a79ff7562b93';

$(function() {
  navigator.geolocation.getCurrentPosition(updateMeme, function(err) {
    console.log("Error getting location");
  },
  {
    enableHighAccuracy: true
  });

  $('#memeGenBtn').on('click', function() {
    $('#meme').attr('src', 'loading.gif');
    navigator.geolocation.getCurrentPosition(updateMeme, function(err) {
      console.log("Error getting location");
    },
    {
      enableHighAccuracy: true
    });
  })
});

function updateMeme(position) {
  let apiString = 'http://andrewbevelhymer.com/weathermeme/api/?owm_appid='+owm_appid+'&lat='+position.coords.latitude+'&lon='+position.coords.longitude
  $.getJSON(apiString, function(data) {
    console.log(data.meme_location);
    $('#meme').attr('src', data.meme_location);
    $('#locationLabel').html(data.weather_info.name);
    $('#tmpLabel').html('Temp: ' + data.weather_info.main.temp + ' &#176;F');
    $('#windLabel').html('Wind: ' + data.weather_info.wind.speed + 'MPH')
    $('#humidityLabel').html('Humidity: ' + data.weather_info.main.humidity + '%');
    $('#weatherDescriptionLabel').html(data.weather_info.weather[0].description);
  });
}
