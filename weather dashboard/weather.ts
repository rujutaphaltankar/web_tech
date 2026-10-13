interface WeatherData {
    city: string;
    temperature: number;
    humidity: number;
    condition: string;
}

// Configuration interface
interface WeatherConfig {
    appName: string;
    defaultCity: string;
    unit: "Celsius" | "Fahrenheit";
}

// Validate configuration using satisfies
const config = {
    appName: "Weather Dashboard",
    defaultCity: "Pune",
    unit: "Celsius"
} satisfies WeatherConfig;

// Discriminated union for API states
type ApiState<T> =
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; message: string };

// Generic response creation function
function createResponse<T>(data: T): ApiState<T> {
    return {
        status: "success",
        data: data
    };
}

// DOM elements with proper types
const cityInput = document.getElementById(
    "cityInput"
) as HTMLInputElement;

const searchBtn = document.getElementById(
    "searchBtn"
) as HTMLButtonElement;

const output = document.getElementById(
    "output"
) as HTMLDivElement;

// Sample weather data
const weatherData: Record<string, WeatherData> = {
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
function displayWeather(
    response: ApiState<WeatherData>
): void {
    if (response.status === "loading") {
        output.textContent = "Loading weather data...";
    } else if (response.status === "success") {
        const weather = response.data;

        output.innerHTML = `
            <h2>${weather.city}</h2>
            Temperature: ${weather.temperature}°C<br>
            Humidity: ${weather.humidity}%<br>
            Condition: ${weather.condition}
        `;
    } else {
        output.textContent = "Error: " + response.message;
    }
}

// Simulate fetching weather information
async function fetchWeather(
    city: string
): Promise<ApiState<WeatherData>> {
    await new Promise<void>(resolve =>
        setTimeout(resolve, 500)
    );

    const weather = weatherData[city.toLowerCase()];

    if (!weather) {
        return {
            status: "error",
            message: "Weather data not available for this city."
        };
    }

    return createResponse<WeatherData>(weather);
}

// Handle the search button
async function handleSearch(): Promise<void> {
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
