function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    }); 
    document.getElementById("clock").textContent = time;
}

async function getWeather(){
    const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=38.8114&longitude=-89.9532&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,sunset,sunrise,precipitation_probability_max&hourly=precipitation_probability,precipitation,rain,showers,snowfall&models=ncep_gfs_seamless&current=temperature_2m,apparent_temperature&timezone=America%2FChicago&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    );

    const data = await response.json();
    document.getElementById("ctemperature").textContent = data.current.temperature_2m + "°F";
    
    const code = data.daily.weather_code;
    console.log("Weather code:", code);
    const jresponse = await fetch("weather-codes.json");
    console.log("Json response:", jresponse);
    const valuelist = await jresponse.json();
    console.log(("Weather codes:", valuelist));
    const description = valuelist[code];
    console.log("description:", description)
    document.getElementById("desctemperature").textContent = description;
    
    document.getElementById("ftemperature").textContent = data.current.apparent_temperature;
    document.getElementById("mintemperature").textContent = data.daily.temperature_2m_min;
    document.getElementById("maxtemperature").textContent = data.daily.temperature_2m_max;
    document.getElementById("raintemperature").textContent = data.daily.precipitation_probability_max;
    }


function getGreeting(){
    
}

const developmentMode = false;

updateClock();
if (!developmentMode){
    getWeather();
}

setInterval(updateClock, 1000);
setInterval(getWeather, 600000); /*ever y10 minutes*/
