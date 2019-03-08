import { WeatherView } from './WeatherView';

var weather = new WeatherView();

weather.getForecastView();
weather.getCurrentView();
weather.showCelsiusElements();
weather.showFahrenheitElements();

//for debugging
window.weather = weather;