import { Qrwc } from '@q-sys/qrwc';
import WebSocket from "ws";
import got from 'got';
import url from 'url';
import os from 'os';
import 'dotenv/config';

function getCoreIP() {
  if (process.env.CORE_IP) return process.env.CORE_IP;
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}
const coreIP = getCoreIP();
console.log("Connecting to Core IP:", coreIP);

const socket = new WebSocket(`ws://${coreIP}/qrc-public-api/v0`);
socket.on("error",(ws, code, reason) =>
{

} )

const qrwc = await Qrwc.createQrwc({
  socket,
  polllingInterval: 100
})

const weather = qrwc.components.weather;
weather.controls.go.on('update', async ({ Value, Position, String, Bool }) => {
  console.log("hey")


  const requestUrl = url.format({
    protocol: 'https',
    hostname: 'api.openweathermap.org',
    pathname: 'data/2.5/weather',
    query: {
      q: 'denver',
      units: 'imperial',
      appid: 'eb18f4c690263e77ab3bbf84ef91a3cb'
    }
  })

  const iconMap = {
    '01d': '☀️', '01n': '☀️', // clear sky
    '02d': '🌤️', '02n': '🌤️', // few clouds
    '03d': '⛅', '03n': '⛅', // scattered clouds
    '04d': '🌥️', '04n': '🌥️', // broken clouds
    '09d': '🌧️', '09n': '🌧️', // shower rain
    '10d': '🌧️', '10n': '🌧️', // rain
    '11d': '🌩️', '11n': '🌩️', // thunderstorm
    '13d': '🌨️', '13n': '🌨️', // snow
    '50d': '🌫️', '50n': '🌫️', // mist
  }

  const data = await got(requestUrl).json();

  let msg = `In ${data.name} it is currently ${data.main.temp}°
but it feels like ${data.main.feels_like}° `

  weather.controls.message.update(msg)
  weather.controls.icon.update(iconMap[data.weather[0].icon])

})


