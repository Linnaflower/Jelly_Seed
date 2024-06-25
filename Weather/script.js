const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchEnter = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

function execution(){
    const location_ary = document.querySelector('.search-box input').value.split(', ');
    //city, country format
    console.log("passed");
    return location_ary;
}
searchEnter.addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        event.preventDefault();
        search.click();
    }
});

search.addEventListener('click', () => {
    const location = execution();
    const city = location[0];
    const country = location[1];
    const APIKey = 'dbe8c6f70868701b623c00ba64edd2ee';
    
    if (city === '' && country === '') {
        console.log("no city provided");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${APIKey}`)
        .then(response => {
            console.log("City receieved");
            return response.json();
        })
        .then(json => {
            console.log("json recieved");

            if (json.cod === '404'){
                container.style.height = '400px';
                container.classList.remove('active');
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error.classList.add('active');
                return;
            }

            container.style.height = '555px';
            container.classList.add('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // console.log(json.weather[0].main);

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

            temperature.innerHTML =`${parseInt(json.main.temp)}<span>°F</span>`;
            description.innerHTML =`${json.weather[0].description}`;
            humidity.innerHTML =`${json.main.humidity}%`;
            wind.innerHTML =`${parseInt(json.wind.speed)}mp/h`;
    });
});