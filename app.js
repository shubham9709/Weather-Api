const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.CityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=34a975ca3cf716ac417afb9c6daaa8bf#";
    res.setHeader("Content-Type","text/html");
    https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        res.write("The weather here is "+description+"<br>");
        res.write("The temperature in "+ query + " is " +temp+ "<br>");
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<img src=" + imageURL +">");

        res.send();
      })
    })
})


// app.get("/",function(req,res){

//
// })


app.listen(3000,function()
{
  console.log("Server started on port 3000");
})
