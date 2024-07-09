// Search Functionality : Allow users to search for weather information by city name.
// by Pratiksha

const apiKey = 'a004ceab0143afc59d180cf15c595df2';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`;

const searchInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');

searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city, displayWeather);
    searchInput.value = '';
  } else {
    alert('Please enter a city name.');
  }
});

clearBtn.addEventListener('click', () => {
  clearWeatherDisplay();
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