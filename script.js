
const input = document.querySelector(".barfind");
const button = document.querySelector(".btnfind");
const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".desc");
const humidityEl = document.querySelector(".doam .value");
const windEl = document.querySelector(".gio .value");
const pressureEl = document.querySelector(".apsuat .value");

function getDescription(code) {
    if (code === 0) return "Trời quang";
    if (code <= 3) return "Có mây";
    if (code <= 48) return "Sương mù";
    if (code <= 57) return "Mưa phùn";
    if (code <= 67) return "Mưa";
    if (code <= 77) return "Tuyết";
    if (code <= 82) return "Mưa rào";
    if (code <= 99) return "Dông";
    return "Không rõ";
}

async function getWeather(cityName) {
    try {

        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=vi`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results) {
            alert("Thành phố nhập vào không hợp lệ!");
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];


        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,weather_code&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        const current = weatherData.current;

        cityEl.textContent = `${name}, ${country}`;
        tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
        descEl.textContent = getDescription(current.weather_code);
        humidityEl.textContent = `${current.relative_humidity_2m}%`;
        windEl.textContent = `${current.wind_speed_10m} km/h`;
        pressureEl.textContent = `${Math.round(current.surface_pressure)} hPa`;
    } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra, vui lòng thủ lại hoặc kiểm tra Internet!");
    }
}

button.addEventListener("click", () => {
    const city = input.value.trim();
    if (city !== "") getWeather(city);
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") button.click();
});

getWeather("Tuy Hoa");