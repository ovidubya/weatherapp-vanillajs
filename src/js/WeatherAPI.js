export class WeatherAPI {
    /**
     * Returns if we are using https
     */
    get isHttps() {
        return location.protocol == 'https:';
    }

    /**
     * Return if geolocation is supported
     */
    get isGeo() {
        return !!navigator.geolocation;
    }

    /**
     * Set up initial currentAPI url for future requests
     * @param {api key for the Weather object} apiKey 
     */
    constructor(apiKey) {
        this.currentAPI = `${location.protocol}//api.apixu.com/v1/current.json?key=${apiKey}`;
        this.forecastAPI = `${location.protocol}//api.apixu.com/v1/forecast.json?key=${apiKey}&days=5`;
        this.displayFahrenheit = true;
        this.displayCelsius = true;
    }

    /**
     * Returns the current location if available, otherwise defaults to a hardcoded zip code
     * navigator.geolocation isn't supported in all browsers, and it does require https and not http
     * so first check if we are on a https protocal otherwise just do the zipcode
     */
    getCurrentJSON() {

        if (this.isGeo && this.isHttps) {
            navigator.geolocation.getCurrentPosition((pos) => {


                return fetch(this.currentAPI + `&q=${pos.coords.latitude},${pos.coords.longitude}`)
                    .then(data => data.json())
                    .then(result => result)
                    .catch(err => console.log(err));
            });


        } else {

            return fetch(this.currentAPI + '&q=60661')
                .then(data => data.json())
                .then(result => result)
                .catch(err => console.log(err));
        }
    }
    /**
     * Returns the 5 day forcast of the current location
     */
    getForecastJSON() {
        if (this.isGeo && this.isHttps) {
            navigator.geolocation.getCurrentPosition((pos) => {


                return fetch(this.forecastAPI + `&q=${pos.coords.latitude},${pos.coords.longitude}`)
                    .then(data => data.json())
                    .then(result => result)
                    .catch(err => console.log(err));
            });


        } else {

            return fetch(this.forecastAPI + '&q=60661')
                .then(data => data.json())
                .then(result => result)
                .catch(err => console.log(err));
        }
    }
}