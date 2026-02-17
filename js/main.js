/* ========================================================================================
                                     DOM ELEMENTS
======================================================================================== */
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const cityName = document.querySelector('.city-name');
const countryCode = document.querySelector('.country-code');
const weatherIcon = document.querySelector('.weather-icon');
const temperatureValue = document.querySelector('.temperature-value');
const weatherStatus = document.querySelector('.weather-status');
const weatherDescription = document.querySelector('.weather-description');
const highValue = document.querySelector('.high-value');
const lowValue = document.querySelector('.low-value');
const pressureValue = document.querySelector('.pressure-value');
const humidityValue = document.querySelector('.humidity-value');
const windValue = document.querySelector('.wind-value');

/* ========================================================================================
                                     INITIAL STATE
======================================================================================== */

const apiKey = '3a91106135bfc1f3d72d9cc9da090783';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

/* ========================================================================================
                                      FUNCTIONS
======================================================================================== */

const fetchCityWeather = async (city) => {
  try {
    const response = await fetch(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (!response.ok) {
      const firstChar = data.message[0].toUpperCase();
      const remainingChars = data.message.slice(1, data.message.length);
      const errorMessage = firstChar + remainingChars;

      alert(errorMessage);
      return;
    }

    return data;
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again.');
  }
};

const updateWeather = async (city) => {
  const data = await fetchCityWeather(city);
  if (!data) return;
  renderWeather(data);
};

const renderWeather = (weatherData) => {
  searchInput.value = '';
  console.log(weatherData);
  cityName.textContent = `${weatherData.name},`;
  countryCode.textContent = weatherData.sys.country;
  weatherIcon.src = `./assets/icons/3D-Icons/${weatherData.weather[0].main}.svg`;
  temperatureValue.textContent = Math.round(weatherData.main.temp);
  weatherStatus.textContent = weatherData.weather[0].main;
  weatherDescription.textContent = weatherData.weather[0].description;
  highValue.textContent = Math.round(weatherData.main.temp_max);
  lowValue.textContent = Math.round(weatherData.main.temp_min);
  pressureValue.textContent = `${weatherData.main.pressure} hPa`;
  humidityValue.textContent = `${weatherData.main.humidity}%`;
  windValue.textContent = `${weatherData.wind.speed} m/s`;
};

const handleSearchClick = () => {
  const searchedCity = searchInput.value.trim().toLowerCase();
  if (!searchedCity) {
    alert('Please enter a city name before searching.');
    return;
  }

  updateWeather(searchedCity);
};

/* ========================================================================================
                                      EVENT LISTENERS
======================================================================================== */

window.addEventListener('load', () => {
  updateWeather('Montreal');
});

searchBtn.addEventListener('click', handleSearchClick);
