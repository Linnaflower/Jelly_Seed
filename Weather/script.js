const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = 'dbe8c6f70868701b623c00ba64edd2ee';
    const city = document.querySelector('.search-box input').value;
    if (city == '') {
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/sunny.png';
                    break;
                case 'Rain':
                    image.src = 'images/rainy.png';
                    break;
                case 'Snow':
                    image.src = 'images/snowing.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloudy.png';
                    break;
                case 'Mist':
                    image.src = 'images/hazyfoggy.png';
                    break;
                case 'Haze':
                    image.src = 'images/hazyfoggy.png';
                    break;
                default:
                    image.src = 'images/cloudy.png';
                    break;
            }

    });
});