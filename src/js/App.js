
import { WeatherView } from './WeatherView';
import { WeatherAPI } from './WeatherAPI';

var weather = new WeatherView();

weather
    .getForecastView()
    .getCurrentView()
    .showCelsiusElements()
    .showFahrenheitElements();

window.weather = weather;