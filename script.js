document.getElementById('search-button').addEventListener('click', function() {
    const location = document.getElementById('location-input').value.trim();
    const apiKey = 'dccdf2543ebd10e73719fe605e703a8a'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    // Clear previous data
    document.getElementById('city-name').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('description').textContent = '';
    document.getElementById('weather-icon').style.display = 'none';
    document.getElementById('error-message').textContent = '';

    if (location === "") {
        document.getElementById('error-message').textContent = "Please enter a location.";
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
            document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById('weather-icon').style.display = 'block';
        })
        .catch(error => {
            document.getElementById('error-message').textContent = error.message;
        });
});
