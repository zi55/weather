
let icons = document.getElementById('icons')
let tempr = document.getElementById('tempr')
let sunrise = document.getElementById('sunrise')
let todays = document.getElementById('todays')
let forcats = document.getElementById('forcats')
let tempred = document.getElementById('tempred')
let feels = document.getElementById('feels')
let winds = document.getElementById('wind')
let lside = document.getElementById('lside')
let searchs = document.getElementById('searchs')
let leps = document.getElementById('leps')
let sea = document.getElementById('sea')
const city = document.querySelector('.city');



 

function getHours(rets) {
let srd = new Date((rets) * 1000);
return (srd.getHours() + ":" + srd.getMinutes())
}

function dur(date1, date2) {

date1.setHours(date1.getHours() - date2.getHours());

date1.setMinutes(date1.getMinutes() - date2.getMinutes())


return `${date1.getHours()}:${date1.getMinutes()}`

}

function kmh(ket) {
return Math.floor(ket * 10)
}

function rud(ddd) {
return Math.floor(ddd)
}
 

fetch("https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=5494df92a80ce37861e46b77197cbbba&units=metric&lang=ru")
.then(data => {
return data.json()
}).then(data => {

console.log(dur(new Date(data.sys.sunset * 1000), new Date(data.sys.sunrise * 1000)));
icons.innerHTML = `<div>  <p class="musor"> ${data.weather[0].description}</p> <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> </div>`
tempr.innerHTML = `<div> <h1>${data.main.temp}  C  </h1> <p>  </p> </div>`
sunrise.innerHTML = `<div> <p>Sunrise:  ${getHours(data.sys.sunrise)} </p>  <p>Sunset: ${getHours(data.sys.sunset)}</p> <p>Duration: ${dur(new Date(data.sys.sunset * 1000), new Date(data.sys.sunrise * 1000))}  </p></div>`
})

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&appid=5494df92a80ce37861e46b77197cbbba&units=metric&lang=ru")
.then(dated => {
return dated.json()
})
.then(dated => {
console.log(dated);

for (let i = 0; i < 5; i++) {
todays.innerHTML += `<div class="directed"><p class="musor">${getHours(dated.list[i].dt)} </p> <div> <img src="http://openweathermap.org/img/wn/${dated.list[i].weather[0].icon}@2x.png"> </div> </div>`
forcats.innerHTML += `<div> <p class="ter">${dated.list[i].weather[0].main} </p> </div>`
tempred.innerHTML += `<div> <p class="ter">${dated.list[i].main.temp} </p> </div>`
feels.innerHTML += `<div> <p class="ter">${dated.list[i].main.feels_like} </p> </div>`
}
})

