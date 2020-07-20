const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidG9wcmFtZW4iLCJhIjoiY2tjczVreXdiMDN5dzJxcWx2Znl4bHE0dyJ9.9JtSLQY1Se5axi4ZEsY2nA&limit=1'

    request({uri: url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services',undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            const {place_name: location, center} = body.features[0]
            callback(undefined,{
                location, 
                latitude: center[1],
                longitude: center[0]
            })
        }
    })
}

module.exports = geocode