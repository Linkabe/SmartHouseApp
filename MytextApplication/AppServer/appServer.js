var express = require('express');
let request = require('request');
var mysql = require('mysql');
const fs = require('fs');
var path = require('path');
//var gpio = require('rpi-gpio');
//var Gpio = require('onoff').Gpio;
//var session = require('express-session');

var app = express();
var bodyParser = require('body-parser');
// app.use(session({
//     secret: 'work hard',
//     resave: true,
//     saveUninitialized: false
//  }));

var usersRouter = require('./Router/users.js');
//var authRouter = require('./Router/authentication.js');
var textRouter = require('./Router/textapp.js');
var heatingRouter = require('./Router/heating.js');
var energyRouter = require('./Router/energy.js');
var batteryRouter = require('./Router/battery.js');
var deviceRouter = require('./Router/device.js');
var weatherRouter = require('./Router/weather.js');

// gpio.setup(18, gpio.DIR_OUT);
// app.set('views', path.resolve(__dirname, '../Public/'));
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
// app.get('/heatingtable.html', function(req, res){
//   res.render('heatingtable',{status:"Press Button"});
// });

// app.post('/heating/on', function(req, res){
// gpio.write(18, true, function(err) {

//         if (err) throw err;
//         console.log('Written True to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('heatingtable', {status: "Heating is On"});
//     });
// });

// app.post('/heating/off', function(req, res){
// gpio.write(18, false, function(err) {

//         if (err) throw err;
//         console.log('Written False to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('heatingtable',{status: "Heating is Off"});
//     });
// });

// gpio.setup(18, gpio.DIR_OUT);
// app.set('views', path.resolve(__dirname, '../Public/'));
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
// app.get('/devicetable.html', function(req, res){
//   res.render('devicetable',{status:"Press Button"});
// });

// app.post('/heating1/on', function(req, res){
// gpio.write(18, true, function(err) {

//         if (err) throw err;
//         console.log('Written True to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('devicetable', {status: " On"});
//     });
// });

// app.post('/heating1/off', function(req, res){
// gpio.write(18, false, function(err) {

//         if (err) throw err;
//         console.log('Written False to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('devicetable',{status: " Off"});
//     });
// });

// gpio.setup(7, gpio.DIR_OUT);
// app.set('views', path.resolve(__dirname, '../Public/'));
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
// app.get('/devicetable.html', function(req, res){
//   res.render('devicetable',{status:"Press Button"});
// });

// app.post('/lights/on', function(req, res){
// gpio.write(7, true, function(err) {

//         if (err) throw err;
//         console.log('Written True to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('devicetable', {status: " On"});
//     });
// });

// app.post('/lights/off', function(req, res){
// gpio.write(7, false, function(err) {

//         if (err) throw err;
//         console.log('Written False to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('devicetable',{status: "Off"});
//     });
// });

// gpio.setup(37, gpio.DIR_OUT);
// app.set('views', path.resolve(__dirname, '../Public/'));
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
// app.get('/devicetable.html', function(req, res){
//   res.render('devicetable',{status:"Press Button"});
// });

// app.post('/tv/on', function(req, res){
// gpio.write(37, true, function(err) {

//         if (err) throw err;
//         console.log('Written True to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('devicetable', {status: " On"});
//     });
// });

// app.post('/tv/off', function(req, res){
// gpio.write(37, false, function(err) {

//         if (err) throw err;
//         console.log('Written False to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('devicetable',{status: "Off"});
//     });
// });

// gpio.setup(17, gpio.DIR_OUT);
// app.set('views', path.resolve(__dirname, '../Public/'));
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
// app.get('/energytable.html', function(req, res){
//   res.render('energytable',{status:"Press Button"});
// });


// app.post('/mainpower/on', function(req, res){  
//     // Switch relays every 1 sec
//     // relay is active low
//     var rly2 = new Gpio(17, 'out');
//     var rly1= new Gpio(27, 'out');
        
//           //if (rly1.readSync() === 1) {
//            //rly1.writeSync(1); // If pin is 0, write 1
//            rly2.writeSync(0);
//            rly1.writeSync(0); 
        
//         console.log('Written True to pin');
// console.log(path.join(__dirname, 'public'));
// return res.render('energytable', {status: "Main Power is On"});
//     });

// app.post('/mainpower/off', function(req, res){  
//         // Switch relays every 1 sec
//         // relay is active low
//         //var rly1 = new Gpio(17, 'out');
//         var rly2 = new Gpio(17, 'out');
//         var rly1= new Gpio(27, 'out');
        
