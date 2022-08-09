'use strict';
let API_KEY = '9a78c66068f1e75494cd433aed9624df';
const hourlyWeatherInfo = document.querySelector('.hourly_weather_info');
const daysForecast = document.querySelector('.days_forecast');
const cityInput = document.querySelector('#findCity');
const searchBtn = document.querySelector('#searchBtn');
const cityName = document.querySelector('.city_name');
const currDate = document.querySelector('.currDate');
const currState = document.querySelector('.currState_info');
const currStateImg = document.querySelector('.currState_img');
const currTemepratureInfo = document.querySelector('.currTemeprature_info')
const minTemp = document.querySelector('#sunrise');
const maxTemp = document.querySelector('#sunset');
const windSpeed = document.querySelector('#wind_speed');
const currDay = document.querySelector('.curr_day');
const currFeelings = document.querySelector('.curr_feelings');
const hourlyRealFeel = document.querySelector('.hourly_real_feels');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const duration = document.querySelector('#duration')
const tablinks = document.querySelector('.weather_blocks-row')
let lon;
let lat;

window.addEventListener('load', function(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${API_KEY}&units=metric`)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        let date = getDate();
        console.log(date);
        currDate.innerHTML = `${date}`;
        currState.innerHTML = `${data.weather[0].description}`;
        currStateImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> `
        currTemepratureInfo.innerHTML = `${data.main.temp}&#8451`;
        currFeelings.innerHTML = `Real Feel: ${data.main.feels_like}&#8451`
        minTemp.innerHTML = `${data.main.temp_min}&#8451`;
        maxTemp.innerHTML = `${data.main.temp_max}&#8451` ;
        currDay.innerHTML = `Today`;
        sunrise.innerHTML = `${getHours(data.sys.sunrise)}`;
        sunset.innerHTML = `${getHours(data.sys.sunset)}`;
        
        // ********************************     Здесь *********************************** //
        lon = data.coord.lon
        lat = data.coord.lat
        return {
            lon: lon,
            lat: lat,
        }
    })
    .then(data => {
        const zoomLevel = 7;
        let siblingCoord = {
            lonLeft: data.lon - 2,
            latBottom: data.lat - 2,
            lonRight: data.lon + 2,
            latTop: data.lat + 2,
        }
        let {lonLeft, latBottom, lonRight, latTop} = siblingCoord;
        let strCoord = `${Math.round(lonLeft)},${Math.round(latBottom)},${Math.round(lonRight)},${Math.round(latTop)},${zoomLevel}`;
        console.log(strCoord);
        fetch(`https://api.openweathermap.org/data/2.5/box/city?bbox=${strCoord}&appid=${API_KEY}`)
        .then(cities => cities.json())
        .then(cities => {
            console.log(cities)
            nearbyCities(cities.list, 4)
        });
    })
    .then(data => {
        console.log(data);
        fetch (`https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&exclude=minutely,current,alerts&appid=${API_KEY}`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            createDailyWeatherBlocks(data.daily, 5, data)
            return data
        })
        
    })
    .then(data => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&appid=${API_KEY}`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            createBlocks(data.list, 6);
            return data})
        .then(data => {
            let cards = document.querySelectorAll(".day_interval")
            console.log(Array.from(cards));
            let arr = Array.from(cards);
            arr.forEach(card => {
                card.addEventListener('click', function(){
                    createSomething(data, arr.indexOf(card))
                })
            })
        })
    })
})

searchBtn.addEventListener('click', function(){
    
    const errorBlock = document.querySelector('.error_block')
    const main = document.querySelector('main')
    main.style.display = 'block'
    errorBlock.style.display='none'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${API_KEY}&units=metric`)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        let date = getDate();
        console.log(date);
        currDate.textContent = `${date}`;
        currState.textContent = `${data.weather[0].description}`;
        currTemepratureInfo.innerHTML = `${data.main.temp}&#8451`
        currFeelings.innerHTML = `Real Feel:${data.main.feels_like}&#8451`
        currStateImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> `
        minTemp.innerHTML = `${data.main.temp_min}&#8451` ;
        maxTemp.innerHTML = `${data.main.temp_max}&#8451` ;
        currDay.textContent = `Today`;
        // ********************************     Здесь *********************************** //
        lon = data.coord.lon
        lat = data.coord.lat
        return {
            lon: lon,
            lat: lat,
        }
    })
    .then(data => {
        const zoomLevel = 9;
        let siblingCoord = {
            lonLeft: data.lon - 2,
            latBottom: data.lat - 2,
            lonRight: data.lon + 2,
            latTop: data.lat + 2,
        }
        let {lonLeft, latBottom, lonRight, latTop} = siblingCoord;
        let strCoord = `${Math.round(lonLeft)},${Math.round(latBottom)},${Math.round(lonRight)},${Math.round(latTop)},${zoomLevel}`;
        console.log(strCoord);
        fetch(`https://api.openweathermap.org/data/2.5/box/city?bbox=${strCoord}&appid=${API_KEY}`)
        .then(cities => cities.json())
        .then(cities => {
            console.log(cities)
            nearbyCities(cities.list, 4)
        });
        return {
            lon: lon,
            lat: lat,
        }
    }) .then(data => {
        console.log(data);
        fetch (`https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&exclude=minutely,current,alerts&appid=${API_KEY}`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            createDailyWeatherBlocks(data.daily, 5, data)
        })
    })
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${API_KEY}`)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        createBlocks(data.list, 6);
        return data})
        .then(data => {
            let cards = document.querySelectorAll(".day_interval")
        console.log(Array.from(cards));
        let arr = Array.from(cards);
        arr.forEach(card => {
            card.addEventListener('click', function(){
                createSomething(data, arr.indexOf(card))
            })
        })
    })
    .catch(err => {
        main.style.display = 'none';
        errorBlock.style.display = 'flex';
        alert('not found')
    })
})

// ********************************     Здесь *********************************** //
function createSomething(data, index){
    console.log(data);
    console.log(index);
    switch (index){
        case 0:
            tablinks.innerHTML=''
                for (let j = 0; j <= 6; j++) {
                    let timeInterval = document.createElement("div");
                    timeInterval.className = "time_interval";
                    timeInterval.innerHTML = `
                    <div class="time_block">${getHours(data.list[j].dt)}
                    <div class = "img_block"> <img src="http://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"> </div> </div>
                    <div class="forecast_block">${data.list[j].weather[0].main} </div>
                    <div class="temp_block"> ${Math.round(data.list[j].main.temp - 273)}</div>
                    <div class="feel_block">${data.list[j].main.feels_like}</div>
                    <div class="wind_block >${(data.list[j].wind.speed * 3.6).toFixed(2)}</div>
                    `
                    tablinks.append(timeInterval);
                
            }; break;
        case 1:        
                tablinks.innerHTML='';
                for (let j = 10; j <= 16; j++) {
                    let timeInterval = document.createElement("div");
                    timeInterval.className = "time_interval";
                    timeInterval.innerHTML = `
                    <div class="time_block">${getHours(data.list[j].dt)}
                    <div class = "img_block"> <img src="http://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"> </div> </div>
                    <div class="forecast_block">${data.list[j].weather[0].main} </div>
                    <div class="temp_block"> ${Math.round(data.list[j].main.temp - 273)}</div>
                    <div class="feel_block">${data.list[j].main.feels_like}</div>
                    <div class="wind_block >${(data.list[j].wind.speed * 3.6).toFixed(2)}</div>
                    `
                    tablinks.append(timeInterval);
                }; break;
        case 2:        
        tablinks.innerHTML=''
                for (let j = 16; j <= 22; j++) {
                    let timeInterval = document.createElement("div");
                    timeInterval.className = "time_interval";
                    timeInterval.innerHTML = `
                    <div class="time_block">${getHours(data.list[j].dt)}
                    <div class = "img_block"> <img src="http://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"> </div> </div>
                    <div class="forecast_block">${data.list[j].weather[0].main} </div>
                    <div class="temp_block"> ${Math.round(data.list[j].main.temp - 273)}</div>
                    <div class="feel_block">${data.list[j].main.feels_like}</div>
                    <div class="wind_block >${(data.list[j].wind.speed * 3.6).toFixed(2)}</div>
                    `
                    tablinks.append(timeInterval);
                }; break;          
                case 3:
                    tablinks.innerHTML=''
                for (let j = 24; j <= 30; j++) {
                    let timeInterval = document.createElement("div");
                    timeInterval.className = "time_interval";
                    timeInterval.innerHTML = `
                    <div class="time_block">${getHours(data.list[j].dt)}
                    <div class = "img_block"> <img src="http://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"> </div> </div>
                    <div class="forecast_block">${data.list[j].weather[0].main} </div>
                    <div class="temp_block"> ${Math.round(data.list[j].main.temp - 273)}</div>
                    <div class="feel_block">${data.list[j].main.feels_like}</div>
                    <div class="wind_block >${(data.list[j].wind.speed * 3.6).toFixed(2)}</div>
                    `
                    tablinks.append(timeInterval);
                } break;
                case 4:
                    tablinks.innerHTML=''
                for (let j = 32; j <= 38; j++) {
                    let timeInterval = document.createElement("div");
                    timeInterval.className = "time_interval";
                    timeInterval.innerHTML = `
                    <div class="time_block">${getHours(data.list[j].dt)}
                    <div class = "img_block"> <img src="http://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png"> </div> </div>
                    <div class="forecast_block">${data.list[j].weather[0].main} </div>
                    <div class="temp_block"> ${Math.round(data.list[j].main.temp - 273)}</div>
                    <div class="feel_block">${data.list[j].main.feels_like}</div>
                    <div class="wind_block >${(data.list[j].wind.speed * 3.6).toFixed(2)}</div>
                    `
                    tablinks.append(timeInterval);
                }; break

    }

    
}
function createForecastBlocks (arr, index){
    const daysForecast = document.querySelector('.days_forecast');
    if (daysForecast.querySelectorAll('.day_forecast').length === 0){
        for (let i = 0; i < index; i++){
            const dayForecast = document.createElement('div');
            dayForecast.classList.add('day_forecast');
            daysForecast.innerHTML = `
            <p class = 'days_name'></p>
            <p class = 'forecast_data'></p>
            <div class = 'forecast_img'><img src = 'https://openweathermap.org/img/wn${arr[i].weather[0].icon}@2x.png'></div>
            <p class = 'forecast_temp'>${Math.round(arr[i].main.temp)}&#8451</p>
            `
        }
        } else { 
            const forecast = daysForecast.querySelectorAll('.day_forecast')
            for (let i = 0; i < forecast.length; i++){
                
            }
            
        }
    }
function nearbyCities (arr, index) {
    const cities = document.querySelector('.cities');
    if (cities.querySelectorAll('.nearby_city-info').length === 0){
        for (let i = 0; i < index; i++){
            const nearbyCityInfo = document.createElement('div')
            nearbyCityInfo.classList.add('nearby_city-info');
            nearbyCityInfo.innerHTML = `
            <p class = "city_name">${arr[i].name}</p>
            <div class = "weather_conditions">
            <div class = "nearby_city_img"><img src = "https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png"></div>
            <p class = "nearby_city_temp">${Math.round(arr[i].main.temp)}&#8451</p>
            </div>
            `
            cities.append(nearbyCityInfo)
        }
    } else{
        const blocks = cities.getElementsByClassName('nearby_city-info');
        for(let i =0; i < blocks.length; i++){
            blocks[i].innerHTML = `
            <p class = "city_name">${arr[i].name}</p>
            <div class = "weather_conditions">
            <div class = "nearby_city_img"><img src = "https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png"></div>
            <p class = "nearby_city_temp">${Math.round(arr[i].main.temp)}&#8451</p>
            </div>
            `
        }
    }
}  


function createDailyHourlyBlocks (arr, count, index){
    const dailyHourlyInfo = document.querySelector('[ data-daily-hourly="forecast"]');
    if (dailyHourlyInfo.querySelectorAll('.time_interval').length === 0) {

            let date = forecastBlockDate(arr[i].dt)
            let ind = index;
            switch (ind) {
                case 0:
                    for (let j = 0; j < count; j++){
                        const dayInterval = document.createElement('div');
                        dayInterval.classList.add('day_interval');
                        dayInterval.innerHTML = `
                        <p class = 'day_of_the_week'> ${date.day}</p>
                        <p class = 'weather_date grey'> ${date.month}</p>
                        <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png'></div>
                        <p class = 'day_temp'>${Math.round(arr[i].temp - 273)}&#8451</p>
                        <p class = 'day_perscription grey'>${arr[i].weather[0].description}</p>
                        `
                        daysForecast.append(dayInterval)
                    } break;
                case 1:
                    for (let j = 8; j < 15; j++){
                        const dayInterval = document.createElement('div');
                        dayInterval.classList.add('day_interval');
                        dayInterval.innerHTML = `
                        <p class = 'day_of_the_week'> ${date.day}</p>
                        <p class = 'weather_date grey'> ${date.month}</p>
                        <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png'></div>
                        <p class = 'day_temp'>${Math.round(arr[i].temp - 273)}&#8451</p>
                        <p class = 'day_perscription grey'>${arr[i].weather[0].description}</p>
                        `
                        daysForecast.append(dayInterval)
                    } break;
                case 2: 
                    for (let j = 16; j < 23; j++){
                        const dayInterval = document.createElement('div');
                        dayInterval.classList.add('day_interval');
                        dayInterval.innerHTML = `
                        <p class = 'day_of_the_week'> ${date.day}</p>
                        <p class = 'weather_date grey'> ${date.month}</p>
                        <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png'></div>
                        <p class = 'day_temp'>${Math.round(arr[i].temp - 273)}&#8451</p>
                        <p class = 'day_perscription grey'>${arr[i].weather[0].description}</p>
                        `
                        daysForecast.append(dayInterval)
                    } break;
                case 3:
                    for (let j = 24; j < 31; j++){
                        const dayInterval = document.createElement('div');
                        dayInterval.classList.add('day_interval');
                        dayInterval.innerHTML = `
                        <p class = 'day_of_the_week'> ${date.day}</p>
                        <p class = 'weather_date grey'> ${date.month}</p>
                        <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png'></div>
                        <p class = 'day_temp'>${Math.round(arr[i].temp - 273)}&#8451</p>
                        <p class = 'day_perscription grey'>${arr[i].weather[0].description}</p>
                        `
                        daysForecast.append(dayInterval)
                    } break;
                case 4:
                    for (let j = 32; j < 39; j++){
                        const dayInterval = document.createElement('div');
                        dayInterval.classList.add('day_interval');
                        dayInterval.innerHTML = `
                        <p class = 'day_of_the_week'> ${date.day}</p>
                        <p class = 'weather_date grey'> ${date.month}</p>
                        <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png'></div>
                        <p class = 'day_temp'>${Math.round(arr[i].temp - 273)}&#8451</p>
                        <p class = 'day_perscription grey'>${arr[i].weather[0].description}</p>
                        `
                        daysForecast.append(dayInterval)
                    } break;
            }
        
        // for (let i = 0; i < index; i++){
        //     const timeInterval = document.createElement('div');
        //     timeInterval.classList.add('time_interval');
        //     console.log(getHours(arr[i].dt).slice(2, -1));
        //     timeInterval.innerHTML =`
        //     <div class = 'time_block'>${getHours(arr[i].dt).substring(0,2) > 12 ? getHours(arr[i].dt).substring(0,2) % 12 + ' pm' : getHours(arr[i].dt).substring(0,2) + ' am'}<div>
        //     <div class="img_block"><img src = "https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png"></div>
        //     <div class="forecast_block">${arr[i].weather[0].main}</div>
        //     <div class="temp_block">${Math.round(arr[i].temp - 273)}&#8451</div>
        //     <div class = "feel_block">${Math.round(arr[i].feels_like - 273)}&#8451</div>
        //     <div class="wind_block"> ${(arr[i].wind.speed * 3.6).toFixed(2)} km/h</div>
        //     `
        // }
    } else {
        const blocks = document.querySelectorAll('.time_interval');
        for (let i = 0; i < index; i++){
            blocks[i].innerHTML =`
            <div class = 'time_block'>${getHours(arr[i].dt).substring(0,2) > 12 ? getHours(arr[i].dt).substring(0,2) % 12 + ' pm' : getHours(arr[i].dt).substring(0,2) + ' am'}<div>
            <div class="img_block"><img src = "https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png"></div>
            <div class="forecast_block">${arr[i].weather[0].main}</div>
            <div class="temp_block">${Math.round(arr[i].temp - 273)}&#8451</div>
            <div class = "feel_block">${Math.round(arr[i].feels_like - 273)}&#8451</div>
            <div class="wind_block"> ${(arr[i].wind.speed * 3.6).toFixed(2)} km/h</div>
            `
        }
    }
}

