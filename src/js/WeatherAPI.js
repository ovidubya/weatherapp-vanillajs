/**
 * Weather API used to update the WeatherView
 */
export class WeatherAPI {

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
     * Returns a promise with the cordinates of the user if they accept, otherwise rejects with the error
     */
    getUserCordinates() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                resolve(pos);
            },(error) => {
                reject(error);
            });
        });    
    }
    /**
     * Returns a promise that has the resolved data of the JSON response of the current weather, otherwise rejects with the erorr message
     * @param {any query that is valid from the apixu API} queryLocationString 
     */
    fetchCurrentJSON(queryLocationString) {
        return new Promise((resolve, reject) => {
            fetch(this.currentAPI + `&q=${queryLocationString}`)
                .then(data => {
                    if(data.status != 200) {
                        throw new Error("Not valid location");
                    }else {
                        return data.json();
                    }
                })
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }
    /**
     * Returns a promise that has the resolved data of the JSON response of the current forecast, otherwise rejects with the erorr message
     * @param {any query that is valid from the apixu API} queryLocationString 
     */
    fetchForecastJSON(queryLocationString) {
        return new Promise((resolve, reject) => {
            fetch(this.forecastAPI + `&q=${queryLocationString}`)
                .then(data => {
                    if(data.status != 200) {
                        throw new Error("Not valid location");
                    }else {
                        return data.json();
                    }
                })
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }
    /**
     * Returns the current JSON weather 
     */    
    async getCurrentJSON(customLocation = null) {
        //Try to get the users location
        var userCordinates = await this.getUserCordinates().catch(error => console.log('User did not accept location access', error));

        if (userCordinates && customLocation == null) {
            return await this.fetchCurrentJSON(`${userCordinates.coords.latitude},${userCordinates.coords.longitude}`).catch(error => console.log(error));
        } else {
            return await this.fetchCurrentJSON(customLocation || '60661').catch(error => console.log(error));
        }
    }
    /**
     * Returns the current JSON weather 
     */
    async getForecastJSON(customLocation = null) {
        var userCordinates = await this.getUserCordinates().catch(error => console.log('User did not accept location access', error));

        if(userCordinates && customLocation == null) {
            return await this.fetchForecastJSON(`${userCordinates.coords.latitude},${userCordinates.coords.longitude}`).catch(error => console.log(error));
        }
        else {
            return await this.fetchForecastJSON(customLocation || '60661').catch(error => console.log(error));
        }
    }
}