const express = require('express')
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const query = req.body.cityName
  const apiKey = "fd61dc9c7533d4fa5c1e2c8683e0de8c"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey + "&units=" + unit + "&q=" + query
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const icon = weatherData.weather[0].icon
      const imgUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
      
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("<link rel='stylesheet' href='css/styles.css' type='text/css'>");
      res.write("<div><h1>The temperature in <span>" + weatherData.name + "</span> is <span>" + weatherData.main.temp + "</span> degrees Celcius.</h1>");
      res.write("<h3>With " + weatherData.weather[0].description + "</h3>")
      res.write("<img src=" + imgUrl + "></div>")
      res.send()
    })
  })
})

app.listen(3000, function() {
  console.log("Server is runing on port 3000")
}) 