//Nearby places
fetch("http://api.openweathermap.org/geo/1.0/reverse?lat=41.3082&lon=69.2598&limit=5&appid=5494df92a80ce37861e46b77197cbbba")
.then(nears => {
return nears.json()
})
.then(nears => {
console.log(nears)
for (let i = 1; i < nears.length; i++) {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nears[i].local_names.ascii}&appid=5494df92a80ce37861e46b77197cbbba&units=metric&lang=ru`) 
    .then(datb => {
        return datb.json()
    }).then(datb => {
    })
}
})
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.3333&lon=69.25&appid=5494df92a80ce37861e46b77197cbbba&units=metric")
.then(dail => {
return dail.json()
})
.then(dail => {
console.log(dail);
 
console.log(dail);
let cards = document.querySelectorAll(".cards")
for (let i = 0; i < cards.length; i++) {
cards[i].onclick = function() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&appid=5494df92a80ce37861e46b77197cbbba&units=metric&lang=ru")
        .then(dated => {
            return dated.json()
        })
        .then(dated => {
            console.log(i);
            leps.innerHTML = ""
            for (let j = 5 * i + i; j <= 5 * (i + 1) + i; j++) {
                let div = document.createElement("div");
                div.className = "block"
                div.innerHTML += `<div class="dirr"><p class="musor">${getHours(dated.list[j].dt)} </p> <div> <img src="http://openweathermap.org/img/wn/${dated.list[j].weather[0].icon}@2x.png"> </div> </div>`
                div.innerHTML += `<div class="dirr"> <p class="ter">${dated.list[j].weather[0].main} </p> </div>`
                div.innerHTML += `<div class="dirr"> <p class="ter">${dated.list[j].main.temp} </p> </div>`
                div.innerHTML += `<div class="dirr"> <p class="ter">${dated.list[j].main.feels_like} </p> </div>`
                div.innerHTML += `<div class="dirr > <p class="mrg">${kmh(dated.list[j].wind.speed)} </p> </div>`
                console.log(div);
                leps.append(div);
            }
        })
}
}
})
window.onload = () => {
fetch("https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&appid=5494df92a80ce37861e46b77197cbbba&units=metric&lang=ru")
.then(getdata => {
return getdata.json()
})
.then(dated => {
for (let j = 0; j < 6; j++) {
    let div = document.createElement("div");
    div.className = "block"
    div.innerHTML += `<div class="dirr"><p class="musor">${getHours(dated.list[j].dt)} </p> <div> <img src="http://openweathermap.org/img/wn/${dated.list[j].weather[0].icon}@2x.png"> </div> </div>`
    div.innerHTML += `<div class="dirr"> <p class="ter">${dated.list[j].weather[0].main} </p> </div>`
    div.innerHTML += `<div class="dirr"> <p class="ter">${dated.list[j].main.temp} </p> </div>`
    div.innerHTML += `<div class="dirr"> <p class="ter">${dated.list[j].main.feels_like} </p> </div>`
    div.innerHTML += `<div class="dirr > <p class="mrg">${kmh(dated.list[j].wind.speed)} </p> </div>`
    console.log(div);
}
})
}
sea.onclick = function() {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchs.value}&appid=5494df92a80ce37861e46b77197cbbba&units=metric&lang=ru`)
.then(data => data.json())
.then(data => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchs.value}&appid=5494df92a80ce37861e46b77197cbbba&units=metric&lang=ru`)
    .then(data => {
        return data.json()
    }).then(data => {
        icons.innerHTML = ""
        tempr.innerHTML = ""
        sunrise.innerHTML = ""
        console.log(dur(new Date(data.sys.sunset * 1000), new Date(data.sys.sunrise * 1000)));
        icons.innerHTML = `<div><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> <p class="musor"> ${data.weather[0].description}</p> </div>`
        tempr.innerHTML = `<div> <h1>${data.main.temp}  C  </h1> <p>feels like ${ data.main.feels_like} </p> </div>`
        sunrise.innerHTML = `<div> <p>Sunrise:  ${getHours(data.sys.sunrise)} </p>  <p>Sunset: ${getHours(data.sys.sunset)}</p> <p>Duration: ${dur(new Date(data.sys.sunset * 1000), new Date(data.sys.sunrise * 1000))}  </p></div>`
    })
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchs.value}&appid=5494df92a80ce37861e46b77197cbbba&units=metric&lang=ru`)
    .then(dated => {
        return dated.json()
    })
    .then(dated => {
        console.log(dated);
        todays.innerHTML = ""
        forcats.innerHTML = ""
        tempred.innerHTML = ""
        feels.innerHTML = ""
        for (let i = 0; i < 5; i++) {
            todays.innerHTML += `<div class="directed"><p class="musor">${getHours(dated.list[i].dt)} </p> <div> <img src="http://openweathermap.org/img/wn/${dated.list[i].weather[0].icon}@2x.png"> </div> </div>`
            forcats.innerHTML += `<div> <p class="ter">${dated.list[i].weather[0].main} </p> </div>`
            tempred.innerHTML += `<div> <p class="ter">${dated.list[i].main.temp} </p> </div>`
            feels.innerHTML += `<div> <p class="ter">${dated.list[i].main.feels_like} </p> </div>`
        }
    })
})
}

 