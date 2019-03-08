
import { WeatherView } from './WeatherView';


var runner = new WeatherView();

runner.getForecastView();
runner.getCurrentView();

runner.showCelsiusElements();
runner.showFahrenheitElements();

window.runner = runner;
