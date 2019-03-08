/**
 * A class module that is able to make requests to the apixu API
 */
export class Weather {

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
    }

    /**
     * Returns the current location if available, otherwise defaults to a hardcoded zip code
     * navigator.geolocation isn't supported in all browsers, and it does require https and not http
     * so first check if we are on a https protocal otherwise just do the zipcode
     */
    getCurrentJSON() {

        if (this.isGeo && this.isHttps) {
            navigator.geolocation.getCurrentPosition((pos) => {


                fetch(this.currentAPI + `&q=${pos.coords.latitude},${pos.coords.longitude}`)
                    .then(data => data.json())
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
            });


        } else {

            fetch(this.currentAPI + '&q=60661')
                .then(data => data.json())
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }
    }
    /**
     * Returns the 5 day forcast of the current location
     */
    getFiveDayForecast() {
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

    getForecastTable() {
        this.getFiveDayForecast().then(forecastData => {
            var fiveDaysOfForecast = forecastData.forecast.forecastday,
                    table = document.createElement('table'),
                    thead = document.createElement('thead'),
                    tbody = document.createElement('tbody');

            /**
             * Set up html/attrs
             */
            thead.innerHTML =`<tr><th>Day</th><th class="hide-f">Avg Temp (F)</th><th class="hide-c">Avg Temp (C)</th><th>Condition</th><th>Icon</th></tr>`;
            table.setAttribute('border', '1');

            for (var i = 0; i < fiveDaysOfForecast.length; i++) {
                /**
                 * Set up contents of table
                 */
                var row = document.createElement('tr'),
                    date = document.createElement('td'),
                    average_f = document.createElement('td'),
                    average_c = document.createElement('td'),
                    weather_condition = document.createElement('td'),
                    weather_icon = document.createElement('td'),
                    weather_icon_img = document.createElement('img');

                /**
                 * Add data to the table and custom attrs
                 */
                date.innerHTML = new Date(fiveDaysOfForecast[i].date).toDateString().split(' ')[0];
                
                average_f.innerHTML = fiveDaysOfForecast[i].day.avgtemp_f + "\u{B0}";
                average_f.classList.add('hide-f');

                average_c.innerHTML = fiveDaysOfForecast[i].day.avgtemp_c + "\u{B0}";
                average_c.classList.add('hide-c');

                weather_condition.innerHTML = fiveDaysOfForecast[i].day.condition.text;
                
                weather_icon_img.src = fiveDaysOfForecast[i].day.condition.icon;

                /**
                 * Append to row
                 */
                row.appendChild(date);
                row.appendChild(average_f);
                row.appendChild(average_c);
                row.appendChild(weather_condition);
                weather_icon.appendChild(weather_icon_img); // <-- outlier lol
                row.appendChild(weather_icon);
                tbody.appendChild(row);
            }
            table.appendChild(thead);
            table.appendChild(tbody);

            var forecastTable = document.querySelector('div.forecast');
            if(!!forecastTable) {
                forecastTable.innerHTML = '';
                forecastTable.appendChild(table);
            }
        });
    }
}