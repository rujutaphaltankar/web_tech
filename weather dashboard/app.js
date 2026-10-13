const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const output = document.getElementById("output");

const weatherData = {
    pune: {
        temperature: 29,
        humidity: 65,
        condition: "Partly Cloudy"
    },
    mumbai: {
        temperature: 31,
        humidity: 75,
        condition: "Sunny"
    },
    delhi: {
        temperature: 27,
        humidity: 55,
        condition: "Cloudy"
    }
};

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim().toLowerCase();

    if (city === "") {
        output.textContent = "Please enter a city name.";
        return;
    }

    output.textContent = "Loading weather data...";

    setTimeout(function () {
        const weather = weatherData[city];

        if (weather) {
            output.innerHTML = `
                <h2>${cityInput.value.trim()}</h2>
                Temperature: ${weather.temperature}°C<br>
                Humidity: ${weather.humidity}%<br>
                Condition: ${weather.condition}
            `;
        } else {
            output.textContent =
                "Error: Weather data not available for this city.";
        }
    }, 500);
});
