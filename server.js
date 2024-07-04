const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.apiKey ;

   // const tempResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=${apiKey}`);
        // const tempData = await tempResponse.json();
        // const tempInCelcius = Math.round(tempData.main.temp-273.15) 
        // console.log(tempData)
        https://api.weatherapi.com/v1/current.json?key=03cc86fbf31147b0b7a83849231910&q=54.146.170.154



app.get('/', async(req, res)=> {
    res.status(200).json({ success: true, message:`Welcome to user geographical condition app` });
})

app.get('/api/hello', async(req, res)=> {
    const client_ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0].trim() : req.socket.remoteAddress;
        const geoResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${client_ip}`);
        const geoData = await geoResponse.json();
        console.log(geoData);
     
    try {
        if(req.query.visitor_name) {
           const name = req.query.visitor_name
           return res.status(200).json({ client_ip: client_ip, location: geoData.location.name, greetings: `Hello ${name}!, the temperature is ${geoData.current.temp_c} degrees Celcius in ${geoData.location.name}` });
        }
        res.status(400).json({ success: false, message:`Query key is not valid!, make sure query key is visitor_name` });

    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
})

app.listen(port, ()=> console.log(`Server listening on port ${port}`))

module.exports = app;