export function weather(element) {
  const elements = {
    city: document.getElementById('city'),
    searchB: document.getElementById('search'),
    weatherF: document.getElementById('weatherForm'),
    weatherR: document.getElementById('result'),
    countdown: document.getElementById('countdown'),
    update: document.getElementById('update'),
  };

  let countdown = 120;
  let timer;

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c0f73a2bd08b4f2686f104216242805&q=${city}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  const displayWeather = (city, data) => {
    elements.weatherR.textContent = '';
    const weatherR = document.createElement('div');

    if (data && data.current) {
      const { temp_c, condition, is_day } = data.current;

      const cityHeading = document.createElement('h2');
      cityHeading.textContent = `Weather in: ${city}`;
      cityHeading.className = "text-2xl font-bold mb-2";

      const tempParagraph = document.createElement('p');
      tempParagraph.textContent = `Temperature: ${temp_c}°C`;
      tempParagraph.className = "text-lg mb-2";

      const conditionImg = document.createElement('img');
      conditionImg.src = condition.icon;
      conditionImg.alt = condition.text;
      conditionImg.className = "w-16 h-16 mb-2";

      const conditionParagraph = document.createElement('span');
      conditionParagraph.textContent = ` ${condition.text}`;
      conditionParagraph.className = "text-lg mb-2";

      const dayNightParagraph = document.createElement('span');
      dayNightParagraph.textContent = is_day ? 'Day' : 'Night';
      dayNightParagraph.className = "text-lg mb-2";

      weatherR.append(cityHeading, tempParagraph, conditionImg, conditionParagraph, dayNightParagraph);
      weatherR.className = 'flex flex-col items-start';
      elements.weatherR.appendChild(weatherR);
    } else {
      const errorParagraph = document.createElement('p');
      errorParagraph.textContent = 'City not found. Please try again.';
      errorParagraph.className = "text-red-500";
      elements.weatherR.appendChild(errorParagraph);
    }
  };

  const updateWeather = async () => {
    const city = elements.city.value.trim();
    if (!city) return;

    const data = await fetchWeatherData(city);
    displayWeather(city, data);
    elements.searchB.disabled = false;
  };

  const startCountdown = () => {
    clearInterval(timer);
    countdown = 120;
    timer = setInterval(() => {
      elements.countdown.textContent = --countdown;
      if (countdown <= 0) {
        updateWeather();
        countdown = 120;
      }
    }, 1000);
  };

  elements.city.addEventListener('input', () => {
    elements.searchB.disabled = !elements.city.value.trim();
  });

  elements.weatherF.addEventListener('submit', (e) => {
    e.preventDefault();
    updateWeather();
    startCountdown();
  });

  elements.update.addEventListener('click', () => {
    updateWeather();
    startCountdown();
  });

  startCountdown();
}