function createBlocks (arr, index){
    if (hourlyWeatherInfo.querySelectorAll('.time_interval').length === 0){
        for (let i = 0; i < index; i++){
            const timeInterval = document.createElement('div')
            timeInterval.classList.add('time_interval');
            timeInterval.innerHTML = 
            `
            <div class="time_block">${arr[i].dt_txt.slice(11,-3)}</div>
            <div class="img_block"><img src = "https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png"></div>
            <div class="forecast_block">${arr[i].weather[0].main}</div>
            <div class="temp_block">${Math.round(arr[i].main.temp - 273)}&#8451</div>
            <div class = "feel_block">${Math.round(arr[i].main.feels_like - 273)}&#8451</div>
            <div class="wind_block"> ${(arr[i].wind.speed * 3.6).toFixed(2)} km/h</div>
            `
            hourlyWeatherInfo.append(timeInterval)
        }
    } else{
        const blocks = hourlyWeatherInfo.getElementsByClassName('time_interval');
        for (let i = 0; i < blocks.length; i++){
            blocks[i].innerHTML =  `
            <div class="time_block">${arr[i].dt_txt.slice(11,-3)}</div>
            <div class="img_block"><img src = "https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png"></div>
            <div class="forecast_block">${arr[i].weather[0].main}</div>
            <div class="temp_block">${Math.round(arr[i].main.temp - 273)}&#8451</div>
            <div class = "feel_block">${Math.round(arr[i].main.feels_like - 273)}&#8451</div>
            <div class="wind_block"> ${(arr[i].wind.speed * 3.6).toFixed(2)} km/h</div>
            `
        }
        
    }
}


