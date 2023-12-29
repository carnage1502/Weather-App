const apikey = "8581f42ef080981a879387c69419f9c4"

const weatherDataEl = document.getElementById("weather-data")
const cityInpEl = document.getElementById("city-input")

const formEL = document.querySelector("form")


formEL.addEventListener("submit",(event)=>{
    event.preventDefault()
    const cityVal = cityInpEl.value
    getweatherData(cityVal)
})

async function getweatherData(cityVal){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apikey}&units=metric`)
        
        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`

        weatherDataEl.querySelector(".description").textContent = description

        weatherDataEl.querySelector(".details").innerHTML = details.map((details)=> `<div>${details}</div>`).join("")


    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = ""

        weatherDataEl.querySelector(".temperature").textContent = ""

        weatherDataEl.querySelector(".description").textContent = "An error occured, please try again later!"

        weatherDataEl.querySelector(".details").innerHTML = ""
    }
}