const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=79a684f1a94f9b948125e2a2376c36f9&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.current.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        " It is currently " +
          body.location.localtime.slice(11) +
          "." +
          " " +
          "The current temperate is " +
          body.current.temperature +
          " degrees out. " +
          "It feels like " +
          body.current.feelslike +
          " degrees, with " +
          String(body.current.weather_descriptions).toLowerCase() +
          " skies."
      );
    }
  });
};

module.exports = forecast;
