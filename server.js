const express = require("express");
const fetch = require('node-fetch');
const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const apiKey = "e6e4ae750010cb487ec5868ce31bfe26";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const news_api = "d2557e8c3da14809a4dc9c9c6b155496";

app.get('/', (req, res)=>{
    res.render("index");
});

app.post("/", async (req, res)=>{
    try {
    const city = req.body.city;
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const weatherData = await response.json();
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${weatherData.name}&apiKey=${news_api}`;
    const newsResponse = await fetch(newsApiUrl);
    const newsData = await newsResponse.json();
    res.render("index", { weatherData: weatherData, newsData: newsData.articles });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, ()=>{
    console.log("Server runs at port " + PORT);
});