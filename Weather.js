const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
    }
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { main, weather, wind } = data;
    weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}