function getDate (){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear() % 2000;
    today = `${dd}.${mm}.${yy}`;
    return today
}    


function getHours(milsec) {
    let srd = new Date((milsec) * 1000);
    return (srd.getHours() + ":" + srd.getMinutes())
}    



// function getDuration(sunrise, sunset) {
    //     let hours1 = new Date ((sunrise) * 1000).getHours();
    //     let hours2 = new Date((sunset) * 1000).getHours();  
    //     let minutes1 = new Date ((sunrise) * 1000).getMinutes();
    //     let minutes2 = new Date ((sunset) * 1000).getMinutes();
    //     sunris
    //     sunrise.setHours(hours1 - hours2);
    
    //     sunrise.setMinutes(minutes1 - minutes2)
    
    
//     return `${sunrise.getHours()}:${sunrise.getMinutes()}`
    
//     }

function openTable(a, b) {
    a.preventDefault()
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    console.log(tabcontent);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(b).style.display = "block";
    a.currentTarget.className += " active";
}


    
function createDailyWeatherBlocks (arr, index, data){
        console.log(data);

        if (daysForecast.querySelectorAll('.day_interval').length === 0){
            for (let i = 0; i < index; i++){
                let date = forecastBlockDate(arr[i].dt)
                if (i === 0){
                    const dayInterval = document.createElement('div');
                    dayInterval.classList.add('day_interval');
                    dayInterval.innerHTML = `
                    <p class = 'day_of_the_week'>Today</p>
                    <p class = 'weather_date grey'> ${date.month}</p>
                    <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[0].weather[0].icon}@2x.png'></div>
                    <p class = 'day_temp'>${Math.round(arr[0].temp.eve - 273)}&#8451</p>
                    <p class = 'day_perscription grey'>${arr[0].weather[0].description}</p>
                    `
                    daysForecast.append(dayInterval)
                } else{
                const dayInterval = document.createElement('div');
                dayInterval.classList.add('day_interval');
                dayInterval.innerHTML = `
                <p class = 'day_of_the_week'> ${date.day}</p>
                <p class = 'weather_date grey'> ${date.month}</p>
                <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png'></div>
                <p class = 'day_temp'>${Math.round(arr[i].temp.eve - 273)}&#8451</p>
                <p class = 'day_perscription grey'>${arr[i].weather[0].description}</p>
                `
                daysForecast.append(dayInterval)
            }
        }
    } else {
        const dailyWeather = document.querySelectorAll('.day_interval');
        for (let i = 0; i < dailyWeather.length; i++){
        let date = forecastBlockDate(arr[i].dt)
        if (i === 0){
            dailyWeather[0].innerHTML = `
            <p class = 'day_of_the_week'> Today</p>
            <p class = 'weather_date grey'> ${date.month}</p>
            <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[0].weather[0].icon}@2x.png'></div>
            <p class = 'day_temp'>${Math.round(arr[0].temp.eve - 273)}&#8451</p>
            <p class = 'day_perscription grey'>${arr[0].weather[0].description}</p>
            `
        } else {
            dailyWeather[i].innerHTML =`
            <p class = 'day_of_the_week'> ${date.day}</p>
            <p class = 'weather_date grey'> ${date.month}</p>
            <div class = 'day_icon_block'><img src = 'https://openweathermap.org/img/wn/${arr[i].weather[0].icon}@2x.png'></div>
            <p class = 'day_temp'>${Math.round(arr[i].temp.eve - 273)}&#8451</p>
            <p class = 'day_perscription grey'>${arr[i].weather[0].description}</p>
            `
        }
    }
    }
}
function forecastBlockDate (milsec){
    let daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    let sec = new Date ((milsec) * 1000);
    console.log(sec);
    return {
        day: daysOfTheWeek[sec.getDay()],
        month: month[sec.getMonth()]
    }
}



