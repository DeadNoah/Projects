const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const digitalTime = document.getElementById('digitalTime');
const analogClock = document.getElementById('analogClock');
const digitalClock = document.getElementById('digitalClock');
const toggleButton = document.getElementById('toggleButton');
const timezoneButton = document.getElementById('timezoneButton');
const locationInfo = document.getElementById('locationInfo');
const weatherInfo = document.getElementById('weatherInfo');


const timeZones = [
  { id: 'America/New_York', name: 'New York', country: 'USA', tz: 'EST', weatherId: 5128581, unsplashQuery: 'new york city' },
  { id: 'America/Chicago', name: 'Chicago', country: 'USA', tz: 'CST', weatherId: 4887398, unsplashQuery: 'chicago skyline' },
  { id: 'America/Denver', name: 'Denver', country: 'USA', tz: 'MST', weatherId: 5419384, unsplashQuery: 'denver landscape' },
  { id: 'America/Los_Angeles', name: 'Los Angeles', country: 'USA', tz: 'PST', weatherId: 5368361, unsplashQuery: 'los angeles' },
  { id: 'Europe/London', name: 'London', country: 'UK', tz: 'GMT', weatherId: 2643743, unsplashQuery: 'london' },
  { id: 'Europe/Paris', name: 'Paris', country: 'France', tz: 'CET', weatherId: 2988507, unsplashQuery: 'paris' },
  { id: 'Asia/Tokyo', name: 'Tokyo', country: 'Japan', tz: 'JST', weatherId: 1850147, unsplashQuery: 'tokyo' },
  { id: 'Australia/Sydney', name: 'Sydney', country: 'Australia', tz: 'AEST', weatherId: 2147714, unsplashQuery: 'sydney' }
]

let currentTimezoneIndex = 0;
let currentTimezone = timeZones[currentTimezoneIndex];


const weatherApiKey = '1641db9f6cc857948185f9b990bd689f'; 
const unsplashApiKey = '7yMCNlxbpTm_MzhvZDDHJ90L7KTH-vm8PkX_pNKYLJk';

const fallbackBackgrounds = {
  'New York': 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&w=1920&q=80',
  'Chicago': 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&w=1920&q=80',
  'Denver': 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&w=1920&q=80',
  'Los Angeles': 'https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-4.0.3&w=1920&q=80',
  'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&w=1920&q=80',
  'Paris': 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&w=1920&q=80',
  'Tokyo': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&w=1920&q=80',
  'Sydney': 'https://images.unsplash.com/photo-1523428096881-5bd79d043006?ixlib=rb-4.0.3&w=1920&q=80'
};


function setDate() {
  const now = new Date();
  const options = { timeZone: currentTimezone.id };
  

  const hours = now.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: currentTimezone.id });
  const minutes = now.toLocaleString('en-US', { minute: 'numeric', timeZone: currentTimezone.id });
  const seconds = now.toLocaleString('en-US', { second: 'numeric', timeZone: currentTimezone.id });
  
  // ANALOG CLOCK
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  
  const minsDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;
  
  const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  
  // DIGITAL CLOCK
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  digitalTime.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function toggleClock() {
  if (analogClock.style.display === 'none') {
      analogClock.style.display = 'block';
      digitalClock.style.display = 'none';
      toggleButton.textContent = 'Digital Clock';
  } else {
      analogClock.style.display = 'none';
      digitalClock.style.display = 'block';
      toggleButton.textContent = 'Analog Clock';
  }
}

function nextTimezone() {
  currentTimezoneIndex = (currentTimezoneIndex + 1) % timeZones.length;
  currentTimezone = timeZones[currentTimezoneIndex];
  locationInfo.textContent = `${currentTimezone.name} (${currentTimezone.tz})`;
  fetchWeather(currentTimezone.weatherId);
  setDate(); 
}

async function nextTimezone() {
  currentTimezoneIndex = (currentTimezoneIndex + 1) % timeZones.length;
  currentTimezone = timeZones[currentTimezoneIndex];

  locationInfo.textContent = `${currentTimezone.name} (${currentTimezone.tz})`;
  

  await updateBackground(currentTimezone.name, currentTimezone.unsplashQuery);
  await fetchWeather(currentTimezone.weatherId);
  

  setDate();
}


async function updateBackground(cityName, query) {
  try {
      if (!unsplashApiKey || unsplashApiKey === '7yMCNlxbpTm_MzhvZDDHJ90L7KTH-vm8PkX_pNKYLJk') {
          throw new Error('No Unsplash API key provided');
      }
      
      const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${unsplashApiKey}`
      );
      
      if (!response.ok) throw new Error('Unsplash API error');
      
      const data = await response.json();
      const imageUrl = data.urls.full;
      document.documentElement.style.backgroundImage = `url(${imageUrl})`;
  } catch (error) {
      console.error('Error fetching background:', error);
      document.documentElement.style.backgroundImage = `url(${fallbackBackgrounds[cityName]})`;
  }
}

async function fetchWeather(cityId) {
  if (!weatherApiKey || weatherApiKey === '7yMCNlxbpTm_MzhvZDDHJ90L7KTH-vm8PkX_pNKYLJk') {
      weatherInfo.textContent = 'Please add your OpenWeatherMap API key';
      return;
  }
  
  try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${weatherApiKey}`
      );
      const data = await response.json();
      
      if (data.cod === 200) {
          const temp = Math.round(data.main.temp);
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          weatherInfo.innerHTML = `
              ${temp}°C, ${description} 
              <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
          `;
      } else {
          weatherInfo.textContent = 'Weather data unavailable';
      }
  } catch (error) {
      console.error('Error fetching weather:', error);
      weatherInfo.textContent = 'Error loading weather';
  }
}


toggleButton.addEventListener('click', toggleClock);
timezoneButton.addEventListener('click', nextTimezone);


locationInfo.textContent = `${currentTimezone.name} (${currentTimezone.tz})`;
updateBackground(currentTimezone.name, currentTimezone.unsplashQuery);
fetchWeather(currentTimezone.weatherId);
setInterval(setDate, 1000);
setDate();