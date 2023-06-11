//const API_KEY = '385041d6079abf142d96faac54572968';
    // API-ключ для openweathermap.org
    const apiKey = '101b215ba7ec1732036591246252351f';

    // Контейнер для карточек погоды
const weatherCardsContainer = document.querySelector('.weather-cards');

// Функция для получения данных о погоде в заданном городе
async function getWeatherData(city) {
  const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
  const data = await response.json();
  return data;
}

// Функция для отображения данных о погоде в виде карточек
function showWeatherCards(weatherDataList) {
  weatherCardsContainer.innerHTML = '';

  weatherDataList.forEach(weatherData => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cityName = document.createElement('h3');
    cityName.textContent = weatherData.name;
    card.appendChild(cityName);

    const temperature = document.createElement('div');
    temperature.textContent = `Температура: ${weatherData.main.temp} °C`;
    card.appendChild(temperature);

    const temperature_max = document.createElement('div');
    temperature_max.textContent = `max Температура: ${weatherData.main.temp_max} °C`;
    card.appendChild(temperature_max);

    const temperature_min = document.createElement('div');
    temperature_min.textContent = `min Температура: ${weatherData.main.temp_min} °C`;
    card.appendChild(temperature_min);

    const country = document.createElement('div');
    country.textContent = `Страна: ${weatherData.sys.country}`;
    card.appendChild(country);

    const wind = document.createElement('div');
    wind.textContent = `Ветер: ${weatherData.wind.speed} м/с`;
    card.appendChild(wind);

    const cloud = document.createElement('div');
    cloud.textContent = `Влажность: ${weatherData.clouds.all} %`;
    card.appendChild(cloud);

    weatherCardsContainer.appendChild(card);
  });
}

// Функция для сохранения полученных данных о погоде в LocalStorage
function saveWeatherDataToLocalStorage(weatherDataList) {
  localStorage.setItem('weatherDataList', JSON.stringify(weatherDataList));
}

// Функция для загрузки данных о погоде из LocalStorage
function loadWeatherDataFromLocalStorage() {
  const weatherDataList = JSON.parse(localStorage.getItem('weatherDataList'));

  if (weatherDataList) {
    showWeatherCards(weatherDataList);
  }
}

// Обработчик формы
document.querySelector('form').addEventListener('submit', async event => {
  event.preventDefault();

  const cities = event.target[0].value.split(',');

  const weatherDataList = [];

  for (const city of cities) {
    const weatherData = await getWeatherData(city.trim());

    if (weatherData.cod === '404') {
      alert(`Город "${city}" не найден`);
    } else {
      weatherDataList.push(weatherData);
    }
  }

  showWeatherCards(weatherDataList);
  saveWeatherDataToLocalStorage(weatherDataList);
});

// Загрузка сохраненных данных из LocalStorage при загрузке страницы
loadWeatherDataFromLocalStorage();