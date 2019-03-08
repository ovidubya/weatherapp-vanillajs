import {
    WeatherAPI
} from './WeatherAPI';
import 'babel-polyfill';

var api = new WeatherAPI('63044e3b457c463582e223928190703');

/**
 * A class module that is able to make requests to the apixu API
 */

export class WeatherView {
    constructor() {
        this.displayCelsius = true;
        this.displayFahrenheit = true;
    }
    async getForecastView(customLocation = null) {
        var forecastData = await api.getForecastJSON(customLocation);

        var forecastTable = document.querySelector('div.forecast');
        if (!!forecastTable) {
            forecastTable.innerHTML = '';
        }
        if (forecastData != 'error') {

            var fiveDaysOfForecast = forecastData.forecast.forecastday,
                table = document.createElement('table'),
                thead = document.createElement('thead'),
                tbody = document.createElement('tbody');

            /**
             * Set up html/attrs
             */
            thead.innerHTML = `<tr><th>Day</th><th class="hide-f">Avg Temp (F)</th><th class="hide-c">Avg Temp (C)</th><th>Condition</th><th>Icon</th></tr>`;
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
            forecastTable.appendChild(table);

        }
        return this;
    }

    /**
     * Appends DOM elements for the current location/selected weather
     * 
     */
    async getCurrentView(customLocation = null) {
        var weatherData = await api.getCurrentJSON(customLocation);
        var currentView = document.querySelector('div.current');
        if (!!currentView) {
            currentView.innerHTML = '';
        }
        if (weatherData != 'error') {
            var image = document.createElement('img'),
                location_text = document.createElement('p'),
                currentWeatherinF = document.createElement('p'),
                currentWeatherinC = document.createElement('p');

            image.src = weatherData.current.condition.icon;

            location_text.className = 'current-location';
            location_text.innerHTML = `${weatherData.location.name}, ${weatherData.location.region}`;

            currentWeatherinF.className = 'current-weather-f hide-f';
            currentWeatherinF.innerHTML = `${weatherData.current.condition.text} ${weatherData.current.temp_f}\u{B0}F`;

            currentWeatherinC.className = 'current-weather-c hide-c';
            currentWeatherinC.innerHTML = `${weatherData.current.condition.text} ${weatherData.current.temp_c}\u{B0}C`;


            /**
             * Append elements to the current view
             */

            currentView.appendChild(image);
            currentView.appendChild(location_text);
            currentView.appendChild(currentWeatherinF);
            currentView.appendChild(currentWeatherinC);


        }
        return this;
    }

    /**
     * Hides all elements with the hide-f class
     */
    hideFahrenheitElements() {
        document.querySelectorAll('.hide-f').forEach(el => el.style.display = 'none');
        return this;
    }

    /**
     *  Hides all elements with the hide-c class
     */
    hideCelsiusElements() {
        document.querySelectorAll('.hide-c').forEach(el => el.style.display = 'none');
        return this;
    }

    /**
     *  Shows all elements with the hide-f class
     */
    showFahrenheitElements() {
        document.querySelectorAll('.hide-f').forEach(el => el.nodeName == 'P' ? el.style.display = 'block' : el.style.display = 'table-cell');
        return this;
    }

    /**
     *  Shows all elements with the hide-f class
     */
    showCelsiusElements() {
        document.querySelectorAll('.hide-c').forEach(el => el.nodeName == 'P' ? el.style.display = 'block' : el.style.display = 'table-cell');
        return this;
    }

    /**
     * Will either hide or show the F temperature where applicable
     */
    toggleF() {
        if (this.displayFahrenheit == true) {
            this.hideFahrenheitElements();
            this.displayFahrenheit = false;
        } else {
            this.showFahrenheitElements();
            this.displayFahrenheit = true;
        }
        return this;
    }

    /**
     * Will either hide or show the C temperature where applicable
     */
    toggleC() {
        if (this.displayCelsius == true) {
            this.hideCelsiusElements();
            this.displayCelsius = false;
        } else {
            this.showCelsiusElements();
            this.displayCelsius = true;
        }
        return this;
    }
    /**
     * Gets the search box value and runs the WeatherView functions against the supplied paramter.
     */
    updateLocation() {
        var weatherLocation = document.getElementById('search');
        if (!!weatherLocation) {
            this.getCurrentView(weatherLocation.value);
            this.getForecastView(weatherLocation.value);
        }
        return this;
    }
}