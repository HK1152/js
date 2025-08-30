// DOM refs
const form = document.querySelector('form');
const city = document.querySelector('#city');
const cityName = document.querySelector('#city-name');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');
const weather = document.querySelector('#weather');
const errorEl = document.querySelector('#error');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const pressure = document.querySelector('#pressure');
const visibility = document.querySelector('#visibility');
const cloudiness = document.querySelector('#cloudiness');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const feelsLike = document.querySelector('#feels-like');

const sunWrap = document.querySelector('.sun-wrap');
const moonWrap = document.querySelector('.moon-wrap');
const stars = document.querySelector('.stars');
const cloudsWrap = document.querySelector('.clouds');
const rainLayer = document.querySelector('.rain-layer');
const snowLayer = document.querySelector('.snow-layer');
const flash = document.querySelector('.flash');
const bolt = document.querySelector('.bolt');

const apiKey = '127c1972e012dcce54ff984062ae2f13';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}';

// Helpers
const KtoC = k => Math.round(k - 273.15);
const fmtTime = (unix, tzShiftSec) => {
  const d = new Date((unix + tzShiftSec) * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


let rainTimers = [];
let snowTimers = [];
let thunderTimer = null;

function hideAllSky() {
  sunWrap.style.display = 'none';
  moonWrap.style.display = 'none';
  stars.style.opacity = 0;
  cloudsWrap.style.display = 'none';
  stopRain();
  stopSnow();
  stopThunder();
}

function startSun() {
  sunWrap.style.display = 'block';
}
function startMoon() {
  moonWrap.style.display = 'block';
  stars.style.opacity = 0.8;
}

function startClouds() {
  cloudsWrap.style.display = 'block';
}

function spawnDrop() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class', 'drop');
  svg.style.left = (Math.random() * window.innerWidth) + 'px';
  svg.style.top = (-20 - Math.random()*200) + 'px';
  const dur = 800 + Math.random()*700; // ms
  svg.style.animationDuration = (dur/1000) + 's';

  const use = document.createElementNS('http://www.w3.org/2000/svg','use');
  use.setAttributeNS('http://www.w3.org/1999/xlink','href','#dropSymbol');
  svg.appendChild(use);

  rainLayer.appendChild(svg);
  const t = setTimeout(() => { svg.remove(); }, dur + 1000);
  rainTimers.push(t);
}
function startRain(intensity = 250) {
  rainLayer.style.display = 'block';
  const loop = () => {
    spawnDrop();
    const t = setTimeout(loop, Math.max(60, intensity + Math.random()*120));
    rainTimers.push(t);
  };
  loop();
}
function stopRain() {
  rainLayer.style.display = 'none';
  rainTimers.forEach(t => clearTimeout(t));
  rainTimers = [];
  rainLayer.innerHTML = '';
}

function spawnFlake() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class','flake');
  const size = 10 + Math.random()*16; 
  svg.style.width = size + 'px';
  svg.style.height = size + 'px';
  svg.style.left = (Math.random()*window.innerWidth) + 'px';
  svg.style.top = (-30 - Math.random()*150) + 'px';

  const fallDur = 5000 + Math.random()*6000; 
  const driftDur = 3000 + Math.random()*3000; 
  svg.style.animationDuration = `${fallDur}ms, ${driftDur}ms`;
  svg.style.animationDelay = `0ms, ${Math.random()*1500}ms`;

  const use = document.createElementNS('http://www.w3.org/2000/svg','use');
  use.setAttributeNS('http://www.w3.org/1999/xlink','href','#flakeSymbol');
  svg.appendChild(use);

  snowLayer.appendChild(svg);
  const t = setTimeout(() => { svg.remove(); }, fallDur + 2000);
  snowTimers.push(t);
}
function startSnow(rate = 350) {
  snowLayer.style.display = 'block';
  const loop = () => {
    spawnFlake();
    const t = setTimeout(loop, rate + Math.random()*200);
    snowTimers.push(t);
  };
  loop();
}
function stopSnow() {
  snowLayer.style.display = 'none';
  snowTimers.forEach(t => clearTimeout(t));
  snowTimers = [];
  snowLayer.innerHTML = '';
}

function strikeOnce() {

  flash.style.opacity = 1;
  bolt.style.display = 'block';
  bolt.style.left = (window.innerWidth * (0.5 + (Math.random()-0.5)*0.4)) + 'px';
  bolt.style.top  = (window.innerHeight * (0.15 + Math.random()*0.2)) + 'px';

  setTimeout(()=>{ flash.style.opacity = 0; }, 120);
  setTimeout(()=>{ bolt.style.display = 'none'; }, 300);
}
function startThunder() {
  stopThunder();
  const loop = () => {
    strikeOnce();
    const gap = 2000 + Math.random()*4000;
    thunderTimer = setTimeout(loop, gap);
  };
  loop();
}
function stopThunder() {
  if (thunderTimer) clearTimeout(thunderTimer);
  thunderTimer = null;
  flash.style.opacity = 0;
  bolt.style.display = 'none';
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorEl.textContent = '';
  const cityValue = city.value.trim();
  if (!cityValue) return;

  const url = apiUrl.replace('{city}', encodeURIComponent(cityValue)).replace('{apiKey}', apiKey);
  document.querySelector('#loading').style.display = 'block';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.querySelector('#loading').style.display = 'none';
      if (data.cod !== 200) throw new Error(data.message || 'City not found');

      cityName.textContent = data.name;
      temperature.textContent = KtoC(data.main.temp) + '°C';
      description.textContent = data.weather[0].description;
      weather.style.display = 'block';
      humidity.textContent = data.main.humidity + '%';
      windSpeed.textContent = data.wind.speed + ' m/s';
      pressure.textContent = data.main.pressure + ' hPa';
      visibility.textContent = (data.visibility/1000).toFixed(1) + ' km';
      cloudiness.textContent = data.clouds.all + '%';
      sunrise.textContent = fmtTime(data.sys.sunrise, data.timezone);
      sunset.textContent  = fmtTime(data.sys.sunset,  data.timezone);
      feelsLike.textContent = KtoC(data.main.feels_like) + '°C';

      const nowLocalUnix = Math.floor(Date.now()/1000) + data.timezone; 
      const isDay = nowLocalUnix >= data.sys.sunrise + data.timezone &&
                    nowLocalUnix <  data.sys.sunset  + data.timezone;

      const main = (data.weather[0].main || '').toLowerCase();
      const desc = (data.weather[0].description || '').toLowerCase();

      hideAllSky();


      if (data.clouds && Number(data.clouds.all) > 25) startClouds();

      if (main.includes('thunder') || desc.includes('thunder')) {
        startRain(140); 
        startThunder();
        isDay ? startSun() : startMoon();
      } else if (main.includes('rain') || desc.includes('drizzle')) {
        startRain(220);
     
        if (isDay) startSun(); else startMoon();
      } else if (main.includes('snow')) {
        startSnow(320);
        if (isDay) startSun(); else startMoon();
      } else if (main.includes('cloud')) {
      
        if (isDay) startSun(); else startMoon();
      } else {
      
        if (isDay) startSun(); else startMoon();
      }
    })
    .catch(err => {
      document.querySelector('#loading').style.display = 'none';
      weather.style.display = 'none';
      hideAllSky();
      errorEl.textContent = 'City not found or API error. Please try again.';
      console.error(err);
    });
});
