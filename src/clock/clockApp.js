import 'babel-polyfill';
import './sass/clock.scss';
import Clock from './clock';

const clock24 = new Clock(24);
const drawClock24 = (clockData) => {
  document.getElementById('clock-24-hours').innerHTML = clockData.hours;
  document.getElementById('clock-24-minutes').innerHTML = clockData.minutes;
  document.getElementById('clock-24-seconds').innerHTML = clockData.seconds;
};
clock24.addOnChange(drawClock24);
clock24.start();

const clock12 = new Clock(12);
const drawClock12 = (clockData) => {
  document.getElementById('clock-12-hours').innerHTML = clockData.hours;
  document.getElementById('clock-12-minutes').innerHTML = clockData.minutes;
  document.getElementById('clock-12-seconds').innerHTML = clockData.seconds;
};
clock12.addOnChange(drawClock12);
clock12.start();

setTimeout(() => {
  document.getElementById('clock-24').style.display = 'block';
  document.getElementById('clock-12').style.display = 'block';
}, 1000);