//           //if (rly1.readSync() === 1) {
//            //rly1.writeSync(1); // If pin is 0, write 1
//            rly2.writeSync(0); // If pin is 1, write 0
//            rly1.writeSync(0);
            
//             console.log('Written False to pin');
//     console.log(path.join(__dirname, 'public'));
//     return res.render('energytable', {status: "Main Power is Off"});
//         });




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let url = `http://api.openweathermap.org/data/2.5/weather?lat=53.1982&lon=-8.5691&appid=3dc14e5a852359d8ae6d0097025ce62e`
request(url, function (err, response, body) {   
  if(err){
    console.log('error:', error);
  } else {
    var intervalID = setInterval(checkWeatherAPI, 1000000);
    let weather = JSON.parse(body)

       var Tempurature = weather.main.temp - 273.15
       var Pressure = weather.main.pressure
       var Humidity = weather.main.humidity
       var WindSpeed = weather.wind.speed * 3.6
       var Description = weather.weather[0].description
       var CloudCover = weather.clouds.all
       var Area = weather.name
  }

function checkWeatherAPI() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "p4db"
      });
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let weather = JSON.parse(body);
        var sql = "INSERT INTO weather (Area, Tempurature, Pressure, Humidity, Windspeed, Description, Cloudcover) VALUES ('"+Area+"','"+Tempurature+"','"+Pressure+"','"+Humidity+"','"+WindSpeed+"','"+Description+"','"+CloudCover+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
    console.log(Area);
    console.log(Tempurature);
    console.log(Pressure);
    console.log(Humidity);
    console.log(WindSpeed);
    console.log(Description);
    console.log(CloudCover);
    
  }

});
//1 day 24 * 3600 * 1000
var intervalID1 = setInterval( AIrecords, 24 * 3600 * 1000);
function AIrecords(){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "p4db"
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT distinct Device,DStatus,PowerSource,Status,Pressure,Tempurature,Humidity,Windspeed,Description,Cloudcover,HHouseTemp,HHHumidity,RecordedDate from devicetable,energy_tbl,weather,heating_tbl,ai_tbl where RecordedDate > DATE_SUB(CURDATE(), INTERVAL 1 DAY)",
    function(err, rows, fields){ if(err)   {
      throw err;
  }else{
    var len = rows.length;
                var AI = rows[i];
                var DeviceVals=[];

                for (var i = 0; i < len; i++) {
                    var AI = rows[i];
                    DeviceVals[i] = [AI.Device,AI.DStutus,AI.PowerSource,AI.Status,AI.Pressure,AI.Tempurature,AI.Humidity,AI.Windspeed,AI.Description,AI.Cloudcover,AI.HHouseTemp,AI.HHHumidity,AI.RecordedDate,"\n"];
                }
    fs.writeFile( './airecords.txt', "Day Start: " + DeviceVals, function (err) {
                 if (err) throw err;
                      console.log('Saved!');
                 });


 }
    });
  });
}



// app.all( '/createuser.html', function(req,res, next){
//     console.log("checking welcome");
//     if (req.session && req.session.check){
//         next();
//     }
//     else{
//         res.redirect('/login.html');
//     }
// });

// app.all( '/admintables.html', function(req,res, next){
//     console.log("checking welcome");
//     if (req.session && req.session.check){
//         next();
//     }
//     else{
//         res.redirect('/login.html');
//     }
// });
//
// app.all( '/contactus.html', function(req,res, next){
//     console.log("checking welcome");
//     if (req.session && req.session.check){
//         next();
//     }
//     else{
//         res.redirect('/login.html');
//     }
// });
//
// app.all( '/thetextapp.html', function(req,res, next){
//     console.log("checking welcome");
//     if (req.session && req.session.check){
//         next();
//     }
//     else{
//         res.redirect('/login.html');
//     }
// });

app.use(express.static('../Public/'));
app.use("/users", usersRouter);
// app.use("/authentication", authRouter);
app.use("/textapp", textRouter);
app.use("/heating", heatingRouter);
app.use("/device", deviceRouter);
app.use("/energy", energyRouter);
app.use("/battery", batteryRouter);
app.use("/weather", weatherRouter);



const server = app.listen(3003, function () {
    const port = server.address().port;
    console.log("Example app listening at :%s", port)
});
