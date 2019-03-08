import { WeatherView } from './WeatherView';

var weather = new WeatherView();

weather
    .getForecastView()
    .getCurrentView()
    .showCelsiusElements()
    .showFahrenheitElements();

//for debugging
window.weather = weather;