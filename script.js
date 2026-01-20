const val = document.getElementById("place").value;
const output = document.getElementById('output');
const button = document.getElementById("btn1");

const getInput = () => {
  const val = document.getElementById("place").value;
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  putCords(capitalize(val));
}

const getWeather = (lat, lon, state, country, va) => {
  let wUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=81ab662082b3b2bf5b192d6313f5bcbe`;
  (async function () {
    let data = await fetch(wUrl);
    data = await data.json();
    output.innerHTML = `
    <pre>
      <h3>Weather in ${data.name},${va},${state}, ${data.sys.country}</h3>
      <p>Condition: ${data.weather[0].main} (${data.weather[0].description})</p>
      <p>Temperature: ${(data.main.temp - 273.15).toFixed(1)} °C</p>
      <p>Feels Like: ${(data.main.feels_like - 273.15).toFixed(1)} °C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Pressure: ${data.main.pressure} hPa</p>
      <p>Wind: ${data.wind.speed} m/s (from ${data.wind.deg}°)</p>
      <p>Visibility: ${data.visibility} m</p>
    </pre>
    `;
  })();
}

const putCords = (va) => {
  let cordurl = `https://api.openweathermap.org/geo/1.0/direct?q=${va}&limit=1&appid=81ab662082b3b2bf5b192d6313f5bcbe`;
  fetch(cordurl).then((e) => {
    return e.json();
  }).then((e) => {
    let lat = e[0].lat;
    let lon = e[0].lon;
    let state = e[0].state;
    let country = e[0].country;
    getWeather(lat, lon, state, country, va);
  })
    .catch((e) => {
      output.innerHTML = "No data found for " + va;
    })
}

const redirect = () => {
  window.open("https://github.com/Shantnu01/Weather-App", "_blank");
}

button.addEventListener("click", getInput);
document.getElementById("place").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getInput();
  }
});

const modeToggle = document.getElementById('dn');
const body = document.body;

modeToggle.addEventListener('change', () => {
    if (!modeToggle.checked) {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// Optional: Check for saved user preference on page load
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        modeToggle.checked = true;
        body.classList.add('light-mode');
    }
};