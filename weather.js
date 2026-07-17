/**
 * AuraPortfolio - Weather Widget Logic (OpenWeatherMap API)
 * 
 * Sourced securely from CONFIG.WEATHER_API_KEY or localStorage.
 * Handles fetching, rendering, loading, settings inputs, and error fallbacks.
 * Includes a global search filter for cities.
 */

document.addEventListener('DOMContentLoaded', () => {
  const widgetContainer = document.getElementById('weather-widget');
  if (!widgetContainer) return;

  let currentCity = "Da Nang";

  const getApiKey = () => {
    // 1. Check CONFIG.WEATHER_API_KEY from config.js
    if (typeof CONFIG !== 'undefined' && CONFIG.WEATHER_API_KEY) {
      return CONFIG.WEATHER_API_KEY.trim();
    }
    // 2. Check localStorage setting
    return localStorage.getItem('weather_api_key');
  };

  const saveApiKey = (key) => {
    localStorage.setItem('weather_api_key', key.trim());
  };

  const clearApiKey = () => {
    localStorage.removeItem('weather_api_key');
  };

  // Main Weather Loader
  async function loadWeather(cityName) {
    const apiKey = getApiKey();

    if (!apiKey) {
      renderSetupForm("Enter your OpenWeatherMap API Key to activate live weather reporting 🌸");
      return;
    }

    // Ensure the main widget container has search bar framework
    ensureWidgetLayout();
    renderContentLoading();

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`);
      
      if (!response.ok) {
        const errorData = await response.json();
        // If API key is unauthorized, reset and trigger key screen
        if (response.status === 401) {
          clearApiKey();
          throw new Error("unauthorized");
        }
        throw new Error(errorData?.message || "City not found. Please try again.");
      }

      const data = await response.json();
      currentCity = cityName;
      renderWeather(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
      if (error.message === "unauthorized") {
        renderSetupForm("Your API Key appears to be invalid or has expired. Please enter a valid OpenWeatherMap API Key:");
      } else {
        let cleanErr = error.message;
        if (cleanErr.toLowerCase().includes("city not found") || cleanErr.toLowerCase().includes("not found")) {
          cleanErr = "City not found. Please try again.";
        }
        renderContentError(cleanErr);
      }
    }
  }

  // Ensures layout structure containing search input exists in the widget card
  function ensureWidgetLayout() {
    if (widgetContainer.querySelector('.weather-widget-inner')) return;

    widgetContainer.innerHTML = `
      <div class="weather-widget-inner">
        <div class="weather-search-box">
          <form id="weather-search-form" class="weather-search-form">
            <input type="text" id="weather-search-input" placeholder="Search city (e.g. Seoul, Tokyo, Paris)..." required autocomplete="off">
            <button type="submit" class="weather-search-btn">Search 🔍</button>
            <button type="button" id="weather-settings-btn" class="weather-settings-btn" title="API Settings" aria-label="Weather Settings">⚙️</button>
          </form>
        </div>
        <div id="weather-content" class="weather-content-area"></div>
      </div>
    `;

    // Bind search form submit
    const form = document.getElementById('weather-search-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchInput = document.getElementById('weather-search-input');
      const val = searchInput.value.trim();
      if (val) {
        loadWeather(val);
      }
    });

    // Bind settings button
    document.getElementById('weather-settings-btn').addEventListener('click', () => {
      const contentArea = document.getElementById('weather-content');
      if (!contentArea) return;

      contentArea.innerHTML = `
        <div class="weather-settings-overlay fade-in">
          <h4>Weather Settings ⚙️</h4>
          <p>You are using a custom saved API key.</p>
          <div class="weather-settings-actions">
            <button id="weather-reset-key" class="btn btn-secondary btn-block">Clear Saved Key 🗑️</button>
            <button id="weather-back-to-widget" class="btn btn-primary btn-block">Back to Weather 🌤️</button>
          </div>
        </div>
      `;

      document.getElementById('weather-reset-key').addEventListener('click', () => {
        clearApiKey();
        // Clear layout and reload (will trigger setup form)
        widgetContainer.innerHTML = '';
        loadWeather(currentCity);
      });

      document.getElementById('weather-back-to-widget').addEventListener('click', () => {
        loadWeather(currentCity);
      });
    });
  }

  function renderContentLoading() {
    const contentArea = document.getElementById('weather-content');
    if (contentArea) {
      contentArea.innerHTML = `
        <div class="weather-loading fade-in">
          <div class="weather-spinner"></div>
          <p>Gathering live weather reports...</p>
        </div>
      `;
    }
  }

  function renderContentError(message) {
    const contentArea = document.getElementById('weather-content');
    if (contentArea) {
      contentArea.innerHTML = `
        <div class="weather-error-card fade-in">
          <span class="weather-error-icon">⚠️</span>
          <h3>Query Failed</h3>
          <p class="weather-error-desc">${message}</p>
          <button id="weather-retry" class="btn btn-secondary">Retry 🔄</button>
        </div>
      `;
      document.getElementById('weather-retry').addEventListener('click', () => {
        loadWeather(currentCity);
      });
    }
  }

  function renderSetupForm(message) {
    widgetContainer.innerHTML = `
      <div class="weather-setup-card fade-in">
        <div class="weather-setup-header">
          <span class="weather-setup-icon">🌤️</span>
          <h3>Activate Weather Widget</h3>
        </div>
        <p class="weather-setup-desc">${message}</p>
        <form id="weather-key-form" class="weather-setup-form">
          <input type="text" id="weather-api-input" placeholder="Paste your API Key here..." required autocomplete="off">
          <button type="submit" class="btn btn-primary">Save Key 🔑</button>
        </form>
        <p class="weather-setup-note">Get a free key at <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">openweathermap.org</a>.</p>
      </div>
    `;

    document.getElementById('weather-key-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('weather-api-input').value;
      if (val) {
        saveApiKey(val);
        loadWeather(currentCity);
      }
    });
  }

  function renderWeather(data) {
    const contentArea = document.getElementById('weather-content');
    if (!contentArea) return;

    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const windSpeedKph = Math.round(data.wind.speed * 3.6);
    
    const condition = data.weather[0];
    const rawCond = condition.main;
    const condDesc = condition.description.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
    const weatherId = condition.id;

    // Formatting Location name - replacing French colonial database name 'Turan' with 'Da Nang'
    let cleanName = data.name;
    if (cleanName.toLowerCase() === "turan") {
      cleanName = "Da Nang";
    }
    let countryName = data.sys.country;
    if (countryName === "VN") {
      countryName = "Vietnam";
    }

    const getConditionEmoji = (id) => {
      if (id >= 200 && id < 300) return "⛈️";
      if (id >= 300 && id < 600) return "🌧️";
      if (id >= 600 && id < 700) return "❄️";
      if (id >= 700 && id < 800) return "🌫️";
      if (id === 800) return "☀️";
      if (id > 800) return "☁️";
      return "🌤️";
    };

    const emoji = getConditionEmoji(weatherId);

    contentArea.innerHTML = `
      <div class="weather-display-card fade-in">
        <div class="weather-main-row">
          <div class="weather-condition-box">
            <div class="weather-icon-circle animate-float">
              <img src="${iconUrl}" alt="${rawCond}" class="weather-condition-img">
              <span class="weather-emoji">${emoji}</span>
            </div>
            <span class="weather-condition-text">${condDesc}</span>
          </div>
          
          <div class="weather-temp-box">
            <span class="weather-temp">${temp}</span>
            <span class="weather-unit">°C</span>
          </div>
        </div>

        <div class="weather-meta-row">
          <div class="weather-meta-item">
            <span class="weather-meta-label">Location</span>
            <span class="weather-meta-value">${cleanName}, ${countryName}</span>
          </div>
          <div class="weather-meta-item">
            <span class="weather-meta-label">Humidity</span>
            <span class="weather-meta-value">${humidity}%</span>
          </div>
          <div class="weather-meta-item">
            <span class="weather-meta-label">Wind Speed</span>
            <span class="weather-meta-value">${windSpeedKph} km/h</span>
          </div>
        </div>
      </div>
    `;
  }

  // Auto trigger load on page load
  loadWeather(currentCity);
});
