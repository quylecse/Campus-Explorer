async function fetchWeather() {

    let weatherElement = document.getElementById('weather-widget');

    let jsonData = await fetch('https://wttr.in/Hanover?format=j1&lang=de');
    let jsonObject = await jsonData.json();
    //const jsonObject = JSON.parse(jsonText);

    let weatherData = new WeatherData(jsonObject);
    //weatherData.constructor(jsonObject);

    console.log(weatherData);

    let weatherText =
        [
            `
            <h2>Wetter</h2>
            <p>
                Neben den informativen Inhalten bietet die Website auch aktuelle Wetterinformationen.
            </p>
            <br>
            <ul>
                <li> Aktuelles Wetter in ${weatherData.city}, ${weatherData.country}:</li>
                <li> ${weatherData.currentWeatherDesc} </li>
                <li> 🌡️Temperatur: ${weatherData.temperature[0][0]}°C </li>
                <li> 🌬️Windgeschwindigkeit: ${weatherData.windspeedKmph[0][0]}km/h </li>
                <li> 🌧️Regenwahrscheinlichkeit: ${weatherData.chanceofrain[0][0]}% </li>
            </ul>
            <p> Mehr Features kommen!</p>
        `
        ]
    weatherElement.innerHTML = weatherText;

}

//weatherData.city = jsonObject.nearest_area[0].areaName[0].value;
//weatherData.temperature[0] = jsonObject.weather[0].hourly[0];
//weatherData.cloudCover[0] = jsonObject.current_condition[0].cloudcover;

class WeatherData {

    constructor(jsonObject) {
        this.city = jsonObject.nearest_area[0].areaName[0].value;
        this.state = jsonObject.nearest_area[0].region[0].value;
        this.country = jsonObject.nearest_area[0].country[0].value;
        this.observationTime = jsonObject.current_condition[0].localObsDateTime;
        this.currentWeatherDesc = jsonObject.current_condition[0].lang_de[0].value;
        this.date = [];
        this.avgtempC = [];
        this.maxtempC = [];
        this.mintempC = [];
        this.uvIndex = [];
        this.sunHour = [];
        this.temperature = [];
        this.temperatureFeelsLike = [];
        this.windspeedKmph = [];
        this.winddirDegree = [];
        this.weatherCondition = [];
        this.cloudcover = [];
        this.chanceofrain = [];
        this.humidity = [];
        this.uvIndexHourly = [];

        for (const [i, daily] of jsonObject.weather.entries()) {

            this.date[i] = daily.date;
            this.avgtempC[i] = daily.avgtempC;
            this.maxtempC[i] = daily.maxtempC;
            this.mintempC[i] = daily.mintempC;
            this.uvIndex[i] = daily.uvIndex;
            this.sunHour[i] = daily.sunHour;
            this.temperature[i] = [];
            this.temperatureFeelsLike[i] = [];
            this.windspeedKmph[i] = [];
            this.weatherCondition[i] = [];
            this.cloudcover[i] = [];
            this.chanceofrain[i] = [];
            this.humidity[i] = [];
            this.uvIndexHourly[i] = [];
            this.winddirDegree[i] = [];

            for (const [j, hourly] of daily.hourly.entries()) {

                this.temperature[i][j] = hourly.tempC;
                this.temperatureFeelsLike[i][j] = hourly.FeelsLikeC;
                this.windspeedKmph[i][j] = hourly.windspeedKmph;
                this.weatherCondition[i][j] = hourly.lang_de[0].value;
                this.cloudcover[i][j] = hourly.cloudcover;
                this.chanceofrain[i][j] = hourly.chanceofrain;
                this.humidity[i][j] = hourly.humidity;
                this.uvIndexHourly[i][j] = hourly.uvIndex;
                this.winddirDegree[i][j] = hourly.winddirDegree;
            }
        }
    }
}
