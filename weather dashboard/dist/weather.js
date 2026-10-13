"use strict";
// Validate configuration using satisfies
const config = {
    appName: "Weather Dashboard",
    defaultCity: "Pune",
    unit: "Celsius"
};
// Generic response creation function
function createResponse(data) {
    return {
        status: "success",
        data: data
    };
}
// DOM elements with proper types
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const output = document.getElementById("output");
// Sample weather data
const weatherData = {
    pune: {
        city: "Pune",
        temperature: 29,
        humidity: 65,
        condition: "Partly Cloudy"
    },
    mumbai: {
        city: "Mumbai",
        temperature: 31,
        humidity: 75,
        condition: "Sunny"
    },
    delhi: {
        city: "Delhi",
        temperature: 27,
        humidity: 55,
        condition: "Cloudy"
    }
};
// Display API response safely
function displayWeather(response) {
    if (response.status === "loading") {
        output.textContent = "Loading weather data...";
    }
    else if (response.status === "success") {
        const weather = response.data;
        output.innerHTML = `
            <h2>${weather.city}</h2>
            Temperature: ${weather.temperature}°C<br>
            Humidity: ${weather.humidity}%<br>
            Condition: ${weather.condition}
        `;
    }
    else {
        output.textContent = "Error: " + response.message;
    }
}
// Simulate fetching weather information
async function fetchWeather(city) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const weather = weatherData[city.toLowerCase()];
    if (!weather) {
        return {
            status: "error",
            message: "Weather data not available for this city."
        };
    }
    return createResponse(weather);
}
// Handle the search button
async function handleSearch() {
    const city = cityInput.value.trim();
    if (city === "") {
        displayWeather({
            status: "error",
            message: "Please enter a city name."
        });
        return;
    }
    displayWeather({ status: "loading" });
    const response = await fetchWeather(city);
    displayWeather(response);
}
searchBtn.addEventListener("click", () => {
    void handleSearch();
});
// Allow Enter key to search
cityInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        void handleSearch();
    }
});
console.log(config.appName);
