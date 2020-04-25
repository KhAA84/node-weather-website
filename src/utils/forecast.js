const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=5f43e96fb186fba400c41738747bf68e&query=37.8267,-122.4233';

// request({url: url, json: true}, (err, res) => {
//     if (err) {
//         console.log('Unable to connect to weather service!');
//     } else if (res.body.error){
//         console.log('Unable to find location');        
//     } else {
//         const current = res.body.current;
//         console.log(current.weather_descriptions + '. It is currently ' + current.temperature + ' degrees out. There is a '+ current.precip + '% chance of rain.' )
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5f43e96fb186fba400c41738747bf68e&query=' +
        latitude + ',' +
        longitude
//   console.log(url);
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined) 
        } else {
            const current = body.current;
            callback(undefined, current.weather_descriptions+'. Temperature: '+current.temperature+'°C. There is '+ current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)