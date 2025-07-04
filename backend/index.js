require("dotenv").config ()
const axios = require("axios") 
const cors = require("cors") 
const express = require("express") 
const app = express() 
app.use(express.json()) 
app.use(cors()) 

const weatherClient = axios.create({
    baseURL:'https://api.openweathermap.org/data/2.5/',
})

app.get("/current-weather", async (request, response) => {
    
    const lat = request.query.lat;
    const lon = request.query.lon;
    
    const result = await weatherClient.get("weather", {
        params: {
            lat: lat,
            lon: lon,
            appid: process.env.WEATHER_KEY,
            units: 'metric',
            lang: 'pt_br'
    }}) 

    const dadosClimaAtual = {
        temperaturaMinima: result.data.main.temp_min,
        temperaturaMaxima: result.data.main.temp_max,
        pressaoAtmosferica: result.data.main.pressure,
        umidadeRelativaAr: result.data.main.humidity,
    };

    response.json(dadosClimaAtual);

})



const port = 3000
app.listen(port, () => console.log(`Back end funcionando. Porta: ${port}.`))