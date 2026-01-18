const output=document.getElementById('output');
const button=document.getElementById("btn1");
const val=document.getElementById("username").value;
//let cordurl="http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid=81ab662082b3b2bf5b192d6313f5bcbe";
//let weather_url="https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=81ab662082b3b2bf5b192d6313f5bcbe";
//let lat="";
//let lon="";
//let state="";
//let country="";
// get the  cordinates
const get_Input=()=>{
const val=document.getElementById("username").value;
const capitalize = str => str[0].toUpperCase() + str.slice(1);
Cord(capitalize(val));

}
//get weather
const get_Weather=(lat,lon,state,country,va)=>{
let w_url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=81ab662082b3b2bf5b192d6313f5bcbe`;
(async function(){
let a=await fetch(w_url);
let data=await a.json();
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



const Cord=(va)=>{
    let cordurl=`http://api.openweathermap.org/geo/1.0/direct?q=${va}&limit=1&appid=81ab662082b3b2bf5b192d6313f5bcbe`;
    fetch(cordurl).then((e)=>{
    return e.json();}
    ).then((e)=>{
    let lat=e[0].lat;
    let lon=e[0].lon;
    let state=e[0].state;
    let country=e[0].country;
    // console.log(e);
    get_Weather(lat,lon,state,country,va);
    })
    .catch((e)=>{
        output.innerHTML="Some error occured";
    })
}

button.addEventListener("click",get_Input);
document.getElementById("username").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
     event.preventDefault();  
    get_Input();
  }
});