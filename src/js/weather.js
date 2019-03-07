/**
 * A class module that is able to make requests to the apixu API
 */
export class Weather {

    /**
     * Returns if we are using https
     */
    get isHttps() { return location.protocol == 'https:'; }

    /**
     * Return if geolocation is supported
     */
    get isGeo() { return !!navigator.geolocation; }

    /**
     * Set up initial currentAPI url for future requests
     * @param {api key for the Weather object} apiKey 
     */
    constructor(apiKey) {
        this.currentAPI = `${location.protocol}//api.apixu.com/v1/current.json?key=${apiKey}`; 
    }

    /**
     * Returns the current location if available, otherwise defaults to a hardcoded zip code
     * navigator.geolocation isn't supported in all browsers, and it does require https and not http
     * so first check if we are on a https protocal otherwise just do the zipcode
     */
    getCurrentJSON() {

        if(this.isGeo && this.isHttps ) {
            navigator.geolocation.getCurrentPosition((pos) => {
                
                
                fetch(this.currentAPI + `&q=${pos.coords.latitude},${pos.coords.longitude}`)
                    .then(data => data.json())
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
            });
            

        }else {

            fetch(this.currentAPI + '&q=60661')
                .then(data => data.json())
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }
    }
}

