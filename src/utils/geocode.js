const request = require('request')
const geocode=(address,callback)=>{

    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoia2F5aWFpbWFibGUiLCJhIjoiY2sxN29nMGR1MGFlajNqbXpkY3RmYjNpOSJ9.A1tIi_8NEJ33YGU96cINSw&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode