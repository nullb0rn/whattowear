function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = "72de30a3473f6369498e538ba162b6a1";

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const temp = data.main.temp;
          const condition = data.weather[0].description;
          document.getElementById("weather").innerText = `🌡️ Temperature: ${temp}°C, ${condition}`;
          document.getElementById("suggestion").innerText = clothingSuggestion(temp, condition);
        })
        .catch(error => {
          document.getElementById("weather").innerText = "⚠️ Could not load weather data.";
          console.error(error);
        });
    }, () => {
      alert("📍 Please allow location access.");
    });
  } else {
    alert("🌐 Geolocation is not supported by this browser.");
  }
}

function clothingSuggestion(temp, condition) {
  if (temp >= 30) return "🥵 It's hot! Wear a t-shirt and shorts.";
  if (temp >= 20) return "😎 Great weather! A light shirt will do.";
  if (temp >= 10) return "🧥 A bit cool, wear a jacket.";
  if (temp > 0) return "❄️ Cold weather! Bundle up.";
  return "🥶 Freezing! Coat, hat, scarf — the full armor!";
}
