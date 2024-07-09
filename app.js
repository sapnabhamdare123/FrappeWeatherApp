// Search Functionality : Allow users to search for weather information by city name.
// by Pratiksha

const apiKey = 'a004ceab0143afc59d180cf15c595df2';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`;

const searchInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const cityList = document.getElementById('city-list');
let recentCities = [];


searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city, displayWeather);
    addRecentCity(city);

    searchInput.value = '';
  } else {
    alert('Please enter a city name.');
  }
});

clearBtn.addEventListener('click', () => {
  // clearWeatherDisplay();
  clearRecentCities();

});

async function getWeather(city, callback) {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherApiUrl + city + '&appid=' + apiKey),
      fetch(forecastApiUrl + city + '&appid=' + apiKey)
    ]);

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    if (weatherData.cod === 200 && forecastData.cod === '200') {
      callback(weatherData, forecastData);
    } else {
      alert('City not found. Please enter a valid city name.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('An error occurred while fetching data.');
  }
}

// By Pratiksha

// Weather Display
function displayWeather(weatherData, forecastData) {
  const { name, main, weather, wind } = weatherData;
  const { temp, humidity } = main;
  const { description, icon } = weather[0];
  const { speed } = wind;

  document.getElementById('city-name').textContent = name;
  document.getElementById('temperature').textContent = "${temp}°C";
  document.getElementById('weather-description').textContent = description;
  document.getElementById('humidity').textContent = "Humidity: ${humidity}%";
  document.getElementById('wind-speed').textContent = `Wind Speed: ${speed} m/s`;
  document.querySelector('.fa-cloud').className = `fa-solid ${getWeatherIconClass(icon)}`;

  displayForecast(forecastData);
}

// Function to map weather icon class
function getWeatherIconClass(icon) {
  const iconMapping = {
    '01d': 'fa-sun',
    '01n': 'fa-moon',
    '02d': 'fa-cloud-sun',
    '02n': 'fa-cloud-moon',
    '03d': 'fa-cloud',
    '03n': 'fa-cloud',
    '04d': 'fa-cloud-meatball',
    '04n': 'fa-cloud-meatball',
    '09d': 'fa-cloud-showers-heavy',
    '09n': 'fa-cloud-showers-heavy',
    '10d': 'fa-cloud-sun-rain',
    '10n': 'fa-cloud-moon-rain',
    '11d': 'fa-poo-storm',
    '11n': 'fa-poo-storm',
    '13d': 'fa-snowflake',
    '13n': 'fa-snowflake',
    '50d': 'fa-smog',
    '50n': 'fa-smog'
  };
  return iconMapping[icon] || 'fa-cloud';
}

// by sapna


// Function to display forecast data
function displayForecast(forecastData) {
  const forecastItems = document.querySelectorAll('.forecast-item');
  for (let i = 0; i < 5; i++) {
    const dayData = forecastData.list[i * 8]; 
    const dayTempMin = dayData.main.temp_min;
    const dayTempMax = dayData.main.temp_max;
    forecastItems[i].innerHTML = <p>Day ${i + 1}: <span>High: ${dayTempMax}°C</span> <span>Low: ${dayTempMin}°C</span></p>;
  }
}

//By Vishakha