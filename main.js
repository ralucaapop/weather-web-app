
const  renderForecastCard = (date, maxTemp, minTemp, img_src) =>{
  return `
      
    <span class="date">${date}</span>
  
    <img class="day_img" src=${img_src} alt=""></img>
        
    <div class="detail-item">
      <span class="maxT">${maxTemp}/</span>
      <span class="minT">${minTemp}</span>
    </div>
  
  `
  }
function renderLocation(location){
  return`
  <h2 class="location">${location}</h2>
  `
}

function renderTemp(temperature){
  return`
  <h2 class="temperature">${temperature}°C</h2>
  `
}


function renderHourCard(hour, img_source, degree, rain){
  return`
  <h3 class="hour">${hour}</h3>
  <img class="small_img" src=${img_source} alt="img"></img>
  <h3 class="degree">${degree}°C</h3>
  <div class="rain_div">
    <img class="rain_drop_img" src="./imgs/water-drop.png" alt=""></img>
    <h3 class="rain">${rain}%</h3>
  </div>
  `
}

const renderImg = (imgSoruce) =>{
  return`
  <img class="big_img" src=${getWeatherIcon(imgSoruce)} alt=""></img>
  `
}

const renderDayDetails = (humidity, maxTemp, minTemp, prep, windspeed, sunrise, sunset, pressure, real_feel, uvindex, feelsLikeMin, feelsLikeMax)=>{
  return`
  <div class="content">
  <div class="right-details">
    <div class="realFeel">
      <img class="real_feel_img" src="./imgs/thermometer.png" alt=""></img>
      <div class="vertical-items">
        <p class="text">Real Feel</p>
        <p class="text-val">${real_feel}</p>
      </div>
    </div>

    <div class="windspeed">
      <img class="wind_img" src="./imgs/wind.png" alt=""></img>
      <div class="vertical-items">
        <p class="text">Windspeed</p>
        <p class="text-val">${windspeed}</p>
      </div>
    </div>

    <div class="maxTemp">
      <p class="text">Max Temperature</p>
      <p class="text-val">${maxTemp}°C</p>
    </div>

    <div class="minTemp">
      <p class="text">Min Temperature</p>
      <p class="text-val">${minTemp}°C</p>
    </div>

  </div>


    <div class="left-details">
      <div class="sunrise">
        <img class="sunrise_img" src="./imgs/sunrise.png" alt=""></img>
        <div class="vertical-items">
          <p class="text">Sunrise</p>
          <p class="text-val">${sunrise}</p>
        </div>
      </div>

      <div class="sunset">
        <img class="sunset_img" src="./imgs/sunset.png" alt=""></img>
        <div class="vertical-items">
          <p class="text">Sunset</p>
          <p class="text-val">${sunset}</p>
        </div>
      </div>

      <div class="humidity">
        <p class="text">Humidity</p>
        <p class="text-val">${humidity}</p>
      </div>

      <div class="pressure">
        <p class="text">Pressure</p>
        <p class="text-val">${pressure}</p>
      </div>
    </div>

    <div class="another">
      <div class="prep">
        <img class="prep_img" src="./imgs/drop.png" alt=""></img>
        <div class="vertical-items">
          <p class="text">Precipitations</p>
          <p class="text-val">${prep}%</p>
        </div>
      </div>

      <div class="uvindex">
        <img class="uvindex_img" src="./imgs/uv.png" alt=""></img>
        <div class="vertical-items">
          <p class="text">uvindex</p>
          <p class="text-val">${uvindex}</p>
        </div>
      </div>

      <div class="feelsLikeMax">
        <p class="text">Feels like max</p>
        <p class="text-val">${feelsLikeMax}°C</p>
      </div>

      <div class="feelsLikeMin">
        <p class="text">Feels like min</p>
        <p class="text-val">${feelsLikeMin}°C</p>
      </div>

    </div>
  </div>
  `
}

  const getWeatherIcon = (icon_type) =>{
    if(icon_type === "clear-day")
      return "./imgs/sun.png"
    else if(icon_type === "clear-night")
      return "./imgs/moon-clear.png"
    else if(icon_type === "partly-cloudy-day")
      return "./imgs/cloudy-day.png"
    else if(icon_type === "partly-cloudy-night")
      return "./imgs/cloud_night.png"
    else if(icon_type === "snow")
      return "./imgs/snow.png"
    else if(icon_type === "rain")
      return "./imgs/rain.png"
    else if(icon_type === "fog")
      return "./imgs/fog.png"
    else if(icon_type === "wind")
      return "./imgs/wind-big.png"
    else if(icon_type === "cloudy")
      return "./imgs/cloud.png"
  
  }

  const getForecast= async () => {
  const res = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Timisoara?unitGroup=metric&key=JLXM8JFV8VGCQ3MNEX8CSGS38&contentType=json')

  //console.log(res)
  const json = await res.json()
 

  return json
}

const convertTime = (time) =>{
  const hour = time.split(":")[0] +":"+ time.split(":")[1];
  return hour
}

const convertDate = (time) =>{
  const date = time.split("-")[2] +"/"+ time.split("-")[1];
  return date
}

const getDayInfo = async () => {
  const all_info = await getForecast();
  const day_weather_vertical = document.querySelector('.day_weather_vertical')
  const forecast_hours = document.querySelector(".cards-hours")
  const day_weather = document.querySelector(".day_weather")
  
  const today_info = all_info.days[0]
  const current_conditions = all_info.currentConditions

  const location = all_info.resolvedAddress
  const temperature = current_conditions.temp
  const hours = today_info.hours

  const locationElement = renderLocation(location)
  const tempElement = renderTemp(temperature)

  day_weather_vertical.innerHTML += locationElement
  day_weather_vertical.innerHTML += tempElement

  day_weather.innerHTML += renderImg(current_conditions.icon)

  hours.forEach((hourObject) => {
  const hourCard = document.createElement('div')
  hourCard.classList.add('hour_card')
  hourCard.innerHTML = renderHourCard(convertTime(hourObject.datetime),getWeatherIcon(hourObject.icon), hourObject.temp, hourObject.precipprob )
  forecast_hours.appendChild(hourCard)

  })
}

const getDayDetails = async()=>{

  const all_info = await getForecast();
  const other_details_day_forecast = document.querySelector('.other_details_day_forecast')
  const current_conditions = all_info.currentConditions

  const today_info = all_info.days[0]

  const other_details_div = document.createElement('div')
  other_details_div.innerHTML = renderDayDetails(current_conditions.humidity, today_info.tempmax, today_info.tempmin, today_info.precipprob, today_info.windspeed, convertTime(current_conditions.sunrise), convertTime(current_conditions.sunset), current_conditions.pressure, current_conditions.feelslike, today_info.uvindex, today_info.feelslikemin, today_info.feelslikemax)
  other_details_day_forecast.appendChild(other_details_div)

}

const getNextDays = async()=>{
  const json = await getForecast();
  const container = document.querySelector('.wather_days_cards')
  
  json.days.forEach((dayObject) => {

  const minTemp = dayObject.tempmin
  const maxTemp = dayObject.tempmax
  const datetime = dayObject.datetime
  const weather_icon = getWeatherIcon(dayObject.icon)

  const dayCard = document.createElement('div')
  dayCard.classList.add('card')
  dayCard.innerHTML = renderForecastCard(convertDate(datetime), maxTemp, minTemp, weather_icon)
  container.appendChild(dayCard)
})
}


(async () => {
  await getDayInfo();
  await getDayDetails();
  await getNextDays();
})();

