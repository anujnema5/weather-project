
const express = require('express');
const app = express();
const https = require('https');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", (req,res)=>{

      res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res)=>{
      const query = req.body.cityName;
      const apiKey = "1de1669103028114ee19a3f857471734";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query  + "&appid=" + apiKey + "&units=metric";
      
      https.get(url, (response,err)=>{
            if(err) {
                  res.write("404 not found");
                  return;
                  res.writeHead(404);
                  // res.send();
            }
           response.on("data", (data)=>{
            
           const weatherData = JSON.parse(data);

           res.write(`<p>The weather of ${query} is : ${weatherData.weather[0].description} </p>`);
           
            res.write(`<h2>The temperature of ${query} is : ${weatherData.main.temp} </h2>`); 

            const iconPath = weatherData.weather[0].icon;
            const imagePath  = `http://openweathermap.org/img/wn/${iconPath}@2x.png`
            res.write("<img src=" + imagePath + "></img>");
            res.send();
           });
      });
});

app.listen(3000, (err)=>{
      if (err)  throw err;
      console.log(`SERVER SUCCESSFULLY STARTED` );
});
