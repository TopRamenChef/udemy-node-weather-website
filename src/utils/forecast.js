const request = require('postman-request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f3cdc893be63996f64efa3b1b0aa0d33&query='+lat+','+long+'&units=f'

    request({url, json:true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            callback('Unable to find location',undefined)
        } else{
            const {weather_descriptions,temperature,feelslike, wind_speed, wind_dir, humidity} = body.current 
            callback(undefined,
                'It is currently ' + weather_descriptions[0] + '. The temperature outside is ' + temperature + ' degrees Fahrenheit.' + 'The wind speed is ' + wind_speed + 'mph ' + wind_dir +', with a humidity of ' + humidity + '%. ' + 'It feels like ' + feelslike)
        }
    })
}

module.exports = forecast