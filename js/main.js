/* ========================================================================================
                                     DOM ELEMENTS
======================================================================================== */
const loader = document.querySelector('.loader-container');
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

const showLoading = () => loader.classList.remove('hide');
const hideLoading = () => loader.classList.add('hide');

const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    text: message,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    iconColor: '#d90429',
    customClass: {
      container: 'popup-container',
      popup: 'my-popup',
      icon: 'popup-icon',
      confirmButton: 'popup-confirm-button',
    },
  });
};

const fetchCityWeather = async (city) => {
  showLoading();
  try {
    const response = await fetch(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (!response.ok) {
      const firstChar = data.message[0].toUpperCase();
      const remainingChars = data.message.slice(1, data.message.length);
      const errorMessage = firstChar + remainingChars;
      showErrorAlert(errorMessage);
      hideLoading();
      return;
    }

    return data;
  } catch (error) {
    console.error(error);
    showErrorAlert('Something went wrong. Please try again.');
  } finally {
    // hideLoading();
  }
};

const updateWeather = async (city) => {
  const data = await fetchCityWeather(city);
  if (!data) return;
  renderWeather(data);
};

const renderWeather = (weatherData) => {
  searchInput.value = '';

  weatherIcon.src = `./assets/icons/3D-Icons/${weatherData.weather[0].main}.svg`;
  weatherIcon.onload = () => hideLoading();

  cityName.textContent = `${weatherData.name},`;
  countryCode.textContent = weatherData.sys.country;
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
    showErrorAlert('No city entered. Please try again.');
    return;
  }

  updateWeather(searchedCity);
};

const focusSearchInput = () => {
  setTimeout(() => {
    searchInput.focus();
  }, 100);
};

/* ========================================================================================
                                      EVENT LISTENERS
======================================================================================== */

window.addEventListener('load', () => {
  updateWeather('Montreal');
  focusSearchInput();
});

searchBtn.addEventListener('click', handleSearchClick);
document.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && document.activeElement === searchInput) {
    handleSearchClick();
  }
